import { rendererHook } from '@utils/render-hook';

import { useScript } from '@src/useScript';

const SCRIPT_SRC = 'script-src';

describe('useScript', () => {
  const spyDocumentHeadAppendChild = jest.spyOn(document.head, 'appendChild')
    .mockImplementation(jest.fn());
  const spyDocumentQuerySelector = jest.spyOn(document, 'querySelector')
    .mockImplementation(jest.fn());

  const createScript = (src: string) => {
    const script = document.createElement('script');

    script.src = src;

    return script;
  }

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should add script tag to head', () => {
    rendererHook(useScript, [SCRIPT_SRC]);

    expect(spyDocumentHeadAppendChild).toBeCalledTimes(1);
  });

  it('should not add script tag when tag with same source exist', () => {
    const script = createScript(SCRIPT_SRC)
    spyDocumentQuerySelector.mockReturnValue(script)

    rendererHook(useScript, [SCRIPT_SRC]);
    document.head.appendChild(script);

    expect(spyDocumentHeadAppendChild).toBeCalledTimes(1);
  })
});
