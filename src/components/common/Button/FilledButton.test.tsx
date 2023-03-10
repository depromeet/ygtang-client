import { fireEvent, screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import { FilledButton } from './FilledButton';

const MOCK_TEXT = 'filled button';

describe('components/common/Button/FilledButton', () => {
  it('정의되어 있어야함', () => {
    expect(FilledButton).toBeDefined();
  });

  it('colorType 주입없이 사용 가능해야함', () => {
    customRender(<FilledButton>{MOCK_TEXT}</FilledButton>);
    expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
  });

  it('colorType과 함께 사용 가능해야함', () => {
    customRender(<FilledButton colorType="dark">{MOCK_TEXT}</FilledButton>);
    // TODO: emotion css 테스트 환경 적용 후, css도 테스트해야함
    expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
  });

  it('onClick prop이 정상적으로 동작해야함', () => {
    const onClickMock = jest.fn();
    customRender(<FilledButton onClick={onClickMock}>{MOCK_TEXT}</FilledButton>);

    expect(onClickMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(MOCK_TEXT));
    expect(onClickMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
