import { CSSObjectWithLabel } from 'react-select';

const height = 34;

/**
 * Common component styles used in Select/AsyncSelect components.
 * @param {boolean} secondary
 */
const SelectStyles = (secondary = false) => {
  return {
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      height,
      minHeight: height,
      backgroundColor: secondary ? '#f5f5f5' : '#fff',
    }),
    valueContainer: (provided: CSSObjectWithLabel) => ({
      ...provided,
      height: `${height}px`,
      padding: '0 10px',
    }),

    input: (provided: CSSObjectWithLabel) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided: CSSObjectWithLabel) => ({
      ...provided,
      height: `${height}px`,
    }),
  };
};

export default SelectStyles;
