import PlatformGoogleScholar from '@/modules/shared/platforms/PlatformGoogleScholar';
import PlatformScite from '@/modules/shared/platforms/PlatformScite';
import Platform from '@/interfaces/Platform';
import PlatformGoogle from '@/modules/shared/platforms/PlatformGoogle';

export default (url: string) => ({
  /**
   * Gets current platform for the URL.
   * @returns {Platform}
   */
  current: (): Platform => {
    const platform = [
      { id: Platform.GoogleScholar, check: PlatformGoogleScholar },
      { id: Platform.Google, check: PlatformGoogle },
      { id: Platform.Scite, check: PlatformScite },
    ].find(({ check }) => check(url));
    return platform?.id || Platform.None;
  },
});
