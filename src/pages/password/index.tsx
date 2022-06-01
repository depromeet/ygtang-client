import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { css, Theme } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import TextField from '~/components/common/TextField';
import useSendPasswordResetEmailMutation from '~/hooks/api/auth/useSendPasswordResetEmailMutation';
import useDidUpdate from '~/hooks/common/useDidUpdate';
import useInput from '~/hooks/common/useInput';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

export default function PasswordReset() {
  const { fireToast } = useToast();
  const email = useInput({ useDebounce: true });
  const { push } = useRouter();
  const [emailError, setEmailError] = useState('');
  const { mutate: sendPasswordResetEmailMutation, isLoading: isSendPasswordResetEmailLoading } =
    useSendPasswordResetEmailMutation({
      onSuccess: () => {
        push({
          pathname: '/password/sent-email',
          query: {
            email: email.value,
          },
        });
      },
      onError: () => {
        fireToast({ content: '이메일 전송 도중 오류가 발생하였습니다.' });
      },
    });

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError !== '') {
      return fireToast({ content: '입력한 값이 올바른지 확인해주세요.' });
    }
    sendPasswordResetEmailMutation({ email: email.value });
  };

  useDidUpdate(() => {
    if (!validator({ type: 'email', value: email.debouncedValue })) {
      setEmailError('올바른 이메일을 입력해주세요.');
    } else {
      setEmailError('');
    }
  }, [email.debouncedValue]);

  return (
    <article css={loginCss}>
      <NavigationBar title={'비밀번호 찾기'} />
      <div css={introCardCss}>
        <p css={introTextWrapper}>
          가입 시 사용한
          <br />
          이메일 주소를 입력하세요.
        </p>
      </div>
      <form css={fieldSetCss} onSubmit={handleEmailSubmit}>
        <TextField
          placeholder={'이메일을 입력해주세요'}
          value={email.value}
          onChange={email.onChange}
          feedback={email.debouncedValue !== '' ? emailError || <>&nbsp;</> : <>&nbsp;</>}
          isSuccess={email.debouncedValue.length > 0 && emailError === ''}
          required
        />
        <CTAButton
          type={'submit'}
          disabled={
            email.debouncedValue.length === 0 ||
            emailError !== '' ||
            isSendPasswordResetEmailLoading
          }
        >
          다음
        </CTAButton>
      </form>
      <div css={signUpTextWrapperCss}>문의사항은 yeonggamt@gmail.com로 문의해 주세요.</div>
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

const fieldSetCss = css`
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-bottom: 52px;
`;

const signUpTextWrapperCss = (theme: Theme) => css`
  color: ${theme.color.gray03};
  font-weight: ${theme.font.weight.regular};
  font-size: 12px;
  line-height: 150%;
  text-align: center;
`;
