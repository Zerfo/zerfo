import { rendererHook } from '@utils/render-hook';

import { useWidget } from '@src/useWidget';

const SCRIPT_SRC = 'script-src';
const LINK_SRC = 'link-src';

describe('useWidget', () => {
  const spyDocumentHeadAppendChild = jest.spyOn(document.head, 'appendChild')
    .mockImplementation(jest.fn());

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should add script and link tag to head', () => {
    rendererHook(useWidget, [SCRIPT_SRC, LINK_SRC]);

    expect(spyDocumentHeadAppendChild).toBeCalledTimes(2);
  });

  it('should add only script tag to head when style src is empty', () => {
    rendererHook(useWidget, [SCRIPT_SRC, '']);

    expect(spyDocumentHeadAppendChild).toBeCalledTimes(1);
  });
});
