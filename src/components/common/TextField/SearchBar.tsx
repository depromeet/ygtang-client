import { css, useTheme } from '@emotion/react';

import { CloseIcon, SearchIcon } from '../icons';
import { Input, InputProps } from './Input';

export interface SearchBarProps extends InputProps {
  value: string;
  onRemoveClick?: () => void;
}

export function SearchBar({ value, placeholder, onRemoveClick, ...props }: SearchBarProps) {
  const theme = useTheme();

  return (
    <Input
      {...props}
      value={value}
      preAppend={
        <div css={IconWrapper}>
          <SearchIcon size={24} color={theme.color.gray04} />
        </div>
      }
      append={
        value.length !== 0 && (
          <button css={IconWrapper} onClick={onRemoveClick}>
            <CloseIcon size={20} color={theme.color.gray04} />
          </button>
        )
      }
      placeholder={placeholder ?? '태그를 등록 혹은 검색해보세요'}
      padding={8}
    />
  );
}

const IconWrapper = css`
  display: flex;
  background: transparent;
  padding: 0;
  margin: 0;
`;
