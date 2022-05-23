import { useMutation } from 'react-query';

import { put } from '~/libs/api/client';
import { queryClient } from '~/libs/api/queryClient';
import { useToast } from '~/store/Toast';

import { USER_INFORMATION_QUERY_KEY } from './useGetUserInformation';

export default function useUserInformationMutation() {
  const { fireToast } = useToast();
  const resetUserInformation = () => {
    queryClient.resetQueries(USER_INFORMATION_QUERY_KEY);
  };

  const putUserInformationNicknameMutation = useMutation(
    (data: { nickname: string }) => put(`/v1/members/nickname/change`, data),
    {
      onSuccess: () => {
        fireToast({ content: '이름 변경에 성공하였습니다.' });
        resetUserInformation();
      },
      onError: (error, variable, context) => {
        console.log('err', error, variable, context);
      },
    }
  );
  return {
    /**
     * 유저의 이름을 업데이트 합니다.
     * updateNickname({nickname: string})
     */
    updateNickname: putUserInformationNicknameMutation.mutate,
  };
}
