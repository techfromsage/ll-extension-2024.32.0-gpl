import React from 'react';
import PenIcon from '@/icons/PenIcon';
import Accordion from '@/subComponents/Accordion/Accordion';
import HighlightAndAnnotateContent from './HighlightAndAnnotateContent';

const HighlightAndAnnotateAccordion = () => {
  return (
    <Accordion
      items={[{
        uuid: 'highlightAndAnnotate',
        expanded: true,
        title: 'Highlight and notes',
        content: <HighlightAndAnnotateContent />,
        icon: <PenIcon />,
      }]}
      preExpandedUuids={['highlightAndAnnotate']}
    />
  );
};

export default HighlightAndAnnotateAccordion;
