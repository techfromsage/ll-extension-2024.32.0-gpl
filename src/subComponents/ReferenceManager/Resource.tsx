import React, { MouseEvent } from 'react';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import Checkbox from '@/subComponents/Checkbox/Checkbox';

interface Props {
  resource: DigitalResource,
  onClick: (event: MouseEvent) => void,
  handleSelectAll?: boolean,
}

const Resource = ({ resource, onClick, handleSelectAll }: Props) => {
  return (
    <div className="resource">
      <Checkbox
        name={resource.identifier}
        text={resource.metadata?.articleTitle?.length ? resource.metadata.articleTitle : resource.identifier}
        onClick={onClick}
        handleSelectAll={handleSelectAll}
      />
    </div>
  );
};

export default Resource;
