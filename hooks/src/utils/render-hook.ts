import { renderHook } from '@testing-library/react-hooks';

export const rendererHook = <A extends any[]>(hook: (...args: A) => any, params: A) => renderHook(() => hook(...params));
