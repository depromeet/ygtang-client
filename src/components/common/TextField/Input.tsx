import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, useEffect, useRef } from 'react';
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
   * input value 입니다.
   */
  value?: string;

  /**
   * input 앞에 붙을 요소입니다. 보통 아이콘 삽입을 위해 사용합니다.
   *
   * preAppend가 존재하면 input에 `padding-left: 40px` 이 주어집니다.
   */
  preAppend?: ReactNode;

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

  /**
   * padding 요소가 변경되어야 할 때 사용합니다. (단위: px)
   *
   * @default 12
   */
  padding?: number;

  /**
   * input 자동 포커스 boolean 값을 넣어 사용합니다.
   */
  autoFocus?: boolean;

  /**
   * input이 blur가 될 때 실행할 액션입니다.
   */
  onBlur?: VoidFunction;

  /**
   * Focus시 alert 색상을 사용합니다.
   */
  alertWhenFocused?: boolean;

  /**
   * background 색상을 설정할 수 있습니다.
   */
  background?: string;
}

export function Input({
  as = 'input',
  value,
  preAppend,
  append,
  fixedHeight,
  padding,
  autoFocus = false,
  onBlur,
  alertWhenFocused = false,
  background,
  ...props
}: InputProps) {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // input auto focus하면서 커서 맨 뒤로 보내기
  useEffect(() => {
    if (!autoFocus) return;
    const valueLength = inputRef.current?.value.length ?? 0;
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(valueLength, valueLength);
  }, [autoFocus]);

  return (
    <div css={inputWrapperCss}>
      {preAppend && <div css={appendWrapperCss('left')}>{preAppend}</div>}
      {jsx(
        as,
        {
          // textarea 일 경우에 330 설정, fixedHeight 가 정해져 있다면 우선
          css: inputElementCss(theme, {
            fixedHeight: fixedHeight ?? (as === 'textarea' ? 330 : undefined),
            isPreAppend: typeof preAppend !== 'undefined',
            isAppend: typeof append !== 'undefined',
            padding,
            inputValue: value,
            alertWhenFocused,
            background,
          }),
          ref: inputRef,
          onBlur,
          value,
          ...props,
        },
        null
      )}
      {append && <div css={appendWrapperCss('right')}>{append}</div>}
    </div>
  );
}

const inputWrapperCss = css`
  position: relative;
`;

export const inputElementCss = (
  theme: Theme,
  {
    fixedHeight,
    isPreAppend,
    isAppend,
    padding = 12,
    inputValue,
    alertWhenFocused,
    background = theme.color.gray01,
  }: {
    fixedHeight?: number;
    isPreAppend?: boolean;
    isAppend?: boolean;
    padding?: number;
    inputValue?: string;
    alertWhenFocused?: boolean;
    background?: string;
  }
) => css`
  width: 100%;
  ${fixedHeight && `height: ${fixedHeight}px;`}
  padding: ${padding}px;
  ${isPreAppend && `padding-left: 40px;`}
  ${isAppend && `padding-right: 40px;`}

  background: ${background};
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius.default};
  color: ${theme.color.gray05};
  opacity: 1;
  -webkit-opacity: 1;
  -webkit-appearance: none;

  font-weight: 500;
  font-size: 14px;
  outline: none;
  line-height: 2;

  resize: none;

  &:focus {
    ${background !== 'transparent' &&
    `border-color: ${alertWhenFocused ? theme.color.alert : theme.color.gray03};`}
  }

  &::placeholder {
    color: ${theme.color.gray03};
  }

  &:disabled {
    /* iOS에서 disabled input 텍스트 색상 자동 흐려짐 방지 */
    /* https://stackoverflow.com/questions/262158/disabled-input-text-color-on-ios */
    -webkit-text-fill-color: ${inputValue ? theme.color.gray05 : theme.color.gray03};
  }
`;

const appendWrapperCss = (dim = 'right') => css`
  position: absolute;
  top: 14px;
  ${dim}: 10px;
`;
