import React, { useContext, useEffect, useState } from 'react';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import Select from '@/subComponents/Select/Select';

interface AnnotationAuthorOption {
  value: string,
  label: string,
}

interface AnnotationSideTrayFilterProps {
  annotations: Annotation[],
  onChangeAuthor: (filteredAuthorId: string) => void,
}

const AnnotationSideTrayFilter = ({ annotations, onChangeAuthor }: AnnotationSideTrayFilterProps) => {
  const { storeState: { user } } = useContext(AppActiveReactContext);
  const [selectedOption, setSelectedOption] = useState({});
  const countAllAnnotations = annotations.length;
  const countYourAnnotations = annotations
    .filter(annotation => annotation.author.id === user?.id).length;

  // Group authors and count their annotations
  const authorAnnotationCounts = annotations.reduce((acc, annotation) => {
    const { id, firstName, lastName } = annotation.author;

    if (id !== user?.id) {
      const key = id;
      acc[key] = acc[key] || { count: 0, name: `${firstName} ${lastName}` };
      acc[key].count += 1;
    }

    return acc;
  }, {} as Record<string, { count: number, name: string }>);

  // Create filter options with all authors' annotation counts
  const filterOptions = [
    {
      value: 'all',
      label: `All Notes (${countAllAnnotations})`,
    },
    {
      value: `${user?.id}`,
      label: `Your Notes (${countYourAnnotations})`,
    },
    ...Object.entries(authorAnnotationCounts).map(([authorId, { name, count }]) => ({
      value: authorId,
      label: `${name} (${count})`,
    })),
  ];

  const handleFilterChange = (option: AnnotationAuthorOption) => {
    setSelectedOption(option);
    onChangeAuthor(option.value);
  };

  useEffect(() => {
    setSelectedOption(filterOptions[0]);
  }, []);

  return (
    <Select
      options={filterOptions}
      value={selectedOption}
      onChange={handleFilterChange}
    />
  );
};

export default AnnotationSideTrayFilter;
