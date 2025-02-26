import React, { useContext } from 'react';
import Card from '@/subComponents/Card/Card';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import formatAnnotationTimestamp from '@/modules/highlightAndAnnotate/helpers/formatAnnotationTimestamp';
import DropdownMenu, { DropdownMenuAction } from '@/subComponents/DropdownMenu/DropdownMenu';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import findAnnotationBackgroundColor from '@/modules/highlightAndAnnotate/helpers/findAnnotationBackgroundColor';
import determineAuthorText from '@/modules/highlightAndAnnotate/helpers/determineAuthorText';
import scrollToHighlightElement from '@/modules/highlightAndAnnotate/helpers/scrollToHighlightElement';

interface Props {
  annotation: Annotation,
}

const AnnotationSideTrayCard = ({ annotation }: Props) => {
  const { storeState: { user } } = useContext(AppActiveReactContext);
  const {
    id, text, quote, created, author, color,
  } = annotation;

  const backgroundColor = findAnnotationBackgroundColor(color);
  const formattedDate = formatAnnotationTimestamp(created);
  const authorText = determineAuthorText(author, user);
  const metaText = `${formattedDate} · ${authorText}`;

  return (
    <Card className="card--bordered card--no-margin" key={id}>
      <div className="highlight-and-annotate__content">
        <span
          className="highlight-and-annotate__content__quote"
          style={{
            backgroundColor,
          }}
          onClick={() => scrollToHighlightElement(id)}
          onKeyDown={e => e.key === 'Enter' && scrollToHighlightElement(id)}
          role="button"
          tabIndex={0}
        >
          {quote}
        </span>
        {text && (
          <p
            style={{
              borderLeft: `5px solid ${backgroundColor}`,
            }}
          >
            {text}
          </p>
        )}
        <div
          className="highlight-and-annotate__content__date_author"
        >
          {metaText}
          <DropdownMenu
            text="Quick actions settings"
            actions={[DropdownMenuAction.Copy, DropdownMenuAction.ScrollTo, DropdownMenuAction.Delete]}
            annotation={annotation}
          />
        </div>
      </div>
    </Card>
  );
};

export default AnnotationSideTrayCard;
