import fetchBaseData from '@/background/fetchData/fetchBaseData';
import BackgroundStoreResponse from '@/enums/BackgroundStoreResponse';
import fetchInstitutionData from '@/background/fetchData/fetchInstitutionData';
import fetchSciwheelData from '@/background/fetchData/fetchSciwheelData';

const RETRY_FETCH_IN_MS = 8_000;

const updateData = async (retries = 2): Promise<BackgroundStoreResponse> => {
  const res = await fetchBaseData();
  console.log('Fetch base data status:', res.status);
  if (res.status === 'success') {
    return await fetchInstitutionData() && fetchSciwheelData();
  }

  if (retries > 0) {
    await new Promise(resolve => {
      setTimeout(resolve, RETRY_FETCH_IN_MS);
    });
    return updateData(retries - 1);
  }
  throw new Error('Retried fetch data too many times.');
};

export default updateData;
