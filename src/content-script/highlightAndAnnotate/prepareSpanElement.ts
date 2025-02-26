import ShadowList from '@/enums/ShadowList';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import findAnnotationBackgroundColor from '@/modules/highlightAndAnnotate/helpers/findAnnotationBackgroundColor';

const prepareSpanElement = (annotation: Annotation | undefined): HTMLSpanElement => {
  const span = document.createElement('span');
  span.className = ShadowList.HighlightAndAnnotateElement;

  // Add annotation id and color to the span if it exists
  if (annotation) {
    const { id, color } = annotation;

    span.style.backgroundColor = findAnnotationBackgroundColor(color);
    span.style.position = 'relative';
    span.dataset.id = id;
  }

  return span;
};

export default prepareSpanElement;
