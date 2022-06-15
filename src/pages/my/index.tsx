import { useState } from 'react';
import { css } from '@emotion/react';

import { FilledButton } from '~/components/common/Button';
import IllustDialog from '~/components/common/IllustDialog';
import NavigationBar from '~/components/common/NavigationBar';
import Menu from '~/components/my/Menu';
import MyProfile from '~/components/my/Profile';
import { INSPIRATION_MODAL_IMAGE } from '~/constants/assets';
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
      <IllustDialog
        image={INSPIRATION_MODAL_IMAGE[2]}
        isShowing={isInitializeConfirmModalOpen}
        actionButtons={
          <>
            <FilledButton
              colorType="light"
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
              <FilledButton colorType="dark" onClick={() => setIsInitializeConfirmModalOpen(false)}>
                다시 생각해볼게요
              </FilledButton>
            </div>
          </>
        }
      >
        영감이 모두 삭제됩니다.
        <br />
        괜찮으시겠어요?
      </IllustDialog>
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
