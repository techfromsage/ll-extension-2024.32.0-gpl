import React, { useState, MouseEvent } from 'react';
import Button from '@/subComponents/Buttons/Button';

interface CreateProjectOptionProps {
  onAddNewProject: (newOption: string) => void,
  onCancel: () => void,
  onCreating: (isCreating: boolean) => void,
  onDropdownClose: () => void,
}

const CreateProjectOption: React.FC<CreateProjectOptionProps> = ({
  onAddNewProject,
  onCancel,
  onCreating,
  onDropdownClose,
}) => {
  const [newProjectTitle, setNewProjectTitle] = useState('');

  const handleSave = (e: MouseEvent) => {
    e.stopPropagation();
    if (newProjectTitle.trim()) {
      onAddNewProject(newProjectTitle.trim());
      setNewProjectTitle('');
      onCreating(false);
      onDropdownClose();
    }
  };

  const handleCancel = (e: MouseEvent) => {
    e.stopPropagation();
    setNewProjectTitle('');
    onCancel();
  };

  return (
    <div
      className="create-option"
    >
      <div className="create-option__input-wrapper">
        <input
          type="text"
          value={newProjectTitle}
          onChange={e => setNewProjectTitle(e.target.value)}
          placeholder="Project name"
        />
        <Button
          className="button-neutral button-inline button--medium button--no-margin"
          text="Create"
          onClick={handleSave}
        />
        <Button
          className="button-as-text button-inline button--small button--no-margin"
          text="&#x2715;"
          onClick={handleCancel}
        />
      </div>
    </div>
  );
};

export default CreateProjectOption;
