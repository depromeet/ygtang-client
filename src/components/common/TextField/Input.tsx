import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, useRef } from 'react';
import { css, jsx, Theme } from '@emotion/react';

type InputAndTextarea = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface InputProps extends InputAndTextarea {
  as?: 'input' | 'textarea';
  append?: ReactNode;
}

export function Input({ as = 'input', append, ...props }: InputProps) {
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={inputWrapperRef} css={inputWrapperCss}>
      {jsx(as, { css: inputElementCss, ...props }, null)}
      {append}
    </div>
  );
}

const inputWrapperCss = css`
  display: flex;
  position: relative;
`;

const inputElementCss = (theme: Theme) => css`
  width: 100%;
  padding: 12px;

  background: ${theme.color.gray01};
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius.default};
  color: ${theme.color.gray05};

  font-weight: 500;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: ${theme.color.gray03};
  }

  &::placeholder {
    color: ${theme.color.gray03};
  }
`;
