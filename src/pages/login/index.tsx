import { FormEvent, useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';

import { CTAButton, GhostButton } from '~/components/common/Button';
import TextField from '~/components/common/TextField';
import useMemberLoginMutation from '~/hooks/api/member/useMemberLoginMutation';
import useDidUpdate from '~/hooks/common/useDidUpdate';
import useInput from '~/hooks/common/useInput';
import { useToast } from '~/store/Toast';
import { useUser } from '~/store/User';
import { validator } from '~/utils/validator';

export default function Login() {
  const { fireToast } = useToast();
  const email = useInput({ useDebounce: true });
  const password = useInput({ useDebounce: true });
  const [isPending, setIsPending] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { userLogin } = useUser();

  const {
    mutate: loginMutate,
    data: loginMutationData,
    error: loginMutationError,
  } = useMemberLoginMutation();

  const handleFormSubmitEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError !== '' || passwordError !== '') {
      return fireToast({ content: '입력하신 값이 올바른지 확인해주세요.' });
    }
    setIsPending(true);
    loginMutate({
      email: email.value,
      password: password.value,
    });
  };

  useDidUpdate(() => {
    if (!validator({ type: 'email', value: email.debouncedValue })) {
      setEmailError('올바른 이메일을 입력해주세요.');
    } else {
      setEmailError('');
    }
  }, [email.debouncedValue]);

  useDidUpdate(() => {
    if (password.debouncedValue.length >= 6) {
      setPasswordError('');
    } else {
      setPasswordError('비밀번호는 6자리 이상이여야 합니다.');
    }
  }, [password.debouncedValue]);

  useEffect(() => {
    if (loginMutationData && loginMutationData.data) {
      userLogin({
        accessToken: loginMutationData.data.accessToken,
        refreshToken: loginMutationData.data.refreshToken,
      });
      setIsPending(false);
    }
  }, [loginMutationData, userLogin]);

  useEffect(() => {
    if (loginMutationError) {
      fireToast({ content: loginMutationError.message ?? '알 수 없는 오류가 발생했습니다.' });
      setIsPending(false);
    }
  }, [fireToast, loginMutationError]);

  return (
    <article css={loginCss}>
      <div css={navMockupCss} />
      <div css={loginIntroCardCss}></div>
      <form css={loginFieldSetCss} onSubmit={handleFormSubmitEvent}>
        <TextField
          label={'이메일 아이디'}
          placeholder={'이메일을 입력해주세요'}
          feedback={emailError || <>&nbsp;</>}
          isSuccess={!emailError}
          value={email.value}
          onChange={email.onChange}
          required
        />
        <TextField
          type={'password'}
          label={'비밀번호'}
          placeholder={'영문, 숫자 포함 6자 이상의 비밀번호'}
          feedback={passwordError || <>&nbsp;</>}
          isSuccess={!passwordError}
          value={password.value}
          onChange={password.onChange}
          required
        />
        <CTAButton type={'submit'} disabled={isPending}>
          로그인
        </CTAButton>
      </form>
      <GhostButton>비밀번호 찾기</GhostButton>
      <div css={signUpTextWrapperCss}>
        계정이 없으신가요? <GhostButton size={'small'}>빠르게 가입하기</GhostButton>
      </div>
    </article>
  );
}

const navMockupCss = css`
  height: 44px;
`;

const loginCss = css`
  display: flex;
  flex-direction: column;
`;

const loginIntroCardCss = css`
  width: 100%;
  height: 104px;
`;

const loginFieldSetCss = css`
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-bottom: 52px;
`;

const signUpTextWrapperCss = (theme: Theme) => css`
  margin-top: 26px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  color: ${theme.color.gray04};
  font-weight: ${theme.font.weight.regular};
  font-size: 10px;
  line-height: 150%;
`;
