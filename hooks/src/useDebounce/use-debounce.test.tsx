import React from 'react';

import { rendererHook } from '@utils/render-hook';

import { useDebounce } from '@src/useDebounce';

jest.useFakeTimers('modern');

describe('useDebounce', () => {
  it.todo('put initialized value in first render');
  it.todo('will update value when timer is called');
  it.todo('will update value immediately if leading is set to true');
  it.todo('will cancel value when cancel method is called');
  it.todo('should apply the latest value');
  it.todo('should cancel maxWait callback');
  it.todo('should apply the latest value if maxWait timeout is called');
  it.todo("shouldn't apply the previous value if it was changed to started one");
  it.todo("shouldn't rerender component for the first time");
  it.todo("should use equality function if supplied");
  it.todo("should setup new value immediately if callPending is called");
  it.todo("should preserve debounced object between re-renders");
  it.todo("should change debounced. isPending to true as soon as the function is called in a sync way");
});
