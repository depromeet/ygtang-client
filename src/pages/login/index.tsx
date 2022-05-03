import { css, Theme } from '@emotion/react';
import NavigationBar from '~/components/common/NavigationBar';
import TextField from '~/components/common/TextField';
import { CTAButton, GhostButton } from '~/components/common/Button';
import useInput from '~/hooks/common/useInput';

export default function Login() {
  const email = useInput({ useDebounce: true });
  const password = useInput({ useDebounce: true });

  return (
    <article css={loginCss}>
      <NavigationBar />
      <div css={loginIntroCardCss}></div>
      <form css={loginFieldSet}>
        <TextField
          label={'이메일 아이디'}
          placeholder={'이메일을 입력해주세요'}
          feedback={<>&nbsp;</>}
          value={email.value}
          onChange={email.onChange}
          required
        />
        <TextField
          label={'비밀번호'}
          placeholder={'영문, 숫자 포함 6자 이상의 비밀번호'}
          feedback={<>&nbsp;</>}
          value={password.value}
          onChange={password.onChange}
          required
        />
        <CTAButton type={'submit'}>로그인</CTAButton>
      </form>
      <GhostButton>비밀번호 찾기</GhostButton>
      <div css={signUpTextWrapperCss}>
        계정이 없으신가요? <GhostButton size={'small'}>빠르게 가입하기</GhostButton>
      </div>
    </article>
  );
}

const loginCss = css`
  display: flex;
  flex-direction: column;
`;

const loginIntroCardCss = css`
  width: 100%;
  height: 104px;
`;

const loginFieldSet = css`
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
