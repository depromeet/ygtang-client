import { useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { cleanup as hookCleanup, renderHook } from '@testing-library/react-hooks';

import useDidMount from './useDidMount';

const STATE_BUTTON = 'setState';

describe('hooks/common/useDidMount/useDidMount', () => {
  let App: () => JSX.Element;
  const mockCallback = jest.fn();

  beforeEach(() => {
    App = function () {
      const [_, setState] = useState(false);

      useDidMount(mockCallback);
      return (
        <div>
          <button onClick={() => setState(prev => !prev)}>{STATE_BUTTON}</button>
        </div>
      );
    };
  });

  afterAll(() => {
    cleanup();
    hookCleanup();
  });

  it('should defined with default', () => {
    expect(useDidMount).toBeDefined();
  });

  it('called effect callback', () => {
    const effectCallback = jest.fn();
    renderHook(() => useDidMount(effectCallback));
    expect(effectCallback).toBeCalled();
  });

  it('called once when rerender', () => {
    const effectCallback = jest.fn();
    const { rerender } = renderHook(() => useDidMount(effectCallback));
    rerender();
    expect(effectCallback).toHaveBeenCalledTimes(1);
  });

  it('called once when state changed', () => {
    render(<App />);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    const setStateButton = screen.getByText(STATE_BUTTON);
    fireEvent.click(setStateButton);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
