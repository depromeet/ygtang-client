import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { css, Theme } from '@emotion/react';

import { CTABottomButton } from '~/components/common/Button';
import CheckList from '~/components/common/CheckList';
import LoadingHandler from '~/components/common/LoadingHandler';
import NavigationBar from '~/components/common/NavigationBar';
import { FixedSpinner } from '~/components/common/Spinner';
import TextField from '~/components/common/TextField';
import useSignupMutation from '~/hooks/api/sign-up/useSignupMutation';
import useDidUpdate from '~/hooks/common/useDidUpdate';
import useInput from '~/hooks/common/useInput';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

export default function SignUpEmailVerified() {
  const { fireToast } = useToast();
  const { query } = useRouter();

  const nickname = useInput({ useDebounce: true });
  const password = useInput({ useDebounce: true });
  const passwordRepeat = useInput({ useDebounce: true });
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');

  const [checkTerms, setCheckTerms] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);

  const {
    mutate: signupMutate,
    isSuccess: signupSuccess,
    error: signupError,
    isLoading: signupLoading,
  } = useSignupMutation();

  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validator({ type: 'email', value: query.email as string })) {
      return fireToast({ content: '이메일이 올바르지 않습니다. 처음부터 다시 시작해주세요.' });
    }

    if (nicknameError !== '' || passwordError !== '' || passwordRepeatError !== '') {
      return fireToast({ content: '모든 입력 값을 적어주세요.' });
    }

    if (!checkTerms && !checkPrivacy) {
      return fireToast({ content: '모두 동의해야 가입할 수 있습니다.' });
    }

    signupMutate({
      email: query.email as string,
      nickName: nickname.value,
      password: password.value,
      confirmPassword: passwordRepeat.value,
    });
  };

  useDidUpdate(() => {
    if (nickname.debouncedValue.length >= 4 && nickname.debouncedValue.length <= 20) {
      setNicknameError('');
    } else {
      setNicknameError('닉네임은 4자 이상 20자 이하여야 합니다.');
    }
  }, [nickname.debouncedValue]);

  useDidUpdate(() => {
    if (password.debouncedValue.length >= 6) {
      if (
        validator({
          rule: /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
          value: password.debouncedValue,
        })
      ) {
        setPasswordError('');
      } else {
        setPasswordError('비밀번호는 영문과 숫자를 모두 포함하여야 합니다.');
      }
    } else {
      setPasswordError('비밀번호는 6자리 이상이여야 합니다.');
    }
  }, [password.debouncedValue]);

  useDidUpdate(() => {
    if (
      passwordRepeat.debouncedValue.length > 0 &&
      passwordRepeat.debouncedValue === password.value
    ) {
      setPasswordRepeatError('');
    } else {
      setPasswordRepeatError('비밀번호와 일치하여야 합니다.');
    }
  }, [passwordRepeat.debouncedValue]);

  useEffect(() => {
    if (signupSuccess) {
      // TODO: router.push가 안되는 문제 해결하기
      window.location.replace('/login');
    }
  }, [signupSuccess]);

  useEffect(() => {
    if (signupError) {
      fireToast({ content: signupError.message ?? '회원가입 도중 문제가 발생하였습니다.' });
    }
  }, [fireToast, signupError]);

  return (
    <LoadingHandler
      isLoading={!query || !Boolean(query.email) || query.email === undefined}
      loadingComponent={<FixedSpinner />}
    >
      <article css={containerCss}>
        <NavigationBar title={'회원가입'} />
        <p css={introTextWrapper}>마지막 단계입니다!</p>
        <form css={formCss} onSubmit={handleSignupSubmit}>
          <fieldset css={fieldSetCss}>
            <TextField
              label={'닉네임'}
              placeholder={'닉네임을 입력해주세요'}
              feedback={nickname.value !== '' ? nicknameError || <>&nbsp;</> : <>&nbsp;</>}
              isSuccess={nicknameError === ''}
              value={nickname.value}
              onChange={nickname.onChange}
              required
            />
            <TextField
              type="password"
              label={'비밀번호'}
              placeholder={'영문, 숫자 포함 6자 이상의 비밀번호'}
              feedback={password.value !== '' ? passwordError || <>&nbsp;</> : <>&nbsp;</>}
              isSuccess={passwordError === ''}
              value={password.value}
              onChange={password.onChange}
              required
            />
            <TextField
              type="password"
              label={'비밀번호 확인'}
              placeholder={'영문, 숫자 포함 6자 이상의 비밀번호'}
              feedback={
                passwordRepeat.value !== '' ? passwordRepeatError || <>&nbsp;</> : <>&nbsp;</>
              }
              isSuccess={passwordRepeatError === ''}
              value={passwordRepeat.value}
              onChange={passwordRepeat.onChange}
              required
            />
            <div css={checkListWrapperCss}>
              <CheckList isChecked={checkTerms} onToggle={() => setCheckTerms(!checkTerms)}>
                (필수) 서비스 이용약관에 동의
              </CheckList>
              <CheckList isChecked={checkPrivacy} onToggle={() => setCheckPrivacy(!checkPrivacy)}>
                (필수) 개인정보 수집 이용에 동의
              </CheckList>
            </div>
          </fieldset>
          <CTABottomButton type={'submit'} disabled={signupLoading}>
            Start Tang!
          </CTABottomButton>
        </form>
      </article>
    </LoadingHandler>
  );
}

const containerCss = css`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

const introTextWrapper = (theme: Theme) => css`
  white-space: pre;
  font-weight: ${theme.font.weight.bold};
  color: ${theme.color.gray05};
  font-size: 18px;
  line-height: 150%;
  margin-top: 40px;
  margin-bottom: 32px;
`;

const formCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const fieldSetCss = css`
  display: flex;
  flex-direction: column;
  gap: 16px; // (original 36px) - (label height 20px)

  flex-grow: 1;
`;

const checkListWrapperCss = css`
  display: flex;
  flex-direction: column;
`;
