import React from 'react';

import type { CSSObjectWithLabel, GroupBase } from 'react-select';
import { AsyncPaginate, reduceGroupedOptions } from 'react-select-async-paginate';
import type { LoadOptions } from 'react-select-async-paginate';

import DropdownIndicator from '@/subComponents/Select/Components/DropdownIndicator';
import CitationOption from '@/subComponents/Select/Components/CitationOption';
import Group from '@/subComponents/Select/Components/Group';
import loadGroupedOptions from '@/subComponents/Select/loadGroupedOptions';
import SelectStyles from '@/subComponents/Select/selectStyles';
import MenuPlacement from '@/enums/MenuPlacement';

interface AdditionalType {
  page: number,
}

interface Props {
  options: any[],
  name?: string,
  value?: any,
  onChange?: (option:any) => void,
  placeholder?: string,
  secondary?: boolean,
  width?: string,
  isCitation?: boolean,
  menuPlacement?: MenuPlacement,
}

export type GroupOptionType = {
  value: number,
  label: string,
  group: string,
  title: string,
};

const defaultAdditional: AdditionalType = {
  page: 1,
};

/**
 * AsyncSelect is used when we render a select with a large number of options.
 * It uses react-select-async-paginate as a wrapper around react-select,
 * to load options as the user scrolls.
 *
 * See https://www.npmjs.com/package/react-select-async-paginate for more details.
 */
const AsyncSelect = ({
  options,
  name,
  onChange,
  value,
  placeholder,
  secondary = false,
  width = '225px',
  isCitation = false,
  menuPlacement = MenuPlacement.Auto,
}: Props) => {
  const loadOptionsWrapper: LoadOptions<
  GroupOptionType,
  GroupBase<GroupOptionType>,
  AdditionalType
  > = async (searchQuery, _, additional) => {
    const page = additional?.page || 1;
    const { groupedOptions, hasMore } = await loadGroupedOptions(options, searchQuery, page);

    return {
      options: groupedOptions,
      hasMore,

      additional: {
        page: page + 1,
      },
    };
  };

  return options.length > 0 ? (
    <div data-testid={`Async Select-${name}`} style={{ width }}>
      <AsyncPaginate
        key={value.value}
        additional={defaultAdditional}
        value={value}
        loadOptions={loadOptionsWrapper}
        onChange={onChange}
        className="select"
        name={name}
        inputId={name}
        placeholder={placeholder}
        reduceOptions={reduceGroupedOptions}
        components={{ DropdownIndicator, Group, ...(isCitation && { Option: CitationOption }) }}
        maxMenuHeight={156}
        menuPlacement={menuPlacement}
        styles={{
          ...SelectStyles(secondary),
          option: (provided: CSSObjectWithLabel, state) => ({
            ...provided,
            width: '94%',
            margin: '0 auto',
            borderRadius: '3px',
            padding: '4px 8px 2px 8px',
            color: state.isSelected ? '#FFFFFF' : '#474747',
          }),
          menu: (provided: CSSObjectWithLabel) => ({
            ...provided,
            backgroundColor: '#F0F0F0',
          }),
          menuList: (provided: CSSObjectWithLabel) => ({
            ...provided,
            overflowX: 'hidden',
          }),
          groupHeading: (provided: CSSObjectWithLabel) => ({
            ...provided,
            fontSize: '10px',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#6E6E6E',
          }),
        }}
        aria-label={isCitation ? 'Select citation style.' : name}
        ariaLiveMessages={{
          onFocus: ({ focused: { title } }) => `You are currently focused on option ${title}.`,
        }}
      />
    </div>
  ) : null;
};

export default AsyncSelect;
