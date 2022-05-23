import { useState } from 'react';
import { css } from '@emotion/react';

import useUserInformationMutation from '~/hooks/api/member/useUserInformationMutaion';
import useDidUpdate from '~/hooks/common/useDidUpdate';
import useInput from '~/hooks/common/useInput';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useToast } from '~/store/Toast';
import { useUserInformation } from '~/store/UserInformation';

import { GhostButton } from '../../../components/common/Button';
import NavigationBar from '../../../components/common/NavigationBar';
import TextField from '../../../components/common/TextField';

export default function MyAccountChangeNickame() {
  const { fireToast } = useToast();
  const nickname = useInput({ useDebounce: true });
  const { userInformation } = useUserInformation();
  const [nicknameError, setNicknameError] = useState('');
  const { updateNickname } = useUserInformationMutation();
  const { push } = useInternalRouter();
  useDidUpdate(() => {
    nickname.setValue(userInformation.nickName);
  }, [userInformation.nickName]);

  useDidUpdate(() => {
    if (!nickname.debouncedValue.length || userInformation.nickName === nickname.debouncedValue) {
      setNicknameError('변경될 이름을 입력해주세요.');
    } else {
      setNicknameError('');
    }
  }, [nickname.debouncedValue]);

  const onFormReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    callMuation();
  };

  const callMuation = () => {
    if (nicknameError) return fireToast({ content: '변경될 이름을 확인해주세요.' });
    updateNickname(
      { nickname: nickname.debouncedValue },
      {
        onSuccess: () => {
          push('/my/account');
        },
      }
    );
  };

  return (
    <article css={editNickNameCss}>
      <NavigationBar
        title="이름"
        rightElement={
          <GhostButton
            size="large"
            onClick={() => {
              callMuation();
            }}
          >
            완료
          </GhostButton>
        }
      />
      <form css={formCss} onSubmit={onFormReturn}>
        <TextField
          label="이름"
          feedback={nickname.debouncedValue !== '' ? nicknameError || <>&nbsp;</> : <>&nbsp;</>}
          isSuccess={nickname.debouncedValue.length > 0 && nicknameError === ''}
          value={nickname.value}
          onChange={nickname.onChange}
          required
        />
      </form>
    </article>
  );
}

const editNickNameCss = css`
  display: flex;
  flex-direction: column;
`;
const formCss = css`
  margin-top: 32px;
`;
