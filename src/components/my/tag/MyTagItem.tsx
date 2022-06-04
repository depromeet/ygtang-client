import { useState } from 'react';
import { css } from '@emotion/react';

import { FilledButton, IconButton } from '~/components/common/Button';
import Dialog from '~/components/common/Dialog';
import Menu from '~/components/my/Menu';
import useTagMutation from '~/hooks/api/tag/useTagMutation';
import { useToast } from '~/store/Toast';

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
      <Dialog
        isShowing={isTagDeleteConfirmModalOpen}
        actionButtons={
          <>
            <FilledButton
              colorType="dark"
              onClick={() => {
                deleteTag(tag.id, {
                  onSuccess: () => {
                    fireToast({ content: '태그 삭제했습니다.' });
                    setisTagDeleteConfirmModalOpen(false);
                  },
                });
              }}
            >
              네
            </FilledButton>
            <div css={dialogLongButtonCss}>
              <FilledButton colorType="light" onClick={() => setisTagDeleteConfirmModalOpen(false)}>
                아니요
              </FilledButton>
            </div>
          </>
        }
      >
        선택한 태그가 모든 영감에서
        <br />
        사라집니다! 괜찮으신가요?
      </Dialog>
    </>
  );
}

const dialogLongButtonCss = css`
  width: 163px;
  flex-shrink: 0;
`;
