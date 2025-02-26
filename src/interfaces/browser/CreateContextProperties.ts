interface CreateContextProperties {
  id: string,
  title: string,
  parentId?: string | null,
  contexts: string[],
}

export default CreateContextProperties;
