import { css, Theme } from '@emotion/react';

import { CTAButton, FilledButton } from '~/components/common/Button';
import Dialog from '~/components/common/Dialog';
import NavigationBar from '~/components/common/NavigationBar';

export default function SignupSentEmail() {
  return (
    <article css={loginCss}>
      <NavigationBar title={'회원가입'} />
      <div css={introCardCss}>
        <p css={introTextWrapper}>
          회원님의 이메일로
          <br />
          인증 링크가 전송되었습니다
          <br />
          확인 후 아래의 &apos;인증완료&apos; 버튼을 눌러주세요.
        </p>
      </div>
      <div css={emailWrapperCss}>
        <p css={emailText}>yeonggam@gmail.com</p>
        <CTAButton type={'submit'}>인증완료</CTAButton>
      </div>
      <Dialog
        isShowing={true}
        actionButtons={
          <>
            <FilledButton colorType="light">취소</FilledButton>
            <div css={dialogLongButtonCss}>
              <FilledButton colorType="dark">다시 인증</FilledButton>
            </div>
          </>
        }
      >
        이메일 인증이 완료되지 않았습니다.
        <br />
        인증을 다시 받으시겠어요?
      </Dialog>
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

const dialogLongButtonCss = css`
  width: 163px;
  flex-shrink: 0;
`;
