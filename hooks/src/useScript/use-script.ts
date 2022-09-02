import { useEffect, useState } from 'react';

export const useScript = (src: string) => {
  const [state, setState] = useState({
    isLoaded: false,
    isFailed: false,
  });

  const getScript = () => document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);

  const onLoadEvent = (event: Event) => {
    const isLoaded = event.type === 'load';
    const isError = event.type === 'error';

    setState({ isLoaded, isFailed: !isLoaded });

    if (isError) {
      const script = getScript();

      script?.remove();
    }
  };

  useEffect(() => {
    let script = getScript();

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;

      document.head.appendChild(script);

      script.addEventListener('load', onLoadEvent);
      script.addEventListener('error', onLoadEvent);
    } else {
      setState({ ...state, isLoaded: true, isFailed: false });
    }

    return () => {
      if (script) {
        script.removeEventListener('load', onLoadEvent);
        script.removeEventListener('error', onLoadEvent);
      }
    };
  }, [src]);

  return state;
};

export default useScript;
