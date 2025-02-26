/**
 * @param {string} id - The id of the annotation to scroll to using the data-id attribute
 */

const scrollToHighlightElement = (id:string) => {
  const annotationElement = document.querySelector(`[data-id="${id}"]`);
  if (annotationElement) {
    window.scrollTo({
      top: annotationElement.getBoundingClientRect().top + window.scrollY - 100,
      behavior: 'smooth',
    });
  }
};

export default scrollToHighlightElement;
