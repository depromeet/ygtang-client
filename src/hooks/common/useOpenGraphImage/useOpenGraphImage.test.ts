import { SyntheticEvent } from 'react';
import { act, renderHook } from '@testing-library/react';

import useOpenGraphImage from './useOpenGraphImage';

const MOCK_URL = 'https://app.ygtang.kr/';
const MOCK_IMAGE = 'foobar.png';

describe('hooks/common/useOpenGraphImage', () => {
  it('default export로 정의되어 있어야함', () => {
    expect(useOpenGraphImage).toBeDefined();
  });

  it('url과 image가 정의되어 있을 때 초기 src 값은 둘을 합한 값이여야함', () => {
    const { result } = renderHook(() => useOpenGraphImage({ url: MOCK_URL, image: MOCK_IMAGE }));
    expect(result.current.src).toBe(MOCK_URL + MOCK_IMAGE);
  });

  it('url이 정의되어있지 않을 때, 초기 src 값은 image 값이여야함', () => {
    const { result } = renderHook(() => useOpenGraphImage({ url: undefined, image: MOCK_IMAGE }));
    expect(result.current.src).toBe(MOCK_IMAGE);
  });

  it('url과 image가 정의되어 있을 때 이미지 에러가 발생하면 src는 image 값이여야함', () => {
    const { result } = renderHook(() => useOpenGraphImage({ url: MOCK_URL, image: MOCK_IMAGE }));

    const mockEvent = {
      currentTarget: { src: result.current.src },
    } as unknown as SyntheticEvent<HTMLImageElement>;

    act(() => {
      result.current.onImageError(mockEvent);
    });
    expect(result.current.src).toBe(MOCK_IMAGE);
  });
});
