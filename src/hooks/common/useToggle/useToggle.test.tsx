import { renderHook } from '@testing-library/react-hooks';

import useToggle from './useToggle';

describe('hooks/common/useToggle/useToggle', () => {
  it('should defined with default', () => {
    expect(useToggle).toBeDefined();
  });

  it('should return initial value', () => {
    const initialValue = false;
    const { result } = renderHook(() => useToggle(initialValue));
    expect(result.current[0]).toEqual(initialValue);
  });

  it('should toggle when called second result', () => {
    const initialValue = false;
    const { result } = renderHook(() => useToggle(initialValue));
    expect(result.current[0]).toEqual(initialValue);
    result.current[1]();
    expect(result.current[0]).toEqual(!initialValue);
  });
});
