import StoreNamespace from '@/enums/StoreNamespace';
import BrowserMethods from '@/interfaces/browser/BrowserMethods';
import StoreInstituteIds from '@/interfaces/StoreInstituteIds';

const recoveryKey = 'llRecoveryInstitute';
type LLRecoveryInstitute = { [recoveryKey]?: string[] };

/**
 * Restore base instituteIds from recovery if needed.
 */
export default async (currentVersion: string, browserMethods: BrowserMethods) => {
  if (currentVersion === '2024.2.8') {
    const { llRecoveryInstitute } = await browserMethods.storage.getItem<LLRecoveryInstitute>(recoveryKey);
    const { instituteIds } = await browserMethods.storage.getItem<StoreInstituteIds>(StoreNamespace.InstituteIds);
    if (llRecoveryInstitute?.length && !instituteIds?.length) {
      await browserMethods.storage.setItem(StoreNamespace.InstituteIds, llRecoveryInstitute);
    }
  }
};
