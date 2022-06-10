import { useState } from 'react';
import { css, Theme } from '@emotion/react';

import IllustDialog from '~/components/common/IllustDialog';
import { INSPIRATION_MODAL_IMAGE, USER_PROFILE_IMAGE_SRC } from '~/constants/assets';
import { useUser } from '~/hooks/common/useUser';
import { useUserInformation } from '~/store/UserInformation';

import { FilledButton } from '../common/Button';
import MyInformationMenu from './InformationMenu';

export default function MyProfile() {
  const { userLogout } = useUser();
  const { userInformation } = useUserInformation();
  const [isLogoutConfirmModalOpen, setIsLogoutConfirmModalOpen] = useState(false);

  return (
    <>
      <section css={MyProfileContainerCss}>
        <MyInformationMenu
          label={userInformation.nickName}
          description={userInformation.email}
          align="bottom"
          rightElement={
            <FilledButton css={LogOutButtonCss} onClick={() => setIsLogoutConfirmModalOpen(true)}>
              로그아웃
            </FilledButton>
          }
        />
        <img css={ImageCss} src={USER_PROFILE_IMAGE_SRC} alt="user-profle" />
      </section>
      <IllustDialog
        isShowing={isLogoutConfirmModalOpen}
        image={INSPIRATION_MODAL_IMAGE[3]}
        actionButtons={
          <>
            <FilledButton
              colorType="light"
              onClick={() => {
                userLogout();
                setIsLogoutConfirmModalOpen(false);
              }}
            >
              네
            </FilledButton>
            <FilledButton colorType="dark" onClick={() => setIsLogoutConfirmModalOpen(false)}>
              아니오
            </FilledButton>
          </>
        }
      >
        로그아웃 하시겠어요?
      </IllustDialog>
    </>
  );
}

const MyProfileContainerCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.gray01};
  border-radius: 4px;
  padding: 0 16px 16px;
`;

const ImageCss = css`
  height: 164px;
  width: auto;
  object-fit: contain;
`;

const LogOutButtonCss = css`
  height: 26px;
  padding: 0 4px;
  width: fit-content;
  font-size: 12px;
`;
