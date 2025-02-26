import ShadowList from '@/enums/ShadowList';

/**
 * Remove Scite badges from any page
 */
export default (document: Document) => {
  document.querySelectorAll(`[id^=${ShadowList.Scite}]`).forEach(
    badge => badge.remove(),
  );
};
