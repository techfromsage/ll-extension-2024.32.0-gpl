import { StoreState } from '@/store';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import HighlightAndAnnotatePageData from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotatePageData';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';

interface HighlightAndAnnotateAlert {
  message: string,
  type?: string,
  icon?: string,
  button?: string,
}
interface HighlightAndAnnotateContext {
  appSettings: StoreState['appSettings'],
  user: StoreState['user'],
  digitalResources: DigitalResource[],
  nonAcademicResources: NonAcademicResource[],
  pageData: HighlightAndAnnotatePageData,
  annotations: Annotation[],
  libraryItemId: number | null,
  alert: HighlightAndAnnotateAlert[],
}

export default HighlightAndAnnotateContext;
