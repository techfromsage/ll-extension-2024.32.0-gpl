import React, { MouseEvent, useEffect, useState } from 'react';
import differenceby from 'lodash.differenceby';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import FormElement from '@/subComponents/Form/FormElement';
import Select from '@/subComponents/Select/Select';

import SortablePill from './SortablePill';

export type Pill = { id: string, value: string, label: string };

interface Props {
  options: Pill[],
  name: string,
  title: string,
  onChange: (name: string, newValues: { value: string }[]) => void,
  defaultValues?: Pill[],
  optionsMessages?: string[],
  helpText?: string,
  maximum?: number,
  maximumMessage?: string,
}

/**
 * OptionsWidget provides a select box which adds option items underneath it.
 *
 * Options items are draggable, droppable, and removable.
 * @returns {JSX.Element}
 * @constructor
 * @param props
 */
const OptionsWidget = (props: Props) => {
  const {
    options,
    defaultValues = [],
    onChange,
    maximum = 0,
    maximumMessage = 'No more options',
    optionsMessages = [],
    name,
    title,
    helpText,
  } = props;
  const [pills, setPills] = useState<Pill[]>([]);
  const filteredOptions = differenceby(options, defaultValues, 'value');

  useEffect(() => {
    setPills(defaultValues);
  }, [defaultValues]);

  const onSelectOption = (item: Pill): void => {
    const newPills = [...pills, item];
    setPills(newPills);
    onChange(name, newPills);
  };

  const onRemovePill = (value: string) => (event: MouseEvent) => {
    event.preventDefault();
    const newPills = pills.filter(pill => pill.value !== value);
    setPills(newPills);
    onChange(name, newPills);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) {
      return;
    }
    setPills(current => {
      const oldIndex = current.findIndex(({ id }) => id === active.id);
      const newIndex = current.findIndex(({ id }) => id === over?.id);
      const newPills = arrayMove(current, oldIndex, newIndex);
      onChange(name, newPills);
      return newPills;
    });
  };

  const isDisabled = pills.length >= maximum;
  const placeholderText = isDisabled ? maximumMessage : optionsMessages[pills.length];

  return (
    <div data-testid="OptionsWidget">
      <label htmlFor={name} data-testid={`Label-${name}`} className="form-element__title">{title}</label>
      <FormElement type="select" htmlFor={name} alertKey={name} helpText={helpText}>
        <Select
          options={filteredOptions}
          isDisabled={isDisabled}
          value={null}
          onChange={onSelectOption}
          placeholder={placeholderText}
          name={name}
        />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext
            items={pills}
            strategy={verticalListSortingStrategy}
          >
            <div data-testid="PillsDropzone" className="pills__wrapper">
              {
                pills.map(
                  pill => (
                    <SortablePill
                      key={`pill-${pill.value}`}
                      id={pill.value}
                      pill={pill}
                      onRemovePill={onRemovePill}
                    />
                  ),
                )
              }
            </div>
          </SortableContext>
        </DndContext>
      </FormElement>
    </div>
  );
};

export default OptionsWidget;
