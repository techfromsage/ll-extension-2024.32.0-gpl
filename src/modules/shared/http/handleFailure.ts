import consoleDev from '@/dev/consoleDev';

export default (response: Response) => {
  consoleDev({
    title: `HTTP ${response.status} response`,
    message: response,
    type: 'trace',
  });
  const { status: statusCode, statusText } = response;
  throw new Error(JSON.stringify({ statusCode, statusText }));
};
