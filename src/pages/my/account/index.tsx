import { useState } from 'react';
import { css } from '@emotion/react';

import { FilledButton, IconButton } from '~/components/common/Button';
import Dialog from '~/components/common/Dialog';
import NavigationBar from '~/components/common/NavigationBar';
import MyInformationMenu from '~/components/my/InformationMenu';
import Menu from '~/components/my/Menu';
import { fullViewHeight } from '~/styles/utils';

export default function MyAccountPage() {
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

  return (
    <article css={myAccountPageContainerCss}>
      <NavigationBar title="내 계정" />
      <section css={myAccountPageCss}>
        <ul>
          <MyInformationMenu
            label="이름"
            description="한영감"
            rightElement={
              <IconButton
                onClick={() => {
                  console.log('edit');
                }}
                iconName="EditIcon"
                light
              />
            }
          />
          <MyInformationMenu label="이메일" description="gggg@gmail.com" />
          <Menu label="비밀번호 재설정" href="/my/account/change-password" />
        </ul>
        <Menu
          label=""
          rightElement={
            <span
              css={menuTitleCss}
              onClick={() => {
                setIsDeleteAccountModalOpen(true);
              }}
            >
              계정 삭제하기
            </span>
          }
        />
      </section>
      <Dialog
        isShowing={isDeleteAccountModalOpen}
        actionButtons={
          <>
            <FilledButton colorType="dark" onClick={() => setIsDeleteAccountModalOpen(false)}>
              네
            </FilledButton>
            <div css={dialogLongButtonCss}>
              <FilledButton colorType="light" onClick={() => setIsDeleteAccountModalOpen(false)}>
                아니요
              </FilledButton>
            </div>
          </>
        }
      >
        계정이 완전히 사라집니다.
        <br />
        다시 복구할 수 없습니다.
      </Dialog>
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
