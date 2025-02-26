import GetCoins from '@/modules/alternatives/coins/GetCoins';
import ParseCoinPMID from '@/modules/alternatives/coins/ParseCoinPMID';
import ScrapedContent from '@/interfaces/alternatives/ScrapedContent';
import ScraperType from '@/enums/ScraperType';

const PMIDFromCoins = (parentNode: Document): ScrapedContent => ({
  scrape(): string {
    const elements = GetCoins(parentNode);
    const match = elements.find(el => !!el.rft_id);
    return match ? ParseCoinPMID(match) : '';
  },
  scrapeAll() {
    const elements = GetCoins(parentNode);
    return elements.filter(el => !!el.rft_id)
      .map(el => {
        return {
          identifier: ParseCoinPMID(el),
          scraper: ScraperType.Coins,
        };
      });
  },
});

export default PMIDFromCoins;
