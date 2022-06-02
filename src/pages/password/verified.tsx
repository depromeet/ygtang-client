import { useState } from 'react';
import { css, Theme } from '@emotion/react';

import LoadingHandler from '~/components/common/LoadingHandler';
import { FixedSpinner } from '~/components/common/Spinner';
import useCheckPasswordResetEmailVerifiedMutation from '~/hooks/api/auth/useCheckPasswordResetEmailVerifiedMutation';
import useSendResetPasswordMutation from '~/hooks/api/member/useSendResetPasswordMutation';
import useDidMount from '~/hooks/common/useDidMount';
import useRouterQuery from '~/hooks/common/useRouterQuery';
import { useToast } from '~/store/Toast';
import { fullViewHeight } from '~/styles/utils';

export default function PasswordResetVerified() {
  const { fireToast } = useToast();
  const queryEmail = useRouterQuery('email', String);

  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const { mutate: checkMutate } = useCheckPasswordResetEmailVerifiedMutation({
    onSuccess: data => {
      if (data.data && queryEmail) {
        sendMutate({
          email: queryEmail,
        });
      } else {
        setIsError(true);
        fireToast({ content: '전송하지 못했습니다. (' + data.message + ')', duration: 5000 });
      }
    },
    onError: data => {
      fireToast({ content: '전송하지 못했습니다. (' + data.message + ')', duration: 5000 });
      setIsError(true);
    },
  });
  const { mutate: sendMutate } = useSendResetPasswordMutation({
    onSuccess: () => setIsSent(true),
    onError: error => {
      if (error) {
        setIsError(true);
        fireToast({ content: '전송하지 못했습니다. (' + error.message + ')', duration: 5000 });
      }
    },
  });

  useDidMount(() => {
    if (queryEmail && queryEmail !== '') {
      checkMutate({
        email: queryEmail,
      });
    }
  });

  if (isError) {
    return (
      <article css={articleCss}>
        <div css={passwordAlertWrapper}>
          <img src="/WrongAccess.svg" alt="오류 안내 캐릭터" css={ErrorImg} />
        </div>
      </article>
    );
  }

  return (
    <LoadingHandler isLoading={!isSent} loadingComponent={<FixedSpinner />}>
      <article css={articleCss}>
        <div css={navMockupCss} />
        <div css={introCardCss}>
          <p css={introTextWrapperCss}>
            회원님의 이메일로
            <br />
            임시 비밀번호를 보냈어요.
          </p>
          <p css={introSecondTextWrapperCss}>
            임시 비밀번호로 로그인 후,
            <br />
            꼭! 비밀번호를 변경해주세요!
          </p>
        </div>
        <div css={smallTextWrapperCss}>문의사항은 yeonggamt@gmail.com로 문의해 주세요.</div>
      </article>
    </LoadingHandler>
  );
}

const navMockupCss = css`
  height: 44px;
`;

const articleCss = css`
  display: flex;
  flex-direction: column;
  height: ${fullViewHeight()};
`;

const introCardCss = css`
  width: 100%;
  margin-bottom: 36px;
`;

const introTextWrapperCss = (theme: Theme) => css`
  color: ${theme.color.gray05};
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  margin-top: 40px;
`;
const introSecondTextWrapperCss = (theme: Theme) => css`
  color: ${theme.color.gray05};
  font-size: 18px;
  font-weight: 500;
  line-height: 150%;
  margin-top: 10px;
`;
const smallTextWrapperCss = (theme: Theme) => css`
  color: ${theme.color.gray03};
  font-weight: ${theme.font.weight.regular};
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  margin-top: 44px;
`;

const passwordAlertWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 0 16px;
`;

const ErrorImg = css`
  width: 100%;
`;
