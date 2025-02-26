import type { GroupOptionType } from '@/subComponents/Select/AsyncSelect';

/**
 * Rendering a huge amount of options can cause performance issues.
 * We slice the options into pages and load them as the user scrolls.
 * We also make sure the options are grouped by their group and
 * that the search query is applied to the options.
 * @param {GroupOptionType[]} options
 * @param {string} searchQuery
 * @param {number} page
 */
const OPTIONS_PER_PAGE = 25;

const loadGroupedOptions = async (options: GroupOptionType[], searchQuery: string, page: number) => {
  if (options.length === 0) {
    return {
      groupedOptions: [],
      hasMore: false,
    };
  }
  const searchQueryLower = searchQuery?.toLowerCase();

  const filteredOptions = searchQuery
    ? options.filter(({ label, title }: { label: string, title: string }) =>
      label.toLowerCase().includes(searchQueryLower) || title.toLowerCase().includes(searchQueryLower))
    : options;

  const hasMore = Math.ceil(filteredOptions.length / OPTIONS_PER_PAGE) > page;
  const slicedOptions = filteredOptions.slice(
    (page - 1) * OPTIONS_PER_PAGE,
    page * OPTIONS_PER_PAGE,
  );

  const mapGroupToIndex = new Map();

  const result: Array<{
    label: string,
    options: GroupOptionType[],
  }> = [];

  slicedOptions.forEach(option => {
    const { group } = option;

    if (mapGroupToIndex.has(group)) {
      const index = mapGroupToIndex.get(group);

      result[index].options.push(option);
    } else {
      const index = result.length;

      mapGroupToIndex.set(group, index);

      result.push({
        label: group,
        options: [option],
      });
    }
  });

  return {
    groupedOptions: result,
    hasMore,
  };
};

export default loadGroupedOptions;
