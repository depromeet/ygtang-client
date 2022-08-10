import { ComponentProps } from 'react';

import usePreventScroll from '~/hooks/common/usePreventScroll';

import BottomSheetModal from '../common/BottomSheetModal';

interface BottomSheetModalProps extends ComponentProps<typeof BottomSheetModal> {}

interface BottomSheetModalPropsWithoutChildren extends Omit<BottomSheetModalProps, 'children'> {}

export default function FilterBottomSheetModal({
  isShowing,
  onClose,
}: BottomSheetModalPropsWithoutChildren) {
  usePreventScroll(isShowing);

  return (
    <BottomSheetModal isShowing={isShowing} onClose={onClose}>
      <div></div>
    </BottomSheetModal>
  );
}
