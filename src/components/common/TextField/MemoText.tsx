import { useId } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import { labelCss } from '~/components/common/styles';

import { EditIcon } from '../icons';
import { TextField } from './TextField';

export interface MemoTextProps {
  /**
   * 라벨에 들어갈 내용입니다.
   *
   * @default '메모'
   */
  label?: string;

  /**
   * placeholder에 들어갈 내용입니다.
   *
   * @default '어떤 것이 영감을 주었나요?'
   */
  placeholder?: string;

  /**
   * 수정 가능 여부입니다.
   */
  editable?: boolean;

  /**
   * 작성 가능 여부입니다. (영감 추가)
   */
  writable?: boolean;

  /**
   * 글자 수 제한입니다. 지정하지 않을 경우 사용하지 않습니다.
   */
  wordLimit?: number;

  /**
   * onChange 핸들링 함수입니다. 주입해주어야 합니다.
   */
  onChange: (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;

  /**
   * 수정(저장) 아이콘을 누르면 실행되는 함수입니다. 주입해주어야 합니다.
   */
  onSaveClick?: () => void;

  /**
   * 메모 value 입니다.
   */
  value: string;

  /**
   * 메모 debouncedValue 입니다.
   */
  debouncedValue: string;
}

export function MemoText({
  label,
  placeholder,
  editable,
  writable,
  wordLimit,
  onChange: onValueChange,
  onSaveClick,
  value,
  debouncedValue,
}: MemoTextProps) {
  const id = useId();
  const theme = useTheme();

  const onClick = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    onSaveClick && onSaveClick();
  };

  return (
    <TextField
      as={'textarea'}
      value={value}
      onChange={onValueChange}
      placeholder={placeholder ?? '어떤 것이 영감을 주었나요?'}
      maxLength={wordLimit}
      fixedHeight={100}
      label={
        <div css={flexBetweenWrapper}>
          <label htmlFor={'input-' + id} css={labelCss}>
            {label ?? '메모'}
          </label>
          {editable && (
            <button css={transparentButtonCss} onClick={onClick}>
              <EditIcon size={21} color={theme.color.gray05} />
            </button>
          )}
        </div>
      }
      feedback={
        <div css={flexBetweenWrapper}>
          <div />
          <span css={textLimitCss}>
            <span css={(editable || writable) && textLimitCurrentCss}>{debouncedValue.length}</span>
            {`/${wordLimit ?? 150}`}
          </span>
        </div>
      }
      disabled={!editable && !writable}
    />
  );
}

const flexBetweenWrapper = css`
  display: flex;
  justify-content: space-between;
`;

const transparentButtonCss = css`
  display: flex;
  padding: 0;
  margin: 0;
`;

const textLimitCss = (theme: Theme) => css`
  color: ${theme.color.gray03};
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
`;
const textLimitCurrentCss = (theme: Theme) => css`
  color: ${theme.color.gray04};
`;
