import { ReactNode, useId } from 'react';
import { css, Theme } from '@emotion/react';

import { CheckIcon } from '~/components/common/icons';
import { labelCss } from '~/components/common/styles';

import { Input, InputProps } from './Input';

export interface TextFieldProps extends InputProps {
  /**
   * text field value 입니다.
   */
  value?: string;

  /**
   * label 입니다.
   *
   * `string`을 제공하는 경우 디자인 시스템의 라벨 스타일로 표시됩니다.
   */
  label?: ReactNode;

  /**
   * 성공 상태의 여부입니다.
   *
   * 디자인 시스템에 따라서 성공 상태일 경우에는 Input 우측에 체크 아이콘을 표시합니다.
   */
  isSuccess?: boolean;

  /**
   * 입력 필드 하단에 표시되는 요소입니다.
   *
   * `string`을 제공하는 경우 디자인 시스템의 "에러 메세지"의 스타일로 표시됩니다.
   */
  feedback?: ReactNode;

  /**
   * id 입니다. 입력하지 않을 경우 임의의 값이 제공됩니다.
   *
   * 의존 컴포넌트를 위한 옵션입니다.
   */
  customId?: string;

  /**
   * input 자동 포커스 boolean 값을 넣어 사용합니다.
   */
  autoFocus?: boolean;
}

export function TextField({
  value,
  label,
  isSuccess,
  feedback,
  customId,
  autoFocus,
  ...props
}: TextFieldProps) {
  const id = useId();
  return (
    <div css={wrapperCss}>
      {label &&
        (typeof label === 'string' ? (
          <label htmlFor={customId ?? 'input-' + id} css={labelCss}>
            {label}
          </label>
        ) : (
          label
        ))}
      <Input
        value={value}
        autoFocus={autoFocus}
        id={customId ?? 'input-' + id}
        {...props}
        append={
          isSuccess && (
            <div css={successIconWrapperCss}>
              <CheckIcon size={24} />
            </div>
          )
        }
      />
      {feedback &&
        (typeof feedback === 'string' ? <p css={feedbackMessageCss}>{feedback}</p> : feedback)}
    </div>
  );
}

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const feedbackMessageCss = (theme: Theme) => css`
  color: ${theme.color.gray03};
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
`;

const successIconWrapperCss = (theme: Theme) => css`
  color: ${theme.color.primary};
`;
