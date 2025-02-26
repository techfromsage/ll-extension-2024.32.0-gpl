import OpenUrl from '@/interfaces/OpenUrl';

const parseKeyValuePair = (acc: OpenUrl, keyValue: string): OpenUrl => {
  const [key, value] = keyValue.split('=');
  acc[key] = value ? value.replace(/\+/g, ' ') : undefined;
  return acc;
};

const CollectCoins = (acc: OpenUrl[], el: Element): OpenUrl[] => {
  const decodedTitle = decodeURIComponent((el as HTMLElement).title);
  // Split the decoded title by '&' to get key-value pairs
  const keyValuePairs = decodedTitle.split('&');

  // Use reduce to transform key-value pairs into an OpenUrl object
  const coinData = keyValuePairs.reduce(parseKeyValuePair, {} as OpenUrl);
  acc.push(coinData);
  return acc;
};

export default CollectCoins;
