import { fireEvent, screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import { GhostButton } from './GhostButton';

const MOCK_TEXT = 'ghost button';

describe('components/common/Button/GhostButton', () => {
  it('정의되어 있어야함', () => {
    expect(GhostButton).toBeDefined();
  });

  it('사이즈 주입없이 사용 가능해야함', () => {
    customRender(<GhostButton>{MOCK_TEXT}</GhostButton>);
    expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
  });

  it('사이즈와 함께 사용 가능해야함', () => {
    customRender(<GhostButton size="large">{MOCK_TEXT}</GhostButton>);
    // TODO: emotion css 테스트 환경 적용 후, css도 테스트해야함
    expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
  });

  it('onClick prop이 정상적으로 동작해야함', () => {
    const onClickMock = jest.fn();
    customRender(<GhostButton onClick={onClickMock}>{MOCK_TEXT}</GhostButton>);

    expect(onClickMock).not.toBeCalled();
    fireEvent.click(screen.getByText(MOCK_TEXT));
    expect(onClickMock).toBeCalled();
    expect(onClickMock).toBeCalledTimes(1);
  });
});
