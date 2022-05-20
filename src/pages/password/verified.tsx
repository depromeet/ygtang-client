import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { css, Theme } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import LoadingHandler from '~/components/common/LoadingHandler';
import { FixedSpinner } from '~/components/common/Spinner';
import TextField from '~/components/common/TextField';
import useDidUpdate from '~/hooks/common/useDidUpdate';
import useInput from '~/hooks/common/useInput';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

export default function PasswordResetVerified() {
  const { fireToast } = useToast();
  const { query } = useRouter();
  const password = useInput({ useDebounce: true });
  const passwordRepeat = useInput({ useDebounce: true });
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordError !== '' || passwordRepeatError !== '') {
      return fireToast({ content: '모든 입력 값이 올바른지 확인해주세요.' });
    }
  };

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

  return (
    <LoadingHandler
      isLoading={!query || !Boolean(query.email) || query.email === undefined}
      loadingComponent={<FixedSpinner />}
    >
      <article css={passwordResetCss}>
        <div css={navMockupCss} />
        <p css={introTextWrapper}>
          새로운 비밀번호를
          <br />
          입력해주세요.
        </p>
        <form css={loginFieldSetCss} onSubmit={handleSubmit}>
          <TextField
            type={'password'}
            label={'새로운 비밀번호'}
            placeholder={'영문, 숫자 포함 6자 이상의 비밀번호'}
            feedback={password.debouncedValue !== '' ? passwordError || <>&nbsp;</> : <>&nbsp;</>}
            isSuccess={password.debouncedValue.length > 0 && passwordError === ''}
            value={password.value}
            onChange={password.onChange}
            required
          />
          <TextField
            type={'password'}
            label={'비밀번호 확인'}
            placeholder={'비밀번호와 동일한 값 입력'}
            feedback={
              passwordRepeat.debouncedValue !== '' ? (
                passwordRepeatError || <>&nbsp;</>
              ) : (
                <>&nbsp;</>
              )
            }
            isSuccess={passwordRepeat.debouncedValue.length > 0 && passwordRepeatError === ''}
            value={passwordRepeat.value}
            onChange={passwordRepeat.onChange}
            required
          />
          <CTAButton type={'submit'}>입력 완료</CTAButton>
        </form>
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

const introTextWrapper = (theme: Theme) => css`
  color: ${theme.color.gray05};
  font-size: 18px;
  font-weight: ${theme.font.weight.bold};
  line-height: 150%;

  margin-top: 40px;
  margin-bottom: 36px;
`;

const loginFieldSetCss = css`
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-bottom: 52px;
`;
