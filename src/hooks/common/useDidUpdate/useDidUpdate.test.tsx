import { useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { cleanup as hookCleanup, renderHook } from '@testing-library/react-hooks';

import useDidUpdate from './useDidUpdate';

const STATE_BUTTON = 'setState';

describe('hooks/common/useDidUpdate/useDidUpdate', () => {
  let App: () => JSX.Element;
  const mockCallback = jest.fn();

  beforeEach(() => {
    App = function () {
      const [state, setState] = useState(false);

      useDidUpdate(() => {
        mockCallback();
      }, [state]);

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

  it('should defined', () => {
    expect(useDidUpdate).toBeDefined();
  });

  it('not called callback when mounted', () => {
    const mockCallback = jest.fn();
    renderHook(() => useDidUpdate(mockCallback, []));
    expect(mockCallback).not.toBeCalled();
  });

  it('called when dependency list update', () => {
    render(<App />);
    expect(mockCallback).not.toBeCalled();
    const setStateButton = screen.getByText(STATE_BUTTON);
    fireEvent.click(setStateButton);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
