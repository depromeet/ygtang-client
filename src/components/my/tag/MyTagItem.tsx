import { useState } from 'react';
import { css } from '@emotion/react';

import { FilledButton, IconButton } from '~/components/common/Button';
import IllustDialog from '~/components/common/IllustDialog';
import Menu from '~/components/my/Menu';
import { INSPIRATION_MODAL_IMAGE } from '~/constants/assets';
import useTagMutation from '~/hooks/api/tag/useTagMutation';
import { useToast } from '~/store/Toast';
import { recordEvent } from '~/utils/analytics';

export default function MyTagItem({ tag }: { tag: TagType }) {
  const { deleteTag } = useTagMutation();
  const { fireToast } = useToast();

  const [isTagDeleteConfirmModalOpen, setisTagDeleteConfirmModalOpen] = useState(false);

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setisTagDeleteConfirmModalOpen(true);
  };

  return (
    <>
      <Menu
        label={tag.content}
        rightElement={<IconButton onClick={onDelete} iconName="RemoveCircleIcon" light />}
      />
      <IllustDialog
        image={INSPIRATION_MODAL_IMAGE[2]}
        isShowing={isTagDeleteConfirmModalOpen}
        actionButtons={
          <>
            <FilledButton
              colorType="light"
              onClick={() => {
                deleteTag(tag.id, {
                  onSuccess: () => {
                    fireToast({ content: '태그를 삭제했습니다.' });
                    recordEvent({ action: '태그 삭제', label: '설정 태그 편집 화면' });
                    setisTagDeleteConfirmModalOpen(false);
                  },
                });
              }}
            >
              네
            </FilledButton>
            <div css={dialogLongButtonCss}>
              <FilledButton colorType="dark" onClick={() => setisTagDeleteConfirmModalOpen(false)}>
                다시 생각해볼게요
              </FilledButton>
            </div>
          </>
        }
      >
        선택한 태그가 모든 영감에서
        <br />
        사라집니다. 괜찮으신가요?
      </IllustDialog>
    </>
  );
}

const dialogLongButtonCss = css`
  width: 163px;
  flex-shrink: 0;
`;
