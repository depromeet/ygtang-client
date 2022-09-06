import { css, Theme } from '@emotion/react';

import BottomSheetModal from '~/components/common/BottomSheetModal';
import { ChevronIcon } from '~/components/common/icons';
import useToggle from '~/hooks/common/useToggle';

export default function CalendarFilterSection() {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <section css={sectionCss}>
      <button onClick={toggleIsOpen} css={filterButtonCss}>
        기간
        <ChevronIcon direction="right" />
      </button>

      <BottomSheetModal isShowing={isOpen} onClose={toggleIsOpen}>
        <div>section</div>
      </BottomSheetModal>
    </section>
  );
}

const sectionCss = css`
  margin-top: 24px;
`;

const filterButtonCss = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 24px;
  color: ${theme.color.gray05};
  font-size: 16px;
  padding: 0;
`;
