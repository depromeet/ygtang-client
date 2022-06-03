import { useState } from 'react';
import { css } from '@emotion/react';

import { FilledButton } from '~/components/common/Button';
import Dialog from '~/components/common/Dialog';
import NavigationBar from '~/components/common/NavigationBar';
import Menu from '~/components/my/Menu';
import MyProfile from '~/components/my/Profile';
import { POLICY_URL } from '~/constants/common';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';

export default function MyPage() {
  const [isInitializeConfirmModalOpen, setIsInitializeConfirmModalOpen] = useState(false);
  const { deleteAllInspiration } = useInspirationMutation();

  return (
    <article css={myPageContainerCss}>
      <NavigationBar title="환경설정" backLink="/" />
      <section css={myPageCss}>
        <MyProfile />
        <ul css={menuListCss}>
          <Menu label="내 계정" internalHref="/my/account" />
          <Menu label="태그관리" internalHref="/my/tag" />
          <Menu label="이용약관" externalHref={POLICY_URL.TOS} />
          <Menu label="개인정보 정책" externalHref={POLICY_URL.PRIVACY} />
          <Menu
            css={initializeMenuCss}
            label="정보초기화"
            onClick={() => {
              setIsInitializeConfirmModalOpen(true);
            }}
          />
        </ul>
      </section>
      <Dialog
        isShowing={isInitializeConfirmModalOpen}
        actionButtons={
          <>
            <FilledButton
              colorType="dark"
              onClick={() => {
                deleteAllInspiration(undefined, {
                  onSettled: () => {
                    setIsInitializeConfirmModalOpen(false);
                  },
                });
              }}
            >
              네
            </FilledButton>
            <div css={dialogLongButtonCss}>
              <FilledButton
                colorType="light"
                onClick={() => setIsInitializeConfirmModalOpen(false)}
              >
                아니요
              </FilledButton>
            </div>
          </>
        }
      >
        모든 영감이 초기화됩니다.
        <br />
        괜찮으신가요?
      </Dialog>
    </article>
  );
}

const myPageContainerCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const myPageCss = css`
  flex: 1;
  overflow-y: auto;
`;

const initializeMenuCss = css`
  margin-top: 64px;
`;

const dialogLongButtonCss = css`
  width: 163px;
  flex-shrink: 0;
`;

const menuListCss = css`
  margin-top: 16px;
`;
