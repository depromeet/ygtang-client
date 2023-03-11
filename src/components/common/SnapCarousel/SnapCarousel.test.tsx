import { screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import { SnapCarousel } from './SnapCarousel';

const CAROUSEL_WARPPER_TEST_ID = 'carouselWrapper';
const mockChildren = 'children';

describe('components/common/SnapCarousel', () => {
  it('should defined', () => {
    expect(SnapCarousel).toBeDefined();
    expect(SnapCarousel.Wrapper).toBeDefined();
    expect(SnapCarousel.Item).toBeDefined();
  });

  it('Wrapper는 ref 없이도 children을 렌더링합니다', () => {
    customRender(<SnapCarousel.Wrapper>{mockChildren}</SnapCarousel.Wrapper>);
    expect(screen.getByText(mockChildren)).toBeInTheDocument();
  });

  it('Wrapper는 ref를 사용할 수 있습니다', () => {
    const mockSetRef = jest.fn();

    customRender(<SnapCarousel.Wrapper ref={mockSetRef}>{mockChildren}</SnapCarousel.Wrapper>);

    expect(screen.getByTestId(CAROUSEL_WARPPER_TEST_ID)).toBeInTheDocument();
    expect(mockSetRef).toHaveBeenCalled();
  });

  it('Item은 children을 렌더링합니다', () => {
    customRender(<SnapCarousel.Item>{mockChildren}</SnapCarousel.Item>);
    expect(screen.getByText(mockChildren)).toBeInTheDocument();
  });
});
