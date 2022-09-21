import { useEffect, useState, useCallback } from 'react';

import { isBreakpoint, BreakPoints } from './types';

const useBreakpoint = (defaultBreakpoint?: BreakPoints): BreakPoints => {
  const [twoPassRender, setTwoPassRender] = useState(false);
  const [activeBreakpoint, setActiveBreakpoint] = useState(defaultBreakpoint || isBreakpoint.getActive());

  useEffect(() => {
    if (defaultBreakpoint) {
      const newBreakpoint = isBreakpoint.getActive();

      if (newBreakpoint !== defaultBreakpoint) {
        setActiveBreakpoint(newBreakpoint);
        setTwoPassRender(true);
      }
    }
  }, []);

  const matchingActiveBreakpoint = useCallback(() => {
    requestAnimationFrame(() => {
      setActiveBreakpoint(isBreakpoint.getActive());
    });
  }, [isBreakpoint.getActive]);

  useEffect(() => {
    window.addEventListener('resize', matchingActiveBreakpoint);

    return () => {
      window.removeEventListener('resize', matchingActiveBreakpoint);
    };
  }, []);

  return activeBreakpoint;
};

export { useBreakpoint, BreakPoints };