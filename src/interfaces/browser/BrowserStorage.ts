/**
 * Interface BrowserStorage standardises CRUD operations on storage between browser engines.
 * i.e. Chrome vs Safari.
 */
interface BrowserStorage {
  setItem: (key: string, item: string) => Promise<void>,
  getItem: (key: string) => Promise<string | null>,
  removeItem: (key: string) => Promise<void>,
}

export default BrowserStorage;
