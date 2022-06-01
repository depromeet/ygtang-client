import { useRouter } from 'next/router';
import { css, Theme } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';
import useInternalRouter from '~/hooks/common/useInternalRouter';

export default function SentPasswordResetEmail() {
  const { query } = useRouter();
  const { push } = useInternalRouter();

  return (
    <LoadingHandler
      isLoading={!query || !Boolean(query.email) || query.email === undefined}
      loadingComponent={<FixedSpinner />}
    >
      <article css={sentPasswordResetCss}>
        <NavigationBar title={'비밀번호 찾기'} />
        <div css={introCardCss}>
          <p css={introTextWrapperCss}>
            회원님의 이메일로
            <br />
            인증 링크가 전송되었습니다.
            <br />
            전송된 이메일의 링크를 눌러주세요.
          </p>
        </div>
        <CTAButton onClick={() => push('/login')}>로그인으로 돌아가기</CTAButton>
        <div css={smallTextWrapperCss}>문의사항은 yeonggamt@gmail.com로 문의해 주세요.</div>
      </article>
    </LoadingHandler>
  );
}

const sentPasswordResetCss = css`
  display: flex;
  flex-direction: column;
`;

const introCardCss = css`
  width: 100%;
  margin-top: 44px;
  margin-bottom: 149px;
`;

const introTextWrapperCss = (theme: Theme) => css`
  color: ${theme.color.gray05};
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
`;

const smallTextWrapperCss = (theme: Theme) => css`
  color: ${theme.color.gray03};
  font-weight: ${theme.font.weight.regular};
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  margin-top: 44px;
`;
