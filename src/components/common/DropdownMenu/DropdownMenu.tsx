/** @jsxImportSource @emotion/react */

import { forwardRef, Ref, useState } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import Menu from '~/components/my/Menu';
import useToggle from '~/hooks/common/useToggle';

import BottomSheetModal from '../BottomSheetModal';
import { CheckIcon, ChevronIcon } from '../icons';

interface DropdownMenuProps<T extends string[]> {
  label?: string;
  values: [...T];
  defaultValue?: T[number];
}

const DropdownMenu = forwardRef(function DropdownMenu<T extends string[]>(
  { label, values, defaultValue }: DropdownMenuProps<T>,
  ref: Ref<HTMLSelectElement>
) {
  const theme = useTheme();
  const [value, setValue] = useState<string | null>(defaultValue ?? null);
  const [isOpen, toggleIsOpen] = useToggle(false);

  const onClickOption = (eachValue: string) => {
    toggleIsOpen();
    setValue(eachValue);
  };

  return (
    <div css={wrapperCss}>
      {label && (
        <label role="label" css={labelCss}>
          {label}
        </label>
      )}

      <select
        data-testid="select"
        value={value ? value : undefined}
        disabled
        css={selectCss}
        ref={ref}
      >
        <option />
        {values.map(eachValue => (
          <option key={eachValue} value={eachValue} />
        ))}
      </select>

      <button onClick={toggleIsOpen} css={buttonCss}>
        {value ?? '선택하기'}

        <ChevronIcon direction="down" />
      </button>

      <BottomSheetModal isShowing={isOpen} onClose={toggleIsOpen}>
        <ul css={dropdownUlCss}>
          {values.map(eachValue => (
            <Menu
              key={eachValue}
              onClick={() => onClickOption(eachValue)}
              label={eachValue}
              rightElement={
                eachValue === value ? <CheckIcon color={theme.color.primary} /> : undefined
              }
            />
          ))}
        </ul>
      </BottomSheetModal>
    </div>
  );
});

export default DropdownMenu;

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const labelCss = (theme: Theme) => css`
  color: ${theme.color.gray05};
  margin-bottom: 6px;
  font-size: 14px;
`;

const selectCss = css`
  display: none;
`;

const buttonCss = (theme: Theme) => css`
  width: 100%;
  height: 52px;
  color: ${theme.color.gray05};
  background-color: ${theme.color.gray01};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13px;
  border-radius: ${theme.borderRadius.default};
`;

const dropdownUlCss = css`
  padding: 20px 16px 40px 16px;
`;
