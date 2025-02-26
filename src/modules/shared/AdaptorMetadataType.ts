import DigitalResourceType from '@/enums/DigitalResourceType';

const AdaptorMetadataType = (type: string): DigitalResourceType => {
  switch (type) {
    case 'journal-article':
      return DigitalResourceType.Article;
    case 'book':
      return DigitalResourceType.EBook;
    default:
      return DigitalResourceType.Website;
  }
};

export default AdaptorMetadataType;
