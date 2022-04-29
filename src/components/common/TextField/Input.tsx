import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, useRef } from 'react';
import { css, jsx, Theme, useTheme } from '@emotion/react';

type InputAndTextarea = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface InputProps extends InputAndTextarea {
  /**
   * 사용 할 HTML 요소입니다.
   *
   * @default 'input'
   */
  as?: 'input' | 'textarea';

  /**
   * input 뒤에 붙을 요소입니다. 보통 아이콘 삽입을 위해 사용합니다.
   *
   * append가 존재하면 input에 `padding-right: 40px` 이 주어집니다.
   */
  append?: ReactNode;

  /**
   * input 요소가 고정적인 높이를 가지고 있어야 할 때 사용합니다. (단위: px)
   */
  fixedHeight?: number;
}

export function Input({ as = 'input', append, fixedHeight, ...props }: InputProps) {
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  return (
    <div ref={inputWrapperRef} css={inputWrapperCss}>
      {jsx(
        as,
        {
          // textarea 일 경우에 330 설정, fixedHeight 가 정해져 있다면 우선
          css: inputElementCss(
            theme,
            fixedHeight ?? (as === 'textarea' ? 330 : undefined),
            typeof append !== 'undefined'
          ),
          ...props,
        },
        null
      )}
      {append && <div css={appendWrapperCss}>{append}</div>}
    </div>
  );
}

const inputWrapperCss = css`
  position: relative;
`;

const inputElementCss = (theme: Theme, fixedHeight?: number, isAppend?: boolean) => css`
  width: 100%;
  ${fixedHeight && `height: ${fixedHeight}px;`}
  padding: 12px;
  ${isAppend && `padding-right: 40px;`}

  background: ${theme.color.gray01};
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius.default};
  color: ${theme.color.gray05};

  font-weight: 500;
  font-size: 14px;
  outline: none;
  line-height: 150%;

  &:focus {
    border-color: ${theme.color.gray03};
  }

  &::placeholder {
    color: ${theme.color.gray03};
  }
`;

const appendWrapperCss = css`
  position: absolute;
  top: 10px;
  right: 10px;
`;
