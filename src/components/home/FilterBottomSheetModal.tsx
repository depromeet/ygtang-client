import { ComponentProps } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { css, Theme } from '@emotion/react';

import usePreventScroll from '~/hooks/common/usePreventScroll';
import { useFilteredTags } from '~/store/FilteredTags';

import BottomSheetModal from '../common/BottomSheetModal';
import { Checkbox } from '../common/CheckList';
import NavigationBar from '../common/NavigationBar';
import AppliedTags from '../common/TagForm/AppliedTags';

const TagFormRouteAsModal = dynamic(() => import('~/components/home/TagFormRouteAsModal'));

interface BottomSheetModalProps extends ComponentProps<typeof BottomSheetModal> {}

interface BottomSheetModalPropsWithoutChildren extends Omit<BottomSheetModalProps, 'children'> {}

export default function FilterBottomSheetModal({
  isShowing,
  onClose,
}: BottomSheetModalPropsWithoutChildren) {
  usePreventScroll(isShowing);

  const { filteredTags, removeTag } = useFilteredTags({});

  return (
    <>
      <BottomSheetModal isShowing={isShowing} onClose={onClose}>
        <div css={contentWrapperCss}>
          <NavigationBar title="필터" onClickBackButton={onClose} />

          <Link href="/?modal=tag" as="/tag" scroll={false}>
            <a>태그</a>
          </Link>
          <AppliedTags applyedTags={filteredTags} onRemove={removeTag} />

          {/* TODO: 영감 종류 */}
          <Checkbox isChecked={false} onToggle={() => {}} />
          {/* TODO: 캘린더 */}
        </div>
      </BottomSheetModal>
      <TagFormRouteAsModal />
    </>
  );
}

const contentWrapperCss = (theme: Theme) => css`
  padding: ${theme.size.layoutPadding};
`;
