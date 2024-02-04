import { useEffect, useState } from 'react';
import { useRouter } from 'next/compat/router';
import { css, Theme } from '@emotion/react';

import { CTAButton, FilledButton } from '~/components/common/Button';
import Dialog from '~/components/common/Dialog';
import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import SEO from '~/components/common/SEO';
import { FixedSpinner } from '~/components/common/Spinner';
import useCheckEmailVerifiedStatusMutation from '~/hooks/api/auth/useCheckEmailVerifiedStatusMutation';
import useSignupSendEmailMutation from '~/hooks/api/auth/useSignupSendEmailMutation';
import { useToast } from '~/store/Toast';
import { recordEvent } from '~/utils/analytics';
import { validator } from '~/utils/validator';

export default function SignupSentEmail() {
  const router = useRouter();
  const { fireToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    mutate: checkEmailStatusMutate,
    data: checkEmailStatusData,
    error: checkEmailStatusError,
    isLoading: checkEmailStatusLoading,
  } = useCheckEmailVerifiedStatusMutation();
  const {
    mutate: emailSendMutate,
    error: emailSendedError,
    isSuccess: emailSendingSuccess,
    isLoading: emailSendingLoading,
  } = useSignupSendEmailMutation({});

  if (!router) throw new Error('router is not defined');
  const { query, push } = router;

  const handleEmailChecking = () => {
    if (query.email !== undefined && validator({ type: 'email', value: query.email as string })) {
      checkEmailStatusMutate({ email: query.email as string });
    } else {
      fireToast({ content: '올바르지 않은 이메일입니다. 다시 시도해주세요.', duration: 3500 });
    }
  };

  const handleEmailResend = () => {
    emailSendMutate({ email: query.email as string });
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (checkEmailStatusData) {
      if (checkEmailStatusData.data) {
        recordEvent({
          action: 'Signup',
          value: '이메일 인증 버튼 클릭 후 성공',
          label: '이메일 인증 화면',
        });

        push({
          pathname: '/signup/email-verified',
          query: {
            email: query.email,
          },
        });
      } else {
        setIsModalOpen(true);
      }
    }
  }, [checkEmailStatusData, push, query.email]);

  useEffect(() => {
    if (emailSendingSuccess) {
      recordEvent({ action: 'Signup', value: '이메일 발송 재요청' });
      fireToast({ content: '인증 메일을 재전송했습니다. 메일함을 확인해주세요.', duration: 3500 });
    }
  }, [emailSendingSuccess, fireToast]);

  useEffect(() => {
    if (emailSendedError) {
      fireToast({
        content: '이메일 전송 도중 오류가 발생하였습니다. 다시 시도해주세요.',
        duration: 3500,
      });
    }
  }, [emailSendedError, fireToast]);

  useEffect(() => {
    if (checkEmailStatusError) {
      fireToast({
        content: '이메일 확인 도중 오류가 발생했어요.',
      });
    }
  }, [checkEmailStatusError, fireToast]);

  return (
    <>
      <SEO title="회원가입" />
      <LoadingHandler
        isLoading={!query || !Boolean(query.email) || query.email === undefined}
        loadingComponent={<FixedSpinner />}
      >
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
            <p css={emailText}>{query.email}</p>
            <CTAButton
              onClick={handleEmailChecking}
              disabled={checkEmailStatusLoading || emailSendingLoading}
            >
              인증완료
            </CTAButton>
          </div>
          <Dialog
            isShowing={isModalOpen}
            actionButtons={
              <>
                <FilledButton colorType="light" onClick={() => setIsModalOpen(false)}>
                  취소
                </FilledButton>
                <div css={dialogLongButtonCss}>
                  <FilledButton
                    colorType="dark"
                    onClick={handleEmailResend}
                    disabled={emailSendingLoading}
                  >
                    다시 전송
                  </FilledButton>
                </div>
              </>
            }
          >
            이메일 인증이 완료되지 않았습니다.
            <br />
            인증을 다시 받으시겠어요?
          </Dialog>
        </article>
      </LoadingHandler>
    </>
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
