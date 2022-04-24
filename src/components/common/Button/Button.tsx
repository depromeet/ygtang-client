import { ButtonHTMLAttributes } from 'react';
import { css, Theme } from '@emotion/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
  const { children, ...rest } = props;

  return (
    <button css={buttonCss} {...rest}>
      {children}
    </button>
  );
}

const buttonCss = (theme: Theme) => css`
  padding: 4px 10px;
  border-radius: ${theme.borderRadius.default};
  color: ${theme.color.background};
  background-color: ${theme.color.gray05};
  font-size: '12px';
`;
