import { useRef, useEffect, useCallback, DependencyList } from 'react';

import { TUseDebounceReturn } from './types';

export const useDebounce = <A extends any[]>(
  func: (...args: A) => void,
  delay: number,
  deps: DependencyList = []
): TUseDebounceReturn => {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(func);

  const isReady = useCallback(() => ready.current, []);

  const reset = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      // @ts-ignore
      callback.current();
    }, delay);
  }, [delay]);

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    callback.current = func;
  }, [func]);

  useEffect(() => {
    reset();
    return clear;
  }, [delay]);

  useEffect(reset, deps);

  return [isReady, clear];
}

export default useDebounce;