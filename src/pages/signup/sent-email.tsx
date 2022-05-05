import { css, Theme } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';

export default function SignupSentEmail() {
  return (
    <article css={loginCss}>
      <NavigationBar title={'회원가입'} />
      <div css={introCardCss}>
        <p css={introTextWrapper}>
          자주쓰는 이메일을
          <br />딱 한번만 인증하면,
          <br />
          영감을 차곡차곡 쌓아갈 수 있어요.
        </p>
      </div>
      <div css={emailWrapperCss}>
        <p css={emailText}>yeonggam@gmail.com</p>
        <CTAButton type={'submit'}>로그인</CTAButton>
      </div>
      <div css={signUpTextWrapperCss}>
        입력한 이메일은 홍보/마케팅 용으로 사용되지 않고,
        <br />
        로그인과 회원가입, 비밀번호 찾기에만 사용되니 안심하세요.
      </div>
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
  height: 136px;
  margin-bottom: 36px;
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

const emailWrapperCss = css`
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-bottom: 42px;
`;

const emailText = (theme: Theme) => css`
  white-space: pre;
  font-weight: ${theme.font.weight.medium};
  color: ${theme.color.gray05};
  font-size: 16px;
  line-height: 150%;

  margin-bottom: 74px;
`;

const signUpTextWrapperCss = (theme: Theme) => css`
  color: ${theme.color.gray03};
  font-weight: ${theme.font.weight.regular};
  font-size: 10px;
  line-height: 150%;
  text-align: center;
`;
