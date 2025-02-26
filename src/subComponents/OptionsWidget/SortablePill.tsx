import React, { MouseEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pill } from '@/subComponents/OptionsWidget/OptionsWidget';
import Button from '@/subComponents/Buttons/Button';
import DragHandle from '@/icons/DragHandle';

interface Props {
  pill: Pill,
  id: string,
  onRemovePill: (value: string) => (event: MouseEvent) => void,
}

/**
 * SortablePill is used in OptionsWidget to display the "pill-like"
 * option that has been added.
 */
const SortablePill = ({ pill, id, onRemovePill }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const classes = [
    'pill',
    isDragging && 'pill--dragging',
  ].filter(Boolean);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className={classes.join(' ')}>
        { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
        <div className="pill__drag-handler" {...listeners}>
          <DragHandle classes={['drag-handle']} />
        </div>
        <div data-testid={`PillDrag-${pill.value}`} className="pill__label">
          {pill.label}
        </div>
        <div className="pill__close">
          <Button
            className="close--small"
            buttonType="close--small"
            hiddenText
            onClick={onRemovePill(pill.value)}
            text={`Remove ${pill.label}`}
          />
        </div>

      </div>
    </div>
  );
};

export default SortablePill;
