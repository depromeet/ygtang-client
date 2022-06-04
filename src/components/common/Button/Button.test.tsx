import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';

const buttonText = '버튼 내용';

describe('components/common/Button/Button', () => {
  it('should defined', () => {
    expect(Button).toBeDefined();
  });

  it('should render children', () => {
    render(<Button>{buttonText}</Button>);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('onClick prop이 정상적으로 동작해야함', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>{buttonText}</Button>);

    expect(onClickMock).not.toBeCalled();
    fireEvent.click(screen.getByText(buttonText));
    expect(onClickMock).toBeCalled();
    expect(onClickMock).toBeCalledTimes(1);
  });
});
