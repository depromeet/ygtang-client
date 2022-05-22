import { useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';

import LoadingHandler from '~/components/common/LoadingHandler';
import { FixedSpinner } from '~/components/common/Spinner';
import useCheckPasswordResetEmailVerifiedMutation from '~/hooks/api/auth/useCheckPasswordResetEmailVerifiedMutation';
import useSendResetPasswordMutation from '~/hooks/api/member/useSendResetPasswordMutation';
import useRouterQuery from '~/hooks/common/useRouterQuery';
import { useToast } from '~/store/Toast';

export default function PasswordResetVerified() {
  const { fireToast } = useToast();
  const queryEmail = useRouterQuery('email', String);

  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const { mutate: checkMutate, isLoading: checkLoading } =
    useCheckPasswordResetEmailVerifiedMutation({
      onSuccess: data => {
        if (data.data && queryEmail) {
          sendMutate({
            email: queryEmail,
          });
        } else {
          setIsError(true);
          fireToast({ content: '전송하지 못했습니다. 사유: ' + data.message, duration: 5000 });
        }
      },
      onError: data => {
        fireToast({ content: '전송하지 못했습니다. 사유: ' + data.message, duration: 5000 });
        setIsError(true);
      },
    });
  const { mutate: sendMutate, isLoading: sendLoading } = useSendResetPasswordMutation({
    onSuccess: () => setIsSent(true),
    onError: error => {
      if (error) {
        setIsError(true);
        fireToast({ content: '전송하지 못했습니다. 사유: ' + error.message, duration: 5000 });
      }
    },
  });

  useEffect(() => {
    if (queryEmail && queryEmail !== '') {
      checkMutate({
        email: queryEmail,
      });
    }
  }, [checkMutate, queryEmail]);

  if (isError) {
    return (
      <article css={passwordResetCss}>
        <p css={passwordAlertTextCss}>올바른 접근이 아닙니다.</p>
      </article>
    );
  }

  return (
    <LoadingHandler
      isLoading={
        !Boolean(queryEmail) || queryEmail === undefined || checkLoading || !isSent || sendLoading
      }
      loadingComponent={<FixedSpinner />}
    >
      <article css={passwordResetCss}>
        <div css={navMockupCss} />
        <p css={introTextWrapperCss}>이메일로 임시 비밀번호를 보냈어요.</p>
        <p css={introTextWrapperCss}>
          임시 비밀번호로 로그인 후,
          <br />
          꼭! 비밀번호를 변경해주세요.
        </p>
      </article>
    </LoadingHandler>
  );
}

const navMockupCss = css`
  height: 44px;
`;

const passwordResetCss = css`
  display: flex;
  flex-direction: column;
`;

const introTextWrapperCss = (theme: Theme) => css`
  color: ${theme.color.gray05};
  font-size: 18px;
  font-weight: ${theme.font.weight.bold};
  line-height: 150%;
  margin-top: 20px;
  text-align: center;
`;

const passwordAlertTextCss = (theme: Theme) => css`
  color: ${theme.color.gray05};
  font-size: 14px;
  font-weight: ${theme.font.weight.medium};
  line-height: 150%;
  margin-top: 24px;
  text-align: center;
`;
