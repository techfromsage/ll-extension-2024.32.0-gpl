import GetCoins from '@/modules/alternatives/coins/GetCoins';
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import ParseCoinDoi from '@/modules/alternatives/coins/ParseCoinDoi';
import ScraperType from '@/enums/ScraperType';

const DoiFromCoins = (document: Document): ScrapedContent => {
  const elements = GetCoins(document).filter(el => !!el.rft_id);
  return {
    scrape(): string {
      const match = elements[0];
      return match ? ParseCoinDoi(match) : '';
    },
    scrapeAll() {
      const foundDois = elements
        .map(ParseCoinDoi)
        .filter(Boolean);
      return foundDois.map(identifier => ({
        identifier,
        scraper: ScraperType.Coins,
      }));
    },
  };
};

export default DoiFromCoins;
