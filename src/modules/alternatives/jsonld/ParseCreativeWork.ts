import { CreativeWork } from 'schema-dts';

const ParseCreativeWork = (data: CreativeWork, idType: string): string => {
  if (
    'workExample' in data
    && Array.isArray(data.workExample)
    && data.workExample.length > 0
  ) {
    const workExample = data.workExample[0] as CreativeWork;
    return ParseCreativeWork(workExample, idType);
  }

  const key = Object.keys(data).find(k => {
    return k.toLowerCase() === idType.toLowerCase();
  });
  if (key) {
    return (data as Record<string, any>)[key];
  }

  if (
    typeof data.identifier === 'object'
    && 'propertyID' in data.identifier
    && 'value' in data.identifier
    && data.identifier.propertyID?.toString().toLowerCase() === idType.toLowerCase()
  ) {
    return data.identifier.value?.toString() || '';
  }

  return '';
};

export default ParseCreativeWork;
