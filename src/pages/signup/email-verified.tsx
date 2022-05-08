import { css, Theme } from '@emotion/react';

import { CTABottomButton } from '~/components/common/Button';
import CheckList from '~/components/common/CheckList';
import NavigationBar from '~/components/common/NavigationBar';
import TextField from '~/components/common/TextField';
import useInput from '~/hooks/common/useInput';

export default function SignUpEmailVerified() {
  const nickname = useInput({ useDebounce: true });
  const password = useInput({ useDebounce: true });
  const passwordRepeat = useInput({ useDebounce: true });

  return (
    <article css={containerCss}>
      <NavigationBar title={'회원가입'} />
      <p css={introTextWrapper}>마지막 단계입니다!</p>
      <form>
        <fieldset css={fieldSetCss}>
          <TextField
            label={'닉네임'}
            placeholder={'닉네임을 입력해주세요'}
            feedback={<>&nbsp;</>}
            value={nickname.value}
            onChange={nickname.onChange}
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
          <TextField
            label={'비밀번호 확인'}
            placeholder={'영문, 숫자 포함 6자 이상의 비밀번호'}
            feedback={<>&nbsp;</>}
            value={passwordRepeat.value}
            onChange={passwordRepeat.onChange}
            required
          />
          <div css={checkListWrapperCss}>
            <CheckList isChecked={false} onToggle={() => {}}>
              (필수) 서비스 이용약관에 동의
            </CheckList>
            <CheckList isChecked={false} onToggle={() => {}}>
              (필수) 개인정보 수집 이용에 동의
            </CheckList>
          </div>
        </fieldset>
        <CTABottomButton type={'submit'}>Start Tang!</CTABottomButton>
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

const fieldSetCss = css`
  display: flex;
  flex-direction: column;
  gap: 16px; // (original 36px) - (label height 20px)
`;

const checkListWrapperCss = css`
  display: flex;
  flex-direction: column;
`;
