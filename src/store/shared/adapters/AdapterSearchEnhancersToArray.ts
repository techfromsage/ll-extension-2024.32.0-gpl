import SearchEnhancer from '@/interfaces/SearchEnhancer';
// TODO !!! TECH DEBT ALERT !!!
//  remove this if statement once retiring old API
//  once changed backend to send through Array
export default (
  searchEnhancers: { [name: string]: SearchEnhancer } | SearchEnhancer[],
): SearchEnhancer[] => {
  if (searchEnhancers && !Array.isArray(searchEnhancers)) {
    return Object.values(searchEnhancers);
  }
  return searchEnhancers;
};
