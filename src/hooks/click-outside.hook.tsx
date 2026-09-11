import { RefObject, useEffect, useRef } from 'react';

export function useClickOutside(callback: () => void): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [callback]);

  return ref;
}
