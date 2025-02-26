const urlIsFile = (url: string): boolean => {
  const sanitiseUrl = url.toLowerCase();
  return sanitiseUrl.endsWith('.pdf')
  || sanitiseUrl.endsWith('.doc')
  || sanitiseUrl.endsWith('.docx')
  || sanitiseUrl.endsWith('.ppt')
  || sanitiseUrl.endsWith('.pptx');
};

export default urlIsFile;
