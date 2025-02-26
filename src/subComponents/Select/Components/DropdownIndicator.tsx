import React from 'react';
import {
  components,
  DropdownIndicatorProps,
} from 'react-select';
import AsideDownArrow from '@/icons/AsideDownArrow';

const DropdownIndicator : React.FC<DropdownIndicatorProps<any, true>> = (
  props: DropdownIndicatorProps<any, true>,
) => {
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <components.DropdownIndicator {...props}>
      <AsideDownArrow />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
