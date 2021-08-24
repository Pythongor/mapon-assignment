import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;
type Callback = () => void;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: Callback,
): void => {
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!ref.current?.contains(e.target as Node)) callback();
    };

    document.addEventListener('touchend', handleClick);
    document.addEventListener('mouseup', handleClick);
    return () => {
      document.removeEventListener('touchend', handleClick);
      document.removeEventListener('mouseup', handleClick);
    };
  }, [ref, callback]);
};
