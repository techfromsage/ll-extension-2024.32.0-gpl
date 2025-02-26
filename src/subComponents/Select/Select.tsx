import React from 'react';
import ReactSelect, {
  ActionMeta,
} from 'react-select';
import DropdownIndicator from '@/subComponents/Select/Components/DropdownIndicator';
import SelectStyles from './selectStyles';

interface Props {
  options: any[],
  defaultValue?: any,
  name?: string,
  value?: any,
  onChange?: (newValue: any, actionMeta: ActionMeta<Record<string, never>>) => void,
  isDisabled?: boolean,
  isToolbar?: boolean,
  placeholder?: string,
  secondary?: boolean,
  width?: string,
  filterOption?: (candidate: { label: string, value: string, data: any }, input: string) => boolean,
}

const Select = ({
  options,
  defaultValue,
  name,
  onChange,
  isDisabled,
  isToolbar,
  value,
  placeholder,
  filterOption,
  secondary = false,
  width = '225px',
}: Props) => {
  return (
    <div data-testid={`Select-${name}`} style={{ width }}>
      <ReactSelect
        className="select"
        defaultValue={defaultValue}
        options={options}
        name={name}
        inputId={name}
        value={value}
        placeholder={placeholder}
        isDisabled={isDisabled}
        onChange={onChange}
        components={{ DropdownIndicator }}
        maxMenuHeight={isToolbar ? 156 : 308}
        styles={SelectStyles(secondary)}
        filterOption={filterOption}
      />
    </div>
  );
};

export default Select;
