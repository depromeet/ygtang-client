import { css, Theme } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import { CONNECT_EMAIL } from '~/constants/common';
import { useToast } from '~/store/Toast';

export default function MyAccountChangePassword() {
  const { fireToast } = useToast();

  return (
    <article css={loginCss}>
      <NavigationBar title="비밀번호 변경?찾기?" />
      <div css={introCardCss}>
        <p css={introTextWrapper}>
          안녕하세요. {'한영감'}님
          <br />
          비밀번호를 변경하고 싶으신가요?
          <br />
          비밀번호를 다시 설정하시려면
          <br />
          아래버튼을 클릭해주세요.
        </p>
      </div>
      <CTAButton
        onClick={() => {
          fireToast({
            content:
              '메일함을 확인해주세요. 등록된 이메일주소로 비밀번호를 재설정할 수 있는 링크를 보내드렸습니다.',
          });
        }}
      >
        비밀번호 변경하기
      </CTAButton>
      <div css={connetUsTextCss}>문의사항은 {CONNECT_EMAIL}로 문의해 주세요.</div>
    </article>
  );
}

const loginCss = css`
  display: flex;
  flex-direction: column;
`;

const introCardCss = css`
  position: relative;
  width: 100%;
  height: 108px;
  margin-top: 40px;
  margin-bottom: 64px;
`;

const introTextWrapper = (theme: Theme) => css`
  position: absolute;
  left: 12px;
  bottom: 17px;
  color: ${theme.color.gray05};
  font-size: 15px;
  font-weight: 600;
  line-height: 150%;
`;

const connetUsTextCss = (theme: Theme) => css`
  margin-top: 44px;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  color: ${theme.color.gray03};
`;
