import React, { MouseEvent } from 'react';
import SciwheelIcon from '@/icons/SciwheelIcon';
import Checkbox from '@/subComponents/Checkbox/Checkbox';
import Button from '@/subComponents/Buttons/Button';
import { SciwheelProject } from '@/interfaces/sciwheel/SciwheelProject';
import MenuPlacement from '@/enums/MenuPlacement';
import ProjectSelect from '@/subComponents/ReferenceManager/Components/ProjectSelect/ProjectSelect';

interface ActionPanelState {
  selectedProject: SciwheelProject | undefined,
  setSelectedProject: React.Dispatch<React.SetStateAction<SciwheelProject | undefined>>,
  importPdf: boolean,
  setImportPdf: React.Dispatch<React.SetStateAction<boolean>>,
}

interface Props {
  resourceCount: number,
  selectedResourceCount: number,
  handleSaveReference: () => void,
  actionPanelState: ActionPanelState,
  hasImportPdfOption: boolean,
  menuPlacement?: MenuPlacement,
}

const ActionPanel = ({
  resourceCount,
  selectedResourceCount,
  actionPanelState,
  handleSaveReference,
  hasImportPdfOption,
  menuPlacement,
}: Props) => {
  const promptText = resourceCount > 1 ? 'Add these articles to a project' : 'Add this article to a project';

  const handleIncludePdfClick = (event: MouseEvent) => {
    const target = event.target as HTMLInputElement;
    actionPanelState.setImportPdf(target.checked);
  };

  return (
    <div className="action-panel">
      <div className="action-panel__header">
        <h5>
          <SciwheelIcon />
          <span>Sciwheel</span>
        </h5>
        {/* TODO: Three dots? */}
      </div>
      <p className="body">{ promptText }</p>
      <ProjectSelect
        selectedProject={actionPanelState.selectedProject}
        setSelectedProject={actionPanelState.setSelectedProject}
      />
      <div className="action-panel__footer">
        { hasImportPdfOption ? (
          <Checkbox
            name="includePDF"
            text="Include PDF"
            defaultChecked={actionPanelState.importPdf}
            onClick={handleIncludePdfClick}
          />
        ) : <span />}
        <Button
          className={`button-primary button--no-margin ${selectedResourceCount === 0 && 'button--disabled--secondary'}`}
          text="Add"
          onClick={handleSaveReference}
          disabled={selectedResourceCount === 0 || actionPanelState.selectedProject === undefined}
        />
      </div>
    </div>
  );
};

export default ActionPanel;
