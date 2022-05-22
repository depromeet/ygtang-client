import { useQuery } from 'react-query';

import { get } from '~/libs/api/client';

export const USER_INFORMATION_QUERY_KEY = 'userInformation';

export default function useGetUserInformation(
  onSuccess?: (data: UserInformationInterface) => void
) {
  const fetchUserInformation = () => {
    return get<UserInformationInterface>(`/v1/members/info`);
  };

  const query = useQuery<UserInformationInterface>(
    USER_INFORMATION_QUERY_KEY,
    async () => await fetchUserInformation(),
    { onSuccess }
  );

  const userInformation = query.data;
  return { userInformation, ...query };
}
