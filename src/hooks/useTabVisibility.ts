import { useState, useEffect } from 'react';

function useTabVisibility(): boolean {
  const [isTabActive, setIsTabActive] = useState<boolean>(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isTabActive;
}

export default useTabVisibility;
