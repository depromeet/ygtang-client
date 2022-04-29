import React from 'react';
import { render, screen } from '@testing-library/react';

import Button from './Button';

const buttonText = '버튼 내용';

describe('components/common/Button/Button', () => {
  it('should render children', () => {
    render(<Button>{buttonText}</Button>);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });
});
