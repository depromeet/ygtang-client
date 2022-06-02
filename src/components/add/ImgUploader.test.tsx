import { screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import { IMAGE_INPUT_ID, ImgUploader } from './ImgUploader';

describe('components/add/ImgUploader', () => {
  it('컴포넌트와 ID가 정의되어 있어야합니다.', () => {
    expect(IMAGE_INPUT_ID).toBeDefined();
    expect(ImgUploader).toBeDefined();
  });

  it('input 태그를 렌더해야 합니다', () => {
    const mockUploader = jest.fn();
    customRender(<ImgUploader imgInputUploader={mockUploader} />);
    expect(screen.getByTestId(IMAGE_INPUT_ID).tagName).toBe('INPUT');
  });

  // TODO: 추가적인 테스트 진행
});
