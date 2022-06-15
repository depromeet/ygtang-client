import { useState } from 'react';
import { css } from '@emotion/react';

import { FilledButton, IconButton } from '~/components/common/Button';
import IllustDialog from '~/components/common/IllustDialog';
import InternalLink from '~/components/common/InternalLink';
import NavigationBar from '~/components/common/NavigationBar';
import MyInformationMenu from '~/components/my/InformationMenu';
import Menu from '~/components/my/Menu';
import { INSPIRATION_MODAL_IMAGE } from '~/constants/assets';
import useMemberSiginOutMutation from '~/hooks/api/member/useMemberSignOutMutaion';
import { useUserInformation } from '~/store/UserInformation';
import { fullViewHeight } from '~/styles/utils';

export default function MyAccountPage() {
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const { userInformation } = useUserInformation();
  const { mutate: siginOutMutate } = useMemberSiginOutMutation();

  return (
    <article css={myAccountPageContainerCss}>
      <NavigationBar title="내 계정" backLink="/my" />
      <section css={myAccountPageCss}>
        <ul>
          <MyInformationMenu
            label="이름"
            description={userInformation.nickName}
            rightElement={
              <InternalLink href="/my/account/change-nickname">
                <a>
                  <IconButton iconName="EditIcon" light />
                </a>
              </InternalLink>
            }
          />
          <MyInformationMenu label="이메일" description={userInformation.email} />
          <Menu label="비밀번호 재설정" internalHref="/my/account/change-password" />
        </ul>
        <Menu
          label=""
          onClick={() => {
            setIsDeleteAccountModalOpen(true);
          }}
          rightElement={<span css={menuTitleCss}>계정 삭제하기</span>}
        />
      </section>
      <IllustDialog
        image={INSPIRATION_MODAL_IMAGE[1]}
        isShowing={isDeleteAccountModalOpen}
        actionButtons={
          <>
            <FilledButton
              colorType="light"
              onClick={() => {
                siginOutMutate(undefined, {
                  onSettled: () => {
                    setIsDeleteAccountModalOpen(false);
                  },
                });
              }}
            >
              계정 삭제
            </FilledButton>
            <div css={dialogLongButtonCss}>
              <FilledButton colorType="dark" onClick={() => setIsDeleteAccountModalOpen(false)}>
                다시 생각해볼게요
              </FilledButton>
            </div>
          </>
        }
      >
        계정이 완전히 사라집니다.
        <br />
        다시 복구할 수 없습니다.
      </IllustDialog>
    </article>
  );
}

const myAccountPageContainerCss = css`
  height: ${fullViewHeight()};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const myAccountPageCss = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 30px;
  overflow-y: auto;
`;

const menuTitleCss = css`
  font-size: 12px;
`;

const dialogLongButtonCss = css`
  width: 163px;
  flex-shrink: 0;
`;
