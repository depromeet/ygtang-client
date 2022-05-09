import { css } from '@emotion/react';

import BottomSheetModal from '~/components/common/BottomSheetModal';
import { GhostButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import { SearchBar } from '~/components/common/TextField';
import useInput from '~/hooks/common/useInput';

export interface AddTagBottomSheetProps {
  isShowing: boolean;
  onClose: VoidFunction;
}
export default function AddTagBottomSheet({ isShowing, onClose }: AddTagBottomSheetProps) {
  const { value, setValue, onChange } = useInput({ useDebounce: false });

  const onFormReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    setValue('');
  };

  return (
    <BottomSheetModal
      isShowing={isShowing}
      onClose={() => {
        onClose();
      }}
    >
      <div css={contentWrapperCss}>
        <div css={navigationBarWrapperCss}>
          <NavigationBar
            title="태그 등록"
            rightElement={
              <GhostButton
                size="large"
                onClick={() => {
                  onClose();
                }}
              >
                완료
              </GhostButton>
            }
          />
        </div>
        <div css={contentCss}>
          <form onSubmit={onFormReturn}>
            <SearchBar value={value} onChange={onChange} />
          </form>
        </div>
      </div>
    </BottomSheetModal>
  );
}

const contentWrapperCss = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
`;
const contentCss = css`
  width: 100%;
`;
const navigationBarWrapperCss = css`
  height: 200px;
  flex: 1;
`;
