import { ComponentProps } from 'react';
import dynamic from 'next/dynamic';
import { css, Theme } from '@emotion/react';
import { useResetRecoilState } from 'recoil';

import { CTABottomButton, GhostButton } from '~/components/common/Button';
import useGetAllInspirations from '~/hooks/api/inspiration/useGetAllInspirations';
import usePreventScroll from '~/hooks/common/usePreventScroll';
import { calendarFilterState } from '~/store/CalendarFilter';
import { filteredTagsState } from '~/store/FilteredTags';
import { inspirationKindFilterState } from '~/store/InspirationKindFilter';
import { viewHeight } from '~/styles/utils';
import { recordEvent } from '~/utils/analytics';

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
    recordEvent({ action: '필터링 초기화' });
  };

  const onCloseWithEvent = () => {
    onClose();
    recordEvent({ action: '필터링 dim으로 닫기' });
  };

  const { inspirations: filteredInspirations, isLoading } = useGetAllInspirations({
    enabled: isShowing,
  });

  const isCTADisabled = isLoading || filteredInspirations.length === 0;

  const onClickCTA = () => {
    recordEvent({
      action: '필터링 바텀시트 CTA 클릭',
      value: `${filteredInspirations.length}개의 영감 보기`,
    });
    onClose();
  };

  return (
    <>
      <BottomSheetModal isShowing={isShowing} onClose={onCloseWithEvent}>
        <div css={contentWrapperCss}>
          <NavigationBar
            title="필터"
            onClickBackButton={onClickReset}
            rightElement={<GhostButton onClick={onClickReset}>초기화</GhostButton>}
          />

          <div css={flexGrowWrapperCss}>
            <TagFilterSection />
            <InspirationKindSection />
            <CalendarFilterSection filteredInspirations={filteredInspirations} />
          </div>

          <CTABottomButton onClick={onClickCTA} disabled={isCTADisabled}>
            {filteredInspirations.length}개의 영감 보기
          </CTABottomButton>
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
  padding-bottom: 46px;

  display: flex;
  flex-direction: column;
`;

const flexGrowWrapperCss = css`
  flex-grow: 1;
`;
