import update_2023_13_0_InsydeToCheddar from '@/updates/update_2023_13_0_InsydeToCheddar';
import update_2024_1_0_InstituteIdsToBaseStorage from '@/updates/update_2024_1_0_InstituteIdsToBaseStorage';
import browserMethods from '@/browserMethods';
import { store } from '@/store';
import update_2024_2_8_RestoreBaseInstituteIdsFromRecoveryIfNeeded
  from '@/updates/update_2024_2_8_RestoreBaseInstituteIdsFromRecoveryIfNeeded';
import updateData from './updateData';

// eslint-disable-next-line no-useless-escape
const REGEX_VERSION = '^(\\d{4})\.(\\d+)\.(\\d+)$';

const extractVersion = (version: string) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_, ...versionParts] = version.match(REGEX_VERSION) || [];
  return versionParts.map(Number);
};

/**
 * Update the extension on every version change.
 * @param previousVersion
 */
export default async (previousVersion: string) => {
  const [previousYear, previousMajor] = extractVersion(previousVersion);
  const manifest = browserMethods.runtime.manifest();

  await update_2023_13_0_InsydeToCheddar(previousYear, browserMethods, store.getState());
  await update_2024_1_0_InstituteIdsToBaseStorage(previousYear, previousMajor, browserMethods);
  await update_2024_2_8_RestoreBaseInstituteIdsFromRecoveryIfNeeded(manifest.version, browserMethods);

  // Re-sync data after updates.
  return updateData();
};
