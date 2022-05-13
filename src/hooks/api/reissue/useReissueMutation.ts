import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

interface ReissueMutationRequest {
  refreshToken: string;
}

interface UseReissueMutationProps {
  userLogin: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => void;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}

export default function useReissueMutation({ userLogin, setIsLoaded }: UseReissueMutationProps) {
  return useMutation(
    (data: ReissueMutationRequest) =>
      post<AuthTokenResponseInterface>('/v1/reissue', undefined, {
        headers: {
          'REFRESH-TOKEN': data.refreshToken,
        },
      }),
    {
      onSuccess: data => {
        const { accessToken, refreshToken } = data.data;
        userLogin({ accessToken, refreshToken });
        setIsLoaded(true);
      },
    }
  );
}
