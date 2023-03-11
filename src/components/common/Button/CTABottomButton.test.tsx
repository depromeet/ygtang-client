import { fireEvent, screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import { CTABottomButton } from './CTABottomButton';

const MOCK_TEXT = 'CTA bottom button';

describe('components/common/Button/CTABottomButton', () => {
  it('정의되어 있어야함', () => {
    expect(CTABottomButton).toBeDefined();
  });

  it('onClick prop이 정상적으로 동작해야함', () => {
    const onClickMock = jest.fn();
    customRender(<CTABottomButton onClick={onClickMock}>{MOCK_TEXT}</CTABottomButton>);

    expect(onClickMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(MOCK_TEXT));
    expect(onClickMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  // TODO: 테스트 CSS 환경 적용 이후, isIos에 따른 padding 값 확인
});
