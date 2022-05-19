import { useState } from 'react';
import { css } from '@emotion/react';

import { FilledButton } from '~/components/common/Button';
import Dialog from '~/components/common/Dialog';
import NavigationBar from '~/components/common/NavigationBar';
import Menu from '~/components/my/Menu';
import MyProfile from '~/components/my/Profile';

export default function MyPage() {
  const [isInitalizeConfirmModalOpen, setIsInitalizeConfirmModalOpen] = useState(false);

  return (
    <article css={myPageContainerCss}>
      <NavigationBar title="환경설정" />
      <section css={myPageCss}>
        <MyProfile />
        <ul>
          <Menu label="내 계정" href="/my/account" />
          <Menu label="태그관리" href="/my/tag" />
          <Menu label="이용약관" />
          <Menu
            label="개인정보 정책"
            onClick={() => {
              console.log('이용약관');
            }}
          />
          <Menu
            css={initalizeMenuCss}
            label="정보초기화"
            onClick={() => {
              setIsInitalizeConfirmModalOpen(true);
            }}
          />
        </ul>
      </section>
      <Dialog
        isShowing={isInitalizeConfirmModalOpen}
        actionButtons={
          <>
            <FilledButton colorType="dark" onClick={() => setIsInitalizeConfirmModalOpen(false)}>
              네
            </FilledButton>
            <div css={dialogLongButtonCss}>
              <FilledButton colorType="light" onClick={() => setIsInitalizeConfirmModalOpen(false)}>
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

const initalizeMenuCss = css`
  margin-top: 64px;
`;

const dialogLongButtonCss = css`
  width: 163px;
  flex-shrink: 0;
`;
