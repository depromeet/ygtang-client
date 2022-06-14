import { FormEvent, useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';

import { CTAButton, GhostButton } from '~/components/common/Button';
import TextField from '~/components/common/TextField';
import useMemberLoginMutation from '~/hooks/api/member/useMemberLoginMutation';
import useDidUpdate from '~/hooks/common/useDidUpdate';
import useInput from '~/hooks/common/useInput';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useUser } from '~/hooks/common/useUser';
import { useToast } from '~/store/Toast';
import { recordEvent } from '~/utils/analytics';
import { validator } from '~/utils/validator';

export default function Login() {
  const { fireToast } = useToast();
  const email = useInput({ useDebounce: true });
  const password = useInput({ useDebounce: true });
  const [isPending, setIsPending] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { userLogin } = useUser();
  const { push } = useInternalRouter();

  const {
    mutate: loginMutate,
    data: loginMutationData,
    error: loginMutationError,
  } = useMemberLoginMutation();

  const handleFormSubmitEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError !== '' || passwordError !== '') {
      return fireToast({
        content: '올바르지 않은 입력값입니다. 다시 확인해주세요',
        duration: 3500,
      });
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

  useDidUpdate(() => {
    if (loginMutationData && loginMutationData.data) {
      userLogin({
        accessToken: loginMutationData.data.accessToken,
        refreshToken: loginMutationData.data.refreshToken,
      });
      setIsPending(false);
      recordEvent({ action: 'Login', value: '로그인 화면에서 로그인' });
      push('/');
    }
  }, [loginMutationData]);

  useEffect(() => {
    if (loginMutationError) {
      setIsPending(false);
      fireToast({ content: loginMutationError.message ?? '알 수 없는 오류가 발생했습니다.' });
    }
  }, [fireToast, loginMutationError]);

  return (
    <article css={loginCss}>
      <div css={navMockupCss} />
      <div css={loginIntroCardCss}></div>
      <form css={loginFieldSetCss} onSubmit={handleFormSubmitEvent}>
        <TextField
          type="email"
          label={'이메일 아이디'}
          placeholder={'이메일을 입력해주세요'}
          feedback={email.debouncedValue !== '' ? emailError || <>&nbsp;</> : <>&nbsp;</>}
          isSuccess={email.debouncedValue.length > 0 && emailError === ''}
          value={email.value}
          onChange={email.onChange}
          required
        />
        <TextField
          type="password"
          label={'비밀번호'}
          placeholder={'영문, 숫자 포함 6자 이상의 비밀번호'}
          feedback={password.debouncedValue !== '' ? passwordError || <>&nbsp;</> : <>&nbsp;</>}
          isSuccess={password.debouncedValue.length > 0 && passwordError === ''}
          value={password.value}
          onChange={password.onChange}
          required
        />
        <CTAButton type={'submit'} disabled={isPending}>
          로그인
        </CTAButton>
      </form>
      <GhostButton onClick={() => push('/password')}>비밀번호 찾기</GhostButton>
      <div css={signUpTextWrapperCss}>
        계정이 없으신가요?{' '}
        <GhostButton size={'small'} onClick={() => push('/signup')}>
          빠르게 가입하기
        </GhostButton>
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
