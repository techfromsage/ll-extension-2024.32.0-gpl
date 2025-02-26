interface StorageMethods {
  getItem: <T>(key: string) => Promise<T>,
  setItem: (key: string, value: any) => Promise<void>,
  removeItem: (key: string | string[]) => Promise<void>,
  clear: () => Promise<void>,
}

export default StorageMethods;
