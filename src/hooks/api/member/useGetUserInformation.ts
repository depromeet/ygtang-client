import { useQuery } from 'react-query';

import { get } from '~/libs/api/client';

export const USER_INFORMATION_QUERY_KEY = 'userInformation';

export default function useGetUserInformation(onSuccess?: (data: UserInformationType) => void) {
  const fetchUserInformation = () => {
    return get<UserInformationType>(`/v1/members/info`);
  };

  const query = useQuery<UserInformationType>(
    USER_INFORMATION_QUERY_KEY,
    async () => await fetchUserInformation(),
    { onSuccess }
  );

  const { data: userInformation } = query;
  return { userInformation };
}
