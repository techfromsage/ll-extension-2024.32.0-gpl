import browserMethods from '@/browserMethods';

export default (url: string) => {
  return new Promise<void>(resolve => {
    browserMethods.tabs.background.create(url);
  });
};
