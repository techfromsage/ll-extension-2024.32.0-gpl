import React from 'react';
import { ProjectOption } from '@/subComponents/ReferenceManager/Components/ProjectSelect/ProjectSelect';

interface ProjectOptionProps {
  project: ProjectOption,
  onSelectProject: (project: ProjectOption) => void,
}

const ProjectSelectOption: React.FC<ProjectOptionProps> = ({ project, onSelectProject }) => {
  return (
    <div
      className="dropdown-container__menu__item"
      key={project.id}
      onClick={() => onSelectProject(project)}
      onKeyDown={e => e.key === 'Enter' && onSelectProject(project)}
      role="button"
      tabIndex={0}
    >
      {project.label}
    </div>
  );
};

export default ProjectSelectOption;
