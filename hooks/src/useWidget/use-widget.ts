import { useEffect, useState } from 'react';

import { useScript } from '@src/useScript';
import { useLink } from '@src/useLink';

export const useWidget = (scriptSrc: string, styleSrc?: string) => {
  const { isLoaded: isScriptReady, isFailed: isScriptFailed } = useScript(scriptSrc);
  const { isLoaded: isStyleReady, isFailed: isStyleFailed, isSkip: isStyleSkip } = useLink(styleSrc, 'stylesheet');

  const [state, setState] = useState({
    isLoaded: false,
    isLoadFailed: false,
    loadedFailedMessage: '',
  });

  const getLoadedFailedMessage = () => (isScriptFailed ? 'Ошибка загрузки скрипта виджета' : isStyleFailed ? 'Ошибка загрузки стилей виджета' : '');

  useEffect(() => {
    const isLoadedScript = isScriptReady;
    const isLoadedStyle = isStyleReady || isStyleSkip;

    const isFailedScript = isScriptFailed;
    const isFailedLink = isStyleFailed && !isStyleSkip;

    setState((oldState) => ({
      ...oldState,
      isLoaded: isLoadedScript && isLoadedStyle,
      isLoadFailed: isFailedScript || isFailedLink,
      loadedFailedMessage: getLoadedFailedMessage(),
    }));
  }, [isScriptReady, isStyleReady, isScriptFailed, isStyleFailed]);

  return state;
};

export default useWidget;
