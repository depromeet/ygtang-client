import { useEffect, useId } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import { labelCss } from '~/components/common/TextField/styles';
import useInput from '~/hooks/common/useInput';

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
   * 글자 수 제한입니다. 지정하지 않을 경우 사용하지 않습니다.
   */
  wordLimit?: number;

  /**
   * onChange 핸들링 함수입니다. 주입해주어야 합니다.
   */
  onChange?: (value: string) => void;

  /**
   * 수정(저장) 아이콘을 누르면 실행되는 함수입니다. 주입해주어야 합니다.
   */
  onSaveClick?: () => void;
}

export function MemoText({
  label,
  placeholder,
  editable,
  wordLimit,
  onChange: onValueChange,
  onSaveClick,
}: MemoTextProps) {
  const id = useId();
  const theme = useTheme();
  const { value, onChange, debouncedValue } = useInput({ useDebounce: true });

  useEffect(() => {
    if (onValueChange) {
      onValueChange(debouncedValue);
    }
  }, [debouncedValue, onValueChange]);

  return (
    <TextField
      as={'textarea'}
      value={value}
      onChange={onChange}
      placeholder={placeholder ?? '어떤 것이 영감을 주었나요?'}
      maxLength={wordLimit}
      fixedHeight={405}
      label={
        <div css={flexBetweenWrapper}>
          <label htmlFor={'input-' + id} css={labelCss}>
            {label ?? '메모'}
          </label>
          {editable && (
            <button css={transparentButtonCss} onClick={onSaveClick}>
              <EditIcon size={21} color={theme.color.gray05} />
            </button>
          )}
        </div>
      }
      feedback={
        <div css={flexBetweenWrapper}>
          <div />
          <span css={textLimitCss}>
            <span css={editable && textLimitCurrentCss}>{debouncedValue.length}</span>
            {wordLimit && `/150`}
          </span>
        </div>
      }
      disabled={!editable}
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
