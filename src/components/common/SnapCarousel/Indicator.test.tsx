import { useState } from 'react';
import { screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import { Indicator } from './Indicator';

const INDICATOR_TEST_ID = 'carouselIndicator';

describe('components/common/SnapCarousel/Indicator', () => {
  it('should defined', () => {
    expect(Indicator).toBeDefined();
  });

  it('ref의 자식 개수만큼 span을 생성합니다', () => {
    const WRAPPER_TEST_ID = 'wrapper';

    function App() {
      const [ref, setRef] = useState<HTMLDivElement | null>(null);

      return (
        <div>
          <div ref={setRef} data-testid={WRAPPER_TEST_ID}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <Indicator wrapperRef={ref} />
        </div>
      );
    }

    customRender(<App />);
    expect(screen.getByTestId(INDICATOR_TEST_ID)).toBeInTheDocument();

    const wrapper = screen.getByTestId(WRAPPER_TEST_ID);
    expect(wrapper.childNodes.length).toBe(3);
  });
});
