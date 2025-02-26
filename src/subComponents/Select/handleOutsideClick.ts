/* See associated github commit for more context - re outside click definition and use - the outside click function is
triggered if the user clicks outside whatever element the outside click ref has been added to.
Currently it is being used alongside select to close the select list when the user
clicks outside of the select component. */
import { useEffect, useRef } from 'react';

const handleOutsideClick = (callback:any) => {
  const ref = useRef() as any;
  useEffect(() => {
    const handleClick = (event:any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);
  return ref;
};

export default handleOutsideClick;
