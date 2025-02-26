import React from 'react';
import {
  components,
  OptionProps,
} from 'react-select';
import CitationModalSelectOption from '@/components/Citation/CitationModalSelectOption';

const CitationOption : React.FC<OptionProps<unknown, true>> = (
  props: OptionProps<unknown, true>,
) => {
  const { data } = props as { data: { value: string, label: string, title: string } };

  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <components.Option {...props}>
      <CitationModalSelectOption data={data} />
    </components.Option>
  );
};

export default CitationOption;
