import { useRouter } from 'next/router';
import { css, Theme } from '@emotion/react';

import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';

export default function SentPasswordResetEmail() {
  const { query } = useRouter();

  return (
    <LoadingHandler
      isLoading={!query || !Boolean(query.email) || query.email === undefined}
      loadingComponent={<FixedSpinner />}
    >
      <article css={sentPasswordResetCss}>
        <NavigationBar title={'비밀번호 찾기'} />
        <div css={introCardCss}>
          <p css={introTextWrapper}>
            회원님의 이메일로
            <br />
            인증 링크가 전송되었습니다.
            <br />
            <br />
            전송된 이메일의 링크를 눌러주세요.
          </p>
        </div>
      </article>
    </LoadingHandler>
  );
}

const sentPasswordResetCss = css`
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
  bottom: 17px;
  color: ${theme.color.gray05};
  font-size: 15px;
  font-weight: 600;
  line-height: 150%;
`;
