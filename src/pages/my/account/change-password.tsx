import { FormEvent, useState } from 'react';
import { css, Theme } from '@emotion/react';

import { CTABottomButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import TextField from '~/components/common/TextField';
import { useChangePassword } from '~/hooks/api/member/useChangePassword';
import useDidUpdate from '~/hooks/common/useDidUpdate';
import useInput from '~/hooks/common/useInput';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

export default function MypageChangePassword() {
  const { push } = useInternalRouter();
  const { fireToast } = useToast();

  const { mutate: changePasswordMutate, isLoading: changePasswordLoading } = useChangePassword({
    onSuccess: () => {
      fireToast({
        content: '비밀번호가 변경되었습니다.',
      });
      push('/my');
    },
    onError: () => {
      fireToast({
        content: '비밀번호 변경 시 오류가 발생하였습니다.',
      });
    },
  });

  const password = useInput({ useDebounce: true });
  const passwordRepeat = useInput({ useDebounce: true });
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (changePasswordLoading) return;
    if (passwordError === '' && passwordRepeatError === '') {
      changePasswordMutate({
        password: password.value,
        confirmPassword: passwordRepeat.value,
      });
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
    <article css={containerCss}>
      <NavigationBar title={'비밀번호 변경'} />
      <p css={introTextWrapper}>비밀번호를 변경합니다.</p>
      <form css={formCss} onSubmit={handleSubmit}>
        <fieldset css={fieldSetCss}>
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
          <TextField
            type="password"
            label={'비밀번호 확인'}
            placeholder={'영문, 숫자 포함 6자 이상의 비밀번호'}
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
        </fieldset>
        <CTABottomButton type={'submit'} disabled={changePasswordLoading}>
          변경
        </CTABottomButton>
      </form>
    </article>
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
