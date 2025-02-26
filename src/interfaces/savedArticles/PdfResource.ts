interface PdfResource {
  id: string,
  fileName: string,
  status: string,
  statusDetail: string,
  localFilePath?: string | null,
  cloudFilePath: string,
  uploader: boolean,
  size: string,
}

export default PdfResource;
