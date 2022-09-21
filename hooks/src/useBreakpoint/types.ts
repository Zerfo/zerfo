enum BreakPoints {
  DESKTOP = 'desktop',
  TABLET_PORTRAIT = 'tablet-portrait',
  TABLET_LANDSCAPE = 'tablet-landscape',
  MOBILE = 'mobile',
}

const defaultBreakpoints = {
  [BreakPoints.TABLET_LANDSCAPE]: 1280,
  [BreakPoints.TABLET_PORTRAIT]: 1024,
  [BreakPoints.MOBILE]: 768,
};

const matches = {
  isDesktop: BreakPoints.DESKTOP,
  isTabletLandscape: BreakPoints.TABLET_LANDSCAPE,
  isTabletPortrait: BreakPoints.TABLET_PORTRAIT,
  isMobile: BreakPoints.MOBILE,
};

const getActiveBreakPoint = () => {
  if (typeof window === 'undefined') {
    return BreakPoints.DESKTOP;
  }

  // eslint-disable-next-line no-prototype-builtins
  if (window.hasOwnProperty('matchMedia')) {
    if (window?.matchMedia(`(max-width: ${defaultBreakpoints[BreakPoints.MOBILE] - 1}px)`).matches) {
      return BreakPoints.MOBILE;
    }

    if (window?.matchMedia(
      `(max-width: ${defaultBreakpoints[BreakPoints.TABLET_PORTRAIT] - 1}px)`,
    ).matches) {
      return BreakPoints.TABLET_PORTRAIT;
    }

    if (window?.matchMedia(
      `(max-width: ${defaultBreakpoints[BreakPoints.TABLET_LANDSCAPE] - 1}px)`,
    ).matches) {
      return BreakPoints.TABLET_LANDSCAPE;
    }

    if (window?.matchMedia(`(min-width: ${defaultBreakpoints[BreakPoints.TABLET_LANDSCAPE]}px)`).matches) {
      return BreakPoints.DESKTOP;
    }
  }

  return BreakPoints.DESKTOP;
};

type IsBreakpointReturnType = { [key in keyof typeof matches]: () => boolean }
type IsBreakpoint = IsBreakpointReturnType & { getActive: () => BreakPoints };

const isBreakpoint: IsBreakpoint = (() => {
  const getBreakpoint = getActiveBreakPoint();

  const currentBreakPoint = Object.entries(matches).reduce((acc, [name, point]) => {
    acc[name] = () => point === getBreakpoint;

    return acc;
  }, {} as any) as IsBreakpointReturnType;

  return {
    ...currentBreakPoint,
    getActive: getActiveBreakPoint,
  };
})();

export { isBreakpoint, BreakPoints };