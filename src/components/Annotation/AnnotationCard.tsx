import React, { useContext } from 'react';
import Card from '@/subComponents/Card/Card';
import DropdownMenu, { DropdownMenuAction } from '@/subComponents/DropdownMenu/DropdownMenu';
import formatAnnotationTimestamp from '@/modules/highlightAndAnnotate/helpers/formatAnnotationTimestamp';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import findAnnotationBackgroundColor from '@/modules/highlightAndAnnotate/helpers/findAnnotationBackgroundColor';
import determineAuthorText from '@/modules/highlightAndAnnotate/helpers/determineAuthorText';
import AppActiveReactContext from '../Context/AppActiveReactContext';

interface Props {
  annotation: Annotation,
}

const AnnotationCard = ({
  annotation,
}: Props) => {
  const { storeState: { user } } = useContext(AppActiveReactContext);
  const {
    created,
    author,
    text,
    color,
  } = annotation;
  const backgroundColor = findAnnotationBackgroundColor(color);
  const formattedDate = formatAnnotationTimestamp(created);
  const authorText = determineAuthorText(author, user);
  const metaText = `${formattedDate} · ${authorText}`;

  const actions = [
    DropdownMenuAction.Toggle,
    author?.id !== user?.id && DropdownMenuAction.Copy,
    DropdownMenuAction.View,
    DropdownMenuAction.Edit,
    DropdownMenuAction.Delete,
  ];

  return (
    <div className="annotation-wrapper">
      <Card highlightColor={backgroundColor} className="card--bordered card--shadow card--narrow">
        <div className="annotation">
          {text && (
            <div className="annotation__note">
              {text}
            </div>
          )}
          <div className="annotation__meta">
            <div className="annotation__meta__text">
              {metaText}
            </div>
            <DropdownMenu
              text="Quick actions settings"
              actions={actions as DropdownMenuAction[]}
              annotation={annotation}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnnotationCard;
