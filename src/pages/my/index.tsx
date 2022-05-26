import { useState } from 'react';
import { css } from '@emotion/react';

import { FilledButton } from '~/components/common/Button';
import Dialog from '~/components/common/Dialog';
import NavigationBar from '~/components/common/NavigationBar';
import Menu from '~/components/my/Menu';
import MyProfile from '~/components/my/Profile';

export default function MyPage() {
  const [isInitializeConfirmModalOpen, setIsInitializeConfirmModalOpen] = useState(false);

  return (
    <article css={myPageContainerCss}>
      <NavigationBar title="환경설정" />
      <section css={myPageCss}>
        <MyProfile />
        <ul css={menuListCss}>
          <Menu label="내 계정" href="/my/account" />
          <Menu label="태그관리" href="/my/tag" />
          <Menu
            label="이용약관"
            url="https://gifted-puffin-352.notion.site/e75b7f51da7944508f37071f5345cc46"
          />
          <Menu
            label="개인정보 정책"
            url="https://gifted-puffin-352.notion.site/94ac34de4c97467fb1f21a8bbed26eab"
          />
          {/* <Menu
            css={initializeMenuCss}
            label="정보초기화"
            onClick={() => {
              setIsInitializeConfirmModalOpen(true);
            }}
          /> */}
        </ul>
      </section>
      <Dialog
        isShowing={isInitializeConfirmModalOpen}
        actionButtons={
          <>
            <FilledButton colorType="dark" onClick={() => setIsInitializeConfirmModalOpen(false)}>
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

// const initializeMenuCss = css`
//   margin-top: 64px;
// `;

const dialogLongButtonCss = css`
  width: 163px;
  flex-shrink: 0;
`;

const menuListCss = css`
  margin-top: 16px;
`;
