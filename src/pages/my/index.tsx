import { css } from '@emotion/react';

import NavigationBar from '~/components/common/NavigationBar';
import Menu from '~/components/my/Menu';
import MyProfile from '~/components/my/Profile';

export default function MyPage() {
  return (
    <article css={myPageContainerCss}>
      <NavigationBar title="환경설정" />
      <section css={myPageCss}>
        <MyProfile />
        <ul>
          <Menu
            label="내계정"
            onClick={() => {
              console.log('내계정');
            }}
          />
          <Menu
            label="태그관리"
            href="/my/tag"
            onClick={() => {
              console.log('태그관리');
            }}
          />
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
              console.log('정보초기화');
            }}
          />
        </ul>
      </section>
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
