import { useEffect, useState } from 'react';

export const useLink = (href?: string, rel?: string) => {
  const [state, setState] = useState({
    isLoaded: false,
    isFailed: false,
    isSkip: !href,
  });

  const getLink = () => document.querySelector<HTMLLinkElement>(`link[href="${href}"]`);

  const onLoadEvent = (event: Event) => {
    const isLoaded = event.type === 'load';
    const isError = event.type === 'error';

    setState({ isLoaded, isFailed: !isLoaded, isSkip: false });

    if (isError) {
      const link = getLink();

      link?.remove();
    }
  };

  useEffect(() => {
    if (href) {
      let link = getLink();

      if (!link) {
        link = document.createElement('link');
        link.rel = rel || '';
        link.href = href;

        document.head.appendChild(link);

        link.addEventListener('load', onLoadEvent);
        link.addEventListener('error', onLoadEvent);
      } else {
        setState({ ...state, isFailed: false, isLoaded: true });
      }

      return () => {
        if (link) {
          link.removeEventListener('load', onLoadEvent);
          link.removeEventListener('error', onLoadEvent);
        }
      };
    }
  }, [href]);

  return state;
};

export default useLink;
