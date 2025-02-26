import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';

interface SavedArticleData {
  article: DigitalResource | NonAcademicResource,
  id: number,
}

export default SavedArticleData;
