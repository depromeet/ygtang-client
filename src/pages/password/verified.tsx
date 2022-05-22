import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { css, Theme } from '@emotion/react';

import LoadingHandler from '~/components/common/LoadingHandler';
import { FixedSpinner } from '~/components/common/Spinner';
import useCheckPasswordResetEmailVerifiedMutation from '~/hooks/api/auth/useCheckPasswordResetEmailVerifiedMutation';
import useSendResetPasswordMutation from '~/hooks/api/member/useSendResetPasswordMutation';
import { useToast } from '~/store/Toast';

export default function PasswordResetVerified() {
  const { fireToast } = useToast();
  const queryEmail = useRouterQuery('email', String);
  
  // 하단의 query.email => queryEmail로
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    mutate: checkMutate,
    data: checkData,
    isLoading: checkLoading,
    error: checkError,
  } = useCheckPasswordResetEmailVerifiedMutation();
  const {
    mutate: sendMutate,
    isSuccess: sendSuccess,
    isLoading: sendLoading,
    error: sendError,
  } = useSendResetPasswordMutation();

  useEffect(() => {
    if (query && query.email && query.email !== '') {
      checkMutate({
        email: query.email as string,
      });
    }
  }, [checkMutate, query]);

  useEffect(() => {
    if (checkData) {
      if (checkData.data) {
        sendMutate({
          email: query.email as string,
        });
      } else {
        setIsError(true);
        fireToast({ content: '전송하지 못했습니다. 사유: ' + checkData.message, duration: 5000 });
      }
    }
  }, [checkData, fireToast, query.email, sendMutate]);

  useEffect(() => {
    if (checkError) {
      setIsError(true);
      fireToast({ content: '전송하지 못했습니다. 사유: ' + checkError.message, duration: 5000 });
    }
  }, [checkError, fireToast]);

  useEffect(() => {
    if (sendSuccess) {
      setIsSent(true);
    }
  }, [sendSuccess]);

  useEffect(() => {
    if (sendError) {
      setIsError(true);
      fireToast({ content: '전송하지 못했습니다. 사유: ' + sendError.message, duration: 5000 });
    }
  }, [sendError, fireToast]);

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
        !query ||
        !Boolean(query.email) ||
        query.email === undefined ||
        checkLoading ||
        !isSent ||
        sendLoading
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
