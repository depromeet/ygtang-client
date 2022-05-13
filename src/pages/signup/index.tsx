import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { css, Theme } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import TextField from '~/components/common/TextField';
import useSignupSendEmailMutation from '~/hooks/api/auth/useSignupSendEmailMutation';
import useCheckExistsSignupMutation from '~/hooks/api/sign-up/useCheckExistsSignupMutation';
import useDidUpdate from '~/hooks/common/useDidUpdate';
import useInput from '~/hooks/common/useInput';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

export default function Signup() {
  const { fireToast } = useToast();
  const email = useInput({ useDebounce: true });
  const { push } = useRouter();
  const [emailError, setEmailError] = useState('');
  const {
    mutate: emailSendMutate,
    error: emailSendedError,
    isSuccess: emailSendingSuccess,
    isLoading: emailSendingLoading,
  } = useSignupSendEmailMutation();
  const {
    mutate: checkExistsUserMutate,
    data: checkExistsUserData,
    error: checkExistsUserError,
    isLoading: checkExistsUserLoading,
  } = useCheckExistsSignupMutation();

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError !== '') {
      return fireToast({ content: '입력한 값이 올바른지 확인해주세요.' });
    }
    checkExistsUserMutate({ email: email.value });
  };

  useDidUpdate(() => {
    if (!validator({ type: 'email', value: email.debouncedValue })) {
      setEmailError('올바른 이메일을 입력해주세요.');
    } else {
      setEmailError('');
    }
  }, [email.debouncedValue]);

  useEffect(() => {
    if (checkExistsUserData) {
      if (!checkExistsUserData.data) {
        emailSendMutate({ email: email.value });
      } else {
        fireToast({ content: '이미 가입된 사용자입니다!' });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkExistsUserData]);

  useEffect(() => {
    if (emailSendingSuccess) {
      push({
        pathname: '/signup/sent-email',
        query: {
          email: email.value,
        },
      });
    }
  }, [email.value, emailSendingSuccess, push]);

  useEffect(() => {
    if (emailSendedError && emailSendedError.message) {
      fireToast({ content: emailSendedError.message });
    }
  }, [emailSendedError, fireToast]);

  useEffect(() => {
    if (checkExistsUserError) {
      fireToast({ content: '유저 검사 도중 문제가 발생하였습니다.' });
    }
  }, [checkExistsUserError, fireToast]);

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
      <form css={fieldSetCss} onSubmit={handleEmailSubmit}>
        <TextField
          placeholder={'이메일을 입력해주세요'}
          value={email.value}
          onChange={email.onChange}
          feedback={email.value !== '' ? emailError || <>&nbsp;</> : <>&nbsp;</>}
          isSuccess={emailError === ''}
          required
        />
        <CTAButton type={'submit'} disabled={emailSendingLoading || checkExistsUserLoading}>
          로그인
        </CTAButton>
      </form>
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

const fieldSetCss = css`
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-bottom: 52px;
`;

const signUpTextWrapperCss = (theme: Theme) => css`
  color: ${theme.color.gray03};
  font-weight: ${theme.font.weight.regular};
  font-size: 10px;
  line-height: 150%;
  text-align: center;
`;
