import { renderHook } from '@testing-library/react-hooks';

import { useInterval } from '@src/useInterval';

describe('useInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useInterval).toBeDefined();
  });

  it('should repeatedly calls provided spy with a fixed time delay between each call', () => {
    const spy = jest.fn();
    renderHook(() => useInterval(spy, 200));
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(199);
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);

    jest.advanceTimersToNextTimer();
    expect(spy).toHaveBeenCalledTimes(2);

    jest.advanceTimersToNextTimer(3);
    expect(spy).toHaveBeenCalledTimes(5);
  });

  it('should handle new interval when delay is updated', () => {
    const spy = jest.fn();
    let delay = 200;
    const { rerender } = renderHook(() => useInterval(spy, delay));
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(spy).toHaveBeenCalledTimes(1);

    delay = 500;
    rerender();

    jest.advanceTimersByTime(200);
    expect(spy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalledTimes(2);
  });
})