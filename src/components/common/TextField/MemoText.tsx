import { useEffect, useId } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import { labelCss } from '~/components/common/TextField/styles';
import useInput from '~/hooks/common/useInput';

import { EditIcon } from '../icons';
import { TextField } from './TextField';

export interface MemoTextProps {
  label?: string;
  placeholder?: string;
  editable?: boolean;
  wordLimit?: number;
  onChange?: (value: string) => void;
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
