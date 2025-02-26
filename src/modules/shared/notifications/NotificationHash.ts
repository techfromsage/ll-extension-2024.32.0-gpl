/**
 * Generates a string hash based on passed in content.
 * Used to identify specific popups for a given URL, so we can track if they have been closed or not
 */
import md5 from 'md5';

export default <TItemToHash>(item: TItemToHash, currentUrl: URL) => ({
  generate: (): string => {
    const url = currentUrl.origin;
    return `${md5(JSON.stringify({ item, url }))}`;
  },
});
