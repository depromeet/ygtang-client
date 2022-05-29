import { FormEvent, useState } from 'react';
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
  const { mutate: emailSendMutate, isLoading: emailSendingLoading } = useSignupSendEmailMutation({
    onSuccess: () => {
      push({
        pathname: '/signup/sent-email',
        query: {
          email: email.value,
        },
      });
    },
    onError: data => {
      if (data.message) fireToast({ content: data.message });
    },
  });

  const {
    mutate: checkExistsUserMutate,
    data: checkExistsUserData,
    isLoading: checkExistsUserLoading,
  } = useCheckExistsSignupMutation({
    onError: () => {
      fireToast({ content: '유저 검사 도중 문제가 발생하였습니다.' });
    },
  });

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

  // NOTE: 이메일이 존재하지 않는 경우, 회원가입 진행 로직
  useDidUpdate(() => {
    if (!checkExistsUserData) return;

    if (!checkExistsUserData.data) {
      emailSendMutate({ email: email.value });
    } else {
      fireToast({ content: '이미 가입된 사용자입니다!' });
    }
  }, [checkExistsUserData]);

  // NOTE: 이메일 에러 메세지가 공백이 아니면서, 비동기 로직이 로딩중일 때
  const isCTAButtonDisabled = emailError !== '' || emailSendingLoading || checkExistsUserLoading;

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
          type="email"
          value={email.value}
          onChange={email.onChange}
          feedback={email.debouncedValue !== '' ? emailError || <>&nbsp;</> : <>&nbsp;</>}
          isSuccess={email.debouncedValue.length > 0 && emailError === ''}
          required
        />
        <CTAButton type={'submit'} disabled={isCTAButtonDisabled}>
          다음
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
