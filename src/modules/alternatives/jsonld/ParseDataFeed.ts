import { DataFeed } from 'schema-dts';
import ParseCreativeWork from '@/modules/alternatives/jsonld/ParseCreativeWork';

const ParseDataFeed = (data: DataFeed, idType: string) => {
  if (Array.isArray(data.dataFeedElement) && data.dataFeedElement.length > 0) {
    const item = data.dataFeedElement[0];
    return ParseCreativeWork(item, idType);
  }

  return '';
};

export default ParseDataFeed;
