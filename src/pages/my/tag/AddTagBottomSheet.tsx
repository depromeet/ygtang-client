import { useEffect } from 'react';
import { css } from '@emotion/react';

import BottomSheetModal from '~/components/common/BottomSheetModal';
import { GhostButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import { SearchBar } from '~/components/common/TextField';
import useTagMutation from '~/hooks/api/tag/useTagMutation';
import useInput from '~/hooks/common/useInput';
import { useToast } from '~/store/Toast';
import { recordEvent } from '~/utils/analytics';

export interface AddTagBottomSheetProps {
  isShowing: boolean;
  onClose: VoidFunction;
}
export default function AddTagBottomSheet({ isShowing, onClose }: AddTagBottomSheetProps) {
  const { value, setValue, onChange } = useInput({ useDebounce: false });
  const { createTag } = useTagMutation();
  const { fireToast } = useToast();

  const handelCreateTag = () => {
    if (!value) {
      return;
    }
    createTag(value, {
      onSuccess: () => {
        recordEvent({ action: '태그 생성', value, label: '설정 태그 편집 화면' });
        fireToast({ content: '태그가 저장되었습니다.' });
      },
    });
    setValue('');
  };

  const onFormReturn = (e: React.FormEvent) => {
    e.preventDefault();
    handelCreateTag();
  };

  useEffect(() => {
    setValue('');
  }, [isShowing, setValue]);

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
                  handelCreateTag();
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
