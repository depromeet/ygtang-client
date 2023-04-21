import { useQuery } from '@tanstack/react-query';

import { get } from '~/libs/api/client';

export const USER_INFORMATION_QUERY_KEY = 'userInformation';

export const fetchUserInformation = () => {
  return get<UserInformationType>(`/v1/members/info`);
};

export default function useGetUserInformation(onSuccess?: (data: UserInformationType) => void) {
  const query = useQuery<UserInformationType>(
    [USER_INFORMATION_QUERY_KEY],
    async () => await fetchUserInformation(),
    { onSuccess }
  );

  const { data: userInformation } = query;
  return { userInformation };
}
