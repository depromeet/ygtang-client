import { css, Theme } from '@emotion/react';

import { USER_PROFILE_IMAGE_SRC } from '~/constants/assets';
import useGetUserInformation from '~/hooks/api/member/useGetUserInfromation';
import { useUser } from '~/store/User';

import { FilledButton } from '../common/Button';
import MyInformationMenu from './InformationMenu';

export default function MyProfile() {
  const { userLogout } = useUser();
  const { userInfromation } = useGetUserInformation();

  return (
    <section css={MyProfileContainerCss}>
      <MyInformationMenu
        label={userInfromation?.nickName || ''}
        description={userInfromation?.email || ''}
        align="bottom"
        rightElement={
          <FilledButton css={LogOutButtonCss} onClick={userLogout}>
            로그아웃
          </FilledButton>
        }
      />
      <img css={ImageCss} src={USER_PROFILE_IMAGE_SRC} alt="user-profle" />
    </section>
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
