import { CreativeWork, DataFeed } from 'schema-dts';
import ParseDataFeed from '@/modules/alternatives/jsonld/ParseDataFeed';
import ParseCreativeWork from '@/modules/alternatives/jsonld/ParseCreativeWork';

/**
 * Gets the value of an ID from JSON-LD (Linked Data)
 * @see https://json-ld.org/
 */
const GetIdFromJSONLD = (jsonld: string, idType: string): string => {
  try {
    const data = JSON.parse(jsonld) as CreativeWork;

    if (data['@type'] === 'DataFeed') {
      return ParseDataFeed(data as DataFeed, idType);
    }

    return ParseCreativeWork(data, idType);
  } catch {
    return '';
  }
};

export default GetIdFromJSONLD;
