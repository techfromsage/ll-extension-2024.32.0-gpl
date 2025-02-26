import OpenUrl from '@/interfaces/OpenUrl';
import DoiMatch from '@/modules/alternatives/doi/DoiMatch';

const ParseCoinDoi = (coinData: OpenUrl): string => {
  const rftId = coinData.rft_id;

  if (!rftId) {
    return '';
  }

  return DoiMatch.first([rftId]);
};

export default ParseCoinDoi;
