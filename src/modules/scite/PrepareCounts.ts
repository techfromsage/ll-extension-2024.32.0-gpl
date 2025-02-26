import { SciteNotices } from '@/interfaces/scite/SciteNotices';
import { SciteTalliesItem } from '@/interfaces/scite/SciteTalliesResponse';

const allowedMetrics = ['citingPublications', 'supporting', 'mentioning', 'contradicting'];
const retractedLemmas = ['retract', 'withdraw', 'remove'];

enum Metrics {
  CitingPublications = 'citingPublications',
  Supporting = 'supporting',
  Mentioning = 'mentioning',
  Contradicting = 'contradicting',
  Retractions = 'retractions',
  Notices = 'notices',
}

type Count = [Metrics, string];

const PrepareCounts = (tally: SciteTalliesItem, notices: SciteNotices): Count[] => {
  const items: Count[] = Object.entries(tally)
    .filter(([metricName]) => allowedMetrics.includes(metricName))
    .sort((a, b) => allowedMetrics.indexOf(a[0]) - allowedMetrics.indexOf(b[0]))
    .map(([metricName, value]) => [metricName as Metrics, value.toLocaleString()]);

  const retractionCount = notices.filter(notice => retractedLemmas.some(lemma => notice.toLowerCase().includes(lemma))).length;
  const noticeCount = notices.length - retractionCount;

  if (retractionCount) {
    items.push([Metrics.Retractions, retractionCount.toLocaleString()]);
  }
  if (noticeCount) {
    items.push([Metrics.Notices, noticeCount.toLocaleString()]);
  }

  return items;
};

export default PrepareCounts;
