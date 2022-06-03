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

  const isNicknameNotValidateForLength =
    nickname.debouncedValue.length < 4 || 20 < nickname.debouncedValue.length;

  const isNicknameSameWithPrev = userInformation.nickName === nickname.debouncedValue;

  useDidUpdate(() => {
    if (isNicknameNotValidateForLength) {
      setNicknameError('닉네임은 4자 이상 20자 이하여야 합니다.');
      return;
    }
    if (isNicknameSameWithPrev) {
      setNicknameError('변경될 이름을 입력해주세요.');
      return;
    }

    setNicknameError('');
  }, [nickname.debouncedValue]);

  const onFormReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    callMuation();
  };

  const callMuation = () => {
    if (nicknameError) return fireToast({ content: nicknameError });

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
        backLink="/my/account"
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
          feedback={nicknameError}
          isSuccess={!isNicknameNotValidateForLength && !isNicknameSameWithPrev}
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
