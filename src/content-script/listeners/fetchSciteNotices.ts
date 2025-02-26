import { Config } from '@/interfaces/Config';
import browserMethods from '@/browserMethods';
import { ScitePapersResponse } from '@/interfaces/scite/ScitePapersResponse';
import { SciteNoticesResponse, SciteNotices, SciteNoticesEnum } from '@/interfaces/scite/SciteNotices';

const NOTICE_STATUSES = Object.values(SciteNoticesEnum);

/**
 * For a given set of dois, fetch its scite.ai metadata from their API.
 */
export default (config: Config, dois: string[]): Promise<SciteNoticesResponse> => {
  const { httpRequest } = browserMethods.app.contentScript;
  const papers = httpRequest<ScitePapersResponse>({
    method: 'post',
    url: config.api.scite.papers,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dois),
  });

  return Promise.resolve(papers).then(data => {
    const notices: { [key: string]: SciteNotices } = {};
    // for each paper, get the editorial notices
    // filter out notices that are not in the NOTICE_STATUSES array
    // map the notices to their status
    // return the notices
    Object.keys(data.papers).forEach(doi => {
      const paper = data.papers[doi];
      const paperNotices = paper.editorialNotices.filter(notice =>
        NOTICE_STATUSES.includes(notice.status.toLowerCase() as SciteNoticesEnum));
      const status = paperNotices.map(notice => notice.status);
      notices[doi] = status;
    });
    return { notices };
  });
};
