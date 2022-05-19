import { css, Theme } from '@emotion/react';

import { USER_PROFILE_IMAGE_SRC } from '~/constants/assets';

import { FilledButton } from '../common/Button';
import MyInformationMenu from './InformationMenu';

export default function MyProfile() {
  // TODO: USER 정보 부르기
  return (
    <section css={MyProfileContainerCss}>
      <MyInformationMenu
        title="한영감"
        information="gggg@gmail.com"
        align="bottom"
        rightElement={<FilledButton css={LogOutButtonCss}>로그아웃</FilledButton>}
      />
      <img css={ImageCss} src={USER_PROFILE_IMAGE_SRC} alt="user-profle" />
    </section>
  );
}

const MyProfileContainerCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px;
  height: 256px;
  background-color: ${theme.color.gray01};
  border-radius: 4px;
`;

const ImageCss = css`
  height: 164px;
  width: auto;
`;

const LogOutButtonCss = css`
  height: 26px;
  padding: 0 4px;
  width: fit-content;
  font-size: 12px;
`;
