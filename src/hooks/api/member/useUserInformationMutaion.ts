import { useMutation } from 'react-query';

import { put } from '~/libs/api/client';
import { queryClient } from '~/libs/api/queryClient';
import { useToast } from '~/store/Toast';

import { USER_INFORMATION_QUERY_KEY } from './useGetUserInformation';

export default function useUserInformationMutation() {
  const { fireToast } = useToast();
  const reSetUserInformation = () => {
    queryClient.resetQueries(USER_INFORMATION_QUERY_KEY);
  };

  const putUserInformationNicknameMutation = useMutation(
    (data: { nickname: string }) => put(`/v1/members/nickname/change`, data),
    {
      onSuccess: () => {
        fireToast({ content: '이름 변경에 성공하였습니다.' });
        reSetUserInformation();
      },
      onError: (error, variable, context) => {
        console.log('err', error, variable, context);
      },
    }
  );
  return {
    updateNickname: putUserInformationNicknameMutation.mutate,
  };
}
