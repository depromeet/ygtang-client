import { fireEvent, screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import { CTAButton } from './CTAButton';

const MOCK_TEXT = 'CTA button';

describe('components/common/Button/CTAButton', () => {
  it('정의되어 있어야함', () => {
    expect(CTAButton).toBeDefined();
  });

  it('onClick prop이 정상적으로 동작해야함', () => {
    const onClickMock = jest.fn();
    customRender(<CTAButton onClick={onClickMock}>{MOCK_TEXT}</CTAButton>);

    expect(onClickMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(MOCK_TEXT));
    expect(onClickMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
