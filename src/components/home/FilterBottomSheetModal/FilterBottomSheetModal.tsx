import { ComponentProps } from 'react';
import dynamic from 'next/dynamic';
import { css, Theme } from '@emotion/react';
import { useResetRecoilState } from 'recoil';

import { GhostButton } from '~/components/common/Button';
import usePreventScroll from '~/hooks/common/usePreventScroll';
import { calendarFilterState } from '~/store/CalendarFilter';
import { filteredTagsState } from '~/store/FilteredTags';
import { inspirationKindFilterState } from '~/store/InspirationKindFilter';
import { viewHeight } from '~/styles/utils';

import BottomSheetModal from '../../common/BottomSheetModal';
import NavigationBar from '../../common/NavigationBar';
import CalendarFilterSection from './CalendarFilterSection';
import InspirationKindSection from './InspirationKindSection';
import TagFilterSection from './TagFilterSection';

const TagFormRouteAsModal = dynamic(() => import('~/components/home/TagFormRouteAsModal'));

interface BottomSheetModalProps extends ComponentProps<typeof BottomSheetModal> {}

interface BottomSheetModalPropsWithoutChildren extends Omit<BottomSheetModalProps, 'children'> {}

export default function FilterBottomSheetModal({
  isShowing,
  onClose,
}: BottomSheetModalPropsWithoutChildren) {
  usePreventScroll(isShowing);

  const resetInspirationKindFilter = useResetRecoilState(inspirationKindFilterState);
  const resetFilteredTags = useResetRecoilState(filteredTagsState);
  const resetCalendarFilter = useResetRecoilState(calendarFilterState);

  const onClickReset = () => {
    resetInspirationKindFilter();
    resetFilteredTags();
    resetCalendarFilter();
  };

  return (
    <>
      <BottomSheetModal isShowing={isShowing} onClose={onClose}>
        <div css={contentWrapperCss}>
          <NavigationBar
            title="필터"
            onClickBackButton={onClose}
            rightElement={<GhostButton onClick={onClickReset}>초기화</GhostButton>}
          />

          <TagFilterSection />
          <InspirationKindSection />
          <CalendarFilterSection />
        </div>
      </BottomSheetModal>
      <TagFormRouteAsModal />
    </>
  );
}

const contentWrapperCss = (theme: Theme) => css`
  width: 100%;
  height: ${viewHeight(78)};
  padding: ${theme.size.layoutPadding};
`;
