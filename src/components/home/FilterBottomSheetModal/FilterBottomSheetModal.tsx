import { ComponentProps } from 'react';
import dynamic from 'next/dynamic';
import { css, Theme } from '@emotion/react';

import usePreventScroll from '~/hooks/common/usePreventScroll';

import BottomSheetModal from '../../common/BottomSheetModal';
import NavigationBar from '../../common/NavigationBar';
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

  return (
    <>
      <BottomSheetModal isShowing={isShowing} onClose={onClose}>
        <div css={contentWrapperCss}>
          <NavigationBar title="필터" onClickBackButton={onClose} />

          <TagFilterSection />
          <InspirationKindSection />

          {/* TODO: 캘린더 */}
        </div>
      </BottomSheetModal>
      <TagFormRouteAsModal />
    </>
  );
}

const contentWrapperCss = (theme: Theme) => css`
  width: 100%;
  padding: ${theme.size.layoutPadding};
`;
