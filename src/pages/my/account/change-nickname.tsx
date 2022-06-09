import { Dispatch, SetStateAction, useState } from 'react';
import { css } from '@emotion/react';

import useUserInformationMutation from '~/hooks/api/member/useUserInformationMutaion';
import useDidUpdate from '~/hooks/common/useDidUpdate';
import useInput from '~/hooks/common/useInput';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useToast } from '~/store/Toast';
import { useUserInformation } from '~/store/UserInformation';
import { recordEvent } from '~/utils/analytics';

import { GhostButton } from '../../../components/common/Button';
import NavigationBar from '../../../components/common/NavigationBar';
import TextField from '../../../components/common/TextField';

export default function MyAccountChangeNickame() {
  const { userInformation } = useUserInformation();
  const nickname = useInput({ useDebounce: true, initialValue: userInformation.nickName });
  const [nicknameError, setNicknameError] = useState('변경될 이름을 입력해주세요.');
  const { callMuation, onFormReturn, isValidateNickname } = useChangeNickname({
    nickname,
    nicknameError,
    setNicknameError,
    userInformation,
  });

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
          isSuccess={isValidateNickname}
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

interface UseChangeNicknameProps {
  nickname: ReturnType<typeof useInput>;
  nicknameError: string;
  setNicknameError: Dispatch<SetStateAction<string>>;
  userInformation: UserInformationType;
}

function useChangeNickname({
  nickname,
  nicknameError,
  setNicknameError,
  userInformation,
}: UseChangeNicknameProps) {
  const { fireToast } = useToast();
  const { updateNickname } = useUserInformationMutation();
  const { push } = useInternalRouter();

  // NOTE: route 직접 방문 시 변경 전 닉네임 setStating
  useDidUpdate(() => {
    nickname.setValue(userInformation.nickName);
  }, [userInformation.nickName]);

  const isNicknameNotValidateForLength =
    nickname.debouncedValue.trim().length < 4 || 20 < nickname.debouncedValue.trim().length;

  const isNicknameSameWithPrev = userInformation.nickName === nickname.debouncedValue.trim();

  const isValidateNickname = !isNicknameNotValidateForLength && !isNicknameSameWithPrev;

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

  const callMuation = () => {
    if (nicknameError) return fireToast({ content: nicknameError });

    updateNickname(
      { nickname: nickname.debouncedValue.trim() },
      {
        onSuccess: () => {
          recordEvent({ action: '닉네임 변경' });
          push('/my/account');
        },
      }
    );
  };

  const onFormReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    callMuation();
  };

  return {
    onFormReturn,
    callMuation,
    isValidateNickname,
  };
}
