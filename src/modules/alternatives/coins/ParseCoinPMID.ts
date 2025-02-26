import OpenUrl from '@/interfaces/OpenUrl';

const PMID_PATTERN = /^info:pmid\//i;

const ParseCoinPMID = (coinData: OpenUrl): string => {
  const rftId = coinData.rft_id;

  if (typeof rftId === 'string') {
    return rftId.replace(PMID_PATTERN, '');
  }

  return '';
};

export default ParseCoinPMID;
