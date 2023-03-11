import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import Button from './Button';

const buttonText = '버튼 내용';

describe('components/common/Button/Button', () => {
  it('should defined', () => {
    expect(Button).toBeDefined();
  });

  it('should render children', () => {
    customRender(<Button>{buttonText}</Button>);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('onClick prop이 정상적으로 동작해야함', () => {
    const onClickMock = jest.fn();
    customRender(<Button onClick={onClickMock}>{buttonText}</Button>);

    expect(onClickMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(buttonText));
    expect(onClickMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
