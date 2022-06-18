import { FormEvent, useState } from 'react';
import Router from 'next/router';
import { css, Theme } from '@emotion/react';

import { CTABottomButton } from '~/components/common/Button';
import CheckList from '~/components/common/CheckList';
import NavigationBar from '~/components/common/NavigationBar';
import TextField from '~/components/common/TextField';
import { POLICY_URL } from '~/constants/common';
import useDidUpdate from '~/hooks/common/useDidUpdate';
import useInput from '~/hooks/common/useInput';
import useRouterQuery from '~/hooks/common/useRouterQuery';
import useToggle from '~/hooks/common/useToggle';
import useSignupUser from '~/store/Signup/useSignupUser';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

export default function SignUpEmailVerified() {
  const { fireToast } = useToast();
  const queryEmail = useRouterQuery('email', String);

  const nickname = useInput({ useDebounce: true });
  const password = useInput({ useDebounce: true });
  const passwordRepeat = useInput({ useDebounce: true });
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');

  const { checkTerms, toggleCheckTerms, checkPrivacy, toggleCheckPrivacy } = useInternalCheckList();

  const { setSignupUser } = useSignupUser();

  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validator({ type: 'email', value: queryEmail as string })) {
      return fireToast({
        content: '올바르지 않은 이메일입니다. 처음부터 다시 시도해주세요',
        duration: 3500,
      });
    }

    if (nicknameError !== '' || passwordError !== '' || passwordRepeatError !== '') {
      return fireToast({ content: nicknameError || passwordError || passwordRepeatError });
    }

    if (!checkTerms && !checkPrivacy) {
      return fireToast({ content: '동의하지 않은 항목을 확인해주세요.' });
    }

    setSignupUser({
      nickName: nickname.value.trim(),
      password: password.value,
      confirmPassword: passwordRepeat.value,
    });

    // NOTE: 이렇게 작성하지 않으면 router.push가 되지않는 이슈
    Router.push({ pathname: '/signup/information', query: { email: queryEmail } });
  };

  // NOTE: 닉네임 에러 메세지 설정 이펙트
  useDidUpdate(() => {
    if (nickname.debouncedValue.trim().length >= 4 && nickname.debouncedValue.trim().length <= 20) {
      setNicknameError('');
    } else {
      setNicknameError('닉네임은 4자 이상 20자 이하여야 합니다.');
    }
  }, [nickname.debouncedValue]);

  // NOTE: 비밀번호 에러 메세지 설정 이펙트
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

  // NOTE: 비밀번호 확인 에러 메세지 설정 이펙트
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
      <NavigationBar title={'회원가입'} />
      <p css={introTextWrapper}>거의 다 왔습니다!</p>
      <form css={formCss} onSubmit={handleSignupSubmit}>
        <fieldset css={fieldSetCss}>
          <TextField
            label={'닉네임'}
            placeholder={'닉네임을 입력해주세요'}
            feedback={nickname.debouncedValue !== '' ? nicknameError || <>&nbsp;</> : <>&nbsp;</>}
            isSuccess={nickname.debouncedValue.length > 0 && nicknameError === ''}
            value={nickname.value}
            onChange={nickname.onChange}
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
          <div css={checkListWrapperCss}>
            <CheckList
              isChecked={checkTerms}
              externalHref={POLICY_URL.TOS}
              onToggle={() => toggleCheckTerms()}
            >
              (필수) 서비스 이용약관에 동의
            </CheckList>
            <CheckList
              isChecked={checkPrivacy}
              externalHref={POLICY_URL.PRIVACY}
              onToggle={() => toggleCheckPrivacy()}
            >
              (필수) 개인정보 수집 이용에 동의
            </CheckList>
          </div>
        </fieldset>
        <CTABottomButton type={'submit'}>다음</CTABottomButton>
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

const checkListWrapperCss = css`
  display: flex;
  flex-direction: column;
`;

function useInternalCheckList() {
  const [checkTerms, toggleCheckTerms] = useToggle(false);
  const [checkPrivacy, toggleCheckPrivacy] = useToggle(false);

  return { checkTerms, toggleCheckTerms, checkPrivacy, toggleCheckPrivacy };
}
