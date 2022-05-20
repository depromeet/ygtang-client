import { useState } from 'react';
import { useRouter } from 'next/router';
import { css, Theme } from '@emotion/react';

import { CTAButton, FilledButton } from '~/components/common/Button';
import Dialog from '~/components/common/Dialog';
import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

export default function SentPasswordResetEmail() {
  const { query } = useRouter();
  const { fireToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailChecking = () => {
    if (query.email !== undefined && validator({ type: 'email', value: query.email as string })) {
    } else {
      fireToast({ content: '제공 된 이메일이 올바르지 않습니다. 다시 시도해 보세요.' });
    }
  };

  const handleEmailResend = () => {
    setIsModalOpen(false);
  };

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
            인증 링크가 전송되었습니다
            <br />
            확인 후 아래의 &apos;인증완료&apos; 버튼을 눌러주세요.
          </p>
        </div>
        <div css={emailWrapperCss}>
          <p css={emailText}>{query.email}</p>
          <CTAButton onClick={handleEmailChecking}>인증완료</CTAButton>
        </div>
        <Dialog
          isShowing={isModalOpen}
          actionButtons={
            <>
              <FilledButton colorType="light" onClick={() => setIsModalOpen(false)}>
                취소
              </FilledButton>
              <div css={dialogLongButtonCss}>
                <FilledButton colorType="dark" onClick={handleEmailResend}>
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
