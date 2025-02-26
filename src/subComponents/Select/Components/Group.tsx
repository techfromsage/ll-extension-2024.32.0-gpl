import React from 'react';
import {
  components,
  GroupProps,
} from 'react-select';

const Group : React.FC<GroupProps<unknown, true>> = (props: GroupProps<unknown, true>) => (
  <div className="citation__select-group">
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <components.Group {...props} />
  </div>
);

export default Group;
