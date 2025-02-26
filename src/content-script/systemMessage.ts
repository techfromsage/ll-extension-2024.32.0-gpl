import Institution from '@/interfaces/Institution';
import SystemMessage from '@/interfaces/systemMessage/SystemMessage';
import bootstrap from '@bootstrap/index';

const systemMessage = (
  tabUrl: URL,
  institutes: Institution[],
): (SystemMessage | undefined) => {
  const messages: SystemMessage[] = [];

  if (bootstrap.environment !== 'production') {
    // don't show the Sciwheel welcome message on production
    messages.push({
      id: 'systemMessage-sciwheel-login',
      title: 'Welcome to Sciwheel',
      message: `You are now connected to your reference library.
        You can use the extension to easily save and annotate references on the web.
        Just click the extension icon in your preferred website to get started!`,
      triggerUrl: 'https://sciwheel.com/work/#/dashboard',
      institution: institutes[0],
    });
  }

  return messages.find(({ triggerUrl }) => tabUrl.href.includes(triggerUrl));
};

export default systemMessage;
