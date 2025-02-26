import React, { useContext, useEffect, useState } from 'react';
import Card from '@/subComponents/Card/Card';
import Switch from '@/subComponents/Switches/Switch';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import HighlightAndAnnotateEvent from '@/enums/stateMachine/HighlightAndAnnotateEvent';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import HighlightAndAnnotateReactContext from '@/components/Context/HighlightAndAnnotateReactContext';
import AnnotationSideTrayCard from '@/components/Annotation/AnnotationSideTrayCard';
import AnnotationSideTrayFilter from '@/components/Annotation/AnnotationSideTrayFilter';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import findAnnotationBackgroundColor from '@/modules/highlightAndAnnotate/helpers/findAnnotationBackgroundColor';
import HighlightAndAnnotateContentEmpty from './HighlightAndAnnotateContentEmpty';

const HighlightAndAnnotateContent = () => {
  const { storeState: { appSettings: { highlightAndAnnotateEnabled } } } = useContext(AppActiveReactContext);
  const { sendSettingsFormsState } = useContext(SettingsFormReactContext);
  const { highlightAndAnnotateData, sendHighlightAndAnnotateState } = useContext(HighlightAndAnnotateReactContext);
  const [isHighlightAndAnnotateEnabled, setIsHighlightAndAnnotateEnabled] = useState(highlightAndAnnotateEnabled);

  // Set up annotations filter by author
  const [authorFilter, setAuthorFilter] = useState('all');
  const [filteredAnnotations, setFilteredAnnotations] = useState<Annotation[]>(highlightAndAnnotateData.annotations);

  useEffect(() => {
    const filterAnnotationsByAuthor = ({ id, author, color }:Annotation) => {
      const elements = document.querySelectorAll(`[data-id="${id}"]`);
      const isVisible = authorFilter === 'all' || authorFilter === author.id;
      const backgroundColor = isVisible ? findAnnotationBackgroundColor(color) : 'transparent';

      elements.forEach(element => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.background = backgroundColor;
      });

      return isVisible;
    };

    const annotationsToShow = highlightAndAnnotateData.annotations.filter(filterAnnotationsByAuthor);
    setFilteredAnnotations(annotationsToShow);
  }, [authorFilter, highlightAndAnnotateData.annotations]);

  const hasExistingAnnotations = !!highlightAndAnnotateData.annotations.length;

  const handleSwitch = () => {
    const newValue = !isHighlightAndAnnotateEnabled;
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'highlightAndAnnotateEnabled', value: [newValue] });

    sendHighlightAndAnnotateState(
      newValue ? HighlightAndAnnotateEvent.TurnOn : HighlightAndAnnotateEvent.TurnOff,
    );

    setIsHighlightAndAnnotateEnabled(newValue);
  };

  return (
    <div className="highlight-and-annotate-wrapper">
      <Switch
        text="Switch on to view and edit highlight and notes."
        checked={isHighlightAndAnnotateEnabled}
        name="notes"
        boldText
        onClick={handleSwitch}
      />
      {
        highlightAndAnnotateEnabled
        && hasExistingAnnotations && (
          <AnnotationSideTrayFilter
            annotations={highlightAndAnnotateData.annotations}
            onChangeAuthor={filteredAuthorId => setAuthorFilter(filteredAuthorId)}
          />
        )
      }
      {
        highlightAndAnnotateEnabled
        && hasExistingAnnotations
        && filteredAnnotations.map(annotation => (
          <AnnotationSideTrayCard annotation={annotation} key={annotation.id} />
        ))
      }
      {
        highlightAndAnnotateEnabled
        && !hasExistingAnnotations
        && (
          <Card className="card--bordered">
            <HighlightAndAnnotateContentEmpty />
          </Card>
        )
      }
    </div>
  );
};

export default HighlightAndAnnotateContent;
