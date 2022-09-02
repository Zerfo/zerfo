import { rendererHook } from '@utils/render-hook';

import { useLink } from '@src/useLink';

const LINK_SRC = 'link-src';
const LINK_REL = 'stylesheet';

describe('useLink', () => {
  const spyDocumentHeadAppendChild = jest.spyOn(document.head, 'appendChild')
    .mockImplementation(jest.fn());
  const spyDocumentQuerySelector = jest.spyOn(document, 'querySelector')
    .mockImplementation(jest.fn());

  const createLink = (src: string) => {
    const link = document.createElement('script');

    link.src = src;

    return link;
  }

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should add link tag to head', () => {
    rendererHook(useLink, [LINK_SRC, LINK_REL])

    expect(spyDocumentHeadAppendChild).toBeCalledTimes(1);
  });

  it('should not add link tag when same source tag exist', () => {
    const link = createLink(LINK_SRC)
    spyDocumentQuerySelector.mockReturnValue(link)

    rendererHook(useLink, [LINK_SRC, LINK_REL])
    document.head.appendChild(link);

    expect(spyDocumentHeadAppendChild).toBeCalledTimes(1);
  })

  it('should not add link tag when src argument is empty', () => {
    rendererHook(useLink, ['', LINK_REL])

    expect(spyDocumentHeadAppendChild).toBeCalledTimes(0);
  })
});
