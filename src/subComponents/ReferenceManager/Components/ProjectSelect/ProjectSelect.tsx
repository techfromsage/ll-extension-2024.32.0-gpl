import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import CreateProjectOption from '@/subComponents/ReferenceManager/Components/ProjectSelect/CreateProjectOption';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import browserMethods from '@/browserMethods';
import { SciwheelProject } from '@/interfaces/sciwheel/SciwheelProject';
import ProjectSelectOption from '@/subComponents/ReferenceManager/Components/ProjectSelect/ProjectSelectOption';
import arrow from '@/assets/svg/arrow.svg';
import SciwheelType from '@/enums/sciwheel/SciwheelType';
import HTTPClient from '@/modules/shared/http/HTTPClient';
import SciwheelProjectLabel from '@/enums/sciwheel/SciwheelProjectLabel';

interface ProjectSelectProps {
  selectedProject: SciwheelProject | undefined,
  setSelectedProject: React.Dispatch<React.SetStateAction<SciwheelProject | undefined>>,
}

export interface ProjectOption {
  id: string,
  label: string,
  title: string,
  group?: string,
}

/**
 * Temporary component to select a project
 * to be replaced with the React-Select component
 * https://techfromsage.atlassian.net/browse/LL-4006
 *
 */
const ProjectSelect = ({
  selectedProject,
  setSelectedProject,
}: ProjectSelectProps) => {
  const {
    storeState: {
      addNewProject,
      canCreateProject,
      user,
      config,
      projects,
    },
  } = useContext(AppActiveReactContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [canUserCreateProject, setCanUserCreateProject] = useState<boolean>(false);
  const [options, setOptions] = useState<Record<string, ProjectOption[]>>({});

  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);

  const checkUserCanCreateProject = async () => {
    if (!user) {
      return;
    }
    try {
      const canCreate = await canCreateProject(
        config?.api.sciwheel.canCreateProject || '',
        HTTPClient,
        user,
      );
      if (isMounted.current) {
        setCanUserCreateProject(canCreate || !user?.hasTrialAccess);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // convert projects into an array of ProjectOption
  const projectOptions: ProjectOption[] = projects.map(project => {
    return {
      id: project.id,
      label: project.name,
      title: project.name,
      ...(project.type
        && { group: project.type === SciwheelType.Private ? SciwheelProjectLabel.PRIVATE : SciwheelProjectLabel.SHARED }),
    };
  });

  // Grouping options by their group property
  const groupedOptions = projectOptions.reduce((acc, option) => {
    const group = option.group || '';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {} as Record<string, ProjectOption[]>);

  useEffect(() => {
    setOptions(groupedOptions);
  }, []);

  const handleCreateProject = async (newProjectName: string) => {
    if (!user) {
      return;
    }
    try {
      const createdProject = await addNewProject(
        config?.api.sciwheel.addNewProject || '',
        browserMethods.app.contentScript.httpRequest,
        user,
        newProjectName,
      );
      if (createdProject && isMounted.current) {
        const newOption = {
          id: createdProject.id,
          label: createdProject.name,
          title: createdProject.name,
          group: SciwheelProjectLabel.PRIVATE,
        };
        groupedOptions[SciwheelProjectLabel.PRIVATE].push(newOption);
        groupedOptions[SciwheelProjectLabel.PRIVATE].sort((a, b) => a.label.localeCompare(b.label));
        setOptions({ ...groupedOptions });
        setSelectedProject(createdProject);
        await checkUserCanCreateProject();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
    setIsCreating(false);
  };

  const handleSelectProject = (project: ProjectOption) => {
    setSelectedProject(projects.find(p => p.id === project.id));
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    setSelectedProject(projects.find(project => project.id === ''));
    const fetchCanCreateProject = async () => {
      await checkUserCanCreateProject();
    };
    fetchCanCreateProject();

    return () => {
      isMounted.current = false;
    };
  }, [projects]);

  return (
    <div className="projects">
      <div className="dropdown-container">
        <div
          className="dropdown-container__toggle"
          onClick={handleToggleDropdown}
          onKeyDown={e => e.key === 'Enter' && handleToggleDropdown()}
          role="button"
          tabIndex={0}
        >
          { selectedProject?.name || '' }
          <img src={browserMethods.runtime.getURL(arrow)} alt="Arrow" />
        </div>

        {isDropdownOpen && (
          <div ref={dropdownRef} className="dropdown-container__menu">
            {Object.keys(options).map(group => (
              <div
                key={group}
                className="dropdown-container__menu__group-label"
              >
                <span className="dropdown-container__menu__options-group">{group}</span>
                {options[group].map(project => (
                  <ProjectSelectOption key={project.id} project={project} onSelectProject={handleSelectProject} />
                ))}
              </div>
            ))}
            {
              !isCreating && canUserCreateProject && (
                <div
                  className="create-option"
                  onClick={() => setIsCreating(true)}
                  onKeyDown={e => e.key === 'Enter' && setIsCreating(true)}
                  role="button"
                  tabIndex={0}
                >
                  + Create new project
                </div>
              )
            }
            {
              isCreating && canUserCreateProject && (
                <CreateProjectOption
                  onAddNewProject={handleCreateProject}
                  onCancel={() => setIsCreating(false)}
                  onCreating={setIsCreating}
                  onDropdownClose={handleToggleDropdown}
                />
              )
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSelect;
