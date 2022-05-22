import { useQuery } from 'react-query';

import { get } from '~/libs/api/client';

export interface UserInformationInterface {
  nickName: string;
  email: string;
}

export const USER_INFORMATION_QUERY_KEY = 'userInformation';

export default function useGetUserInformation(
  onSuccess?: (data: UserInformationInterface) => void
) {
  const fetchUserInfromation = () => {
    return get<UserInformationInterface>(`/v1/members/info`);
  };

  const query = useQuery<UserInformationInterface>(
    USER_INFORMATION_QUERY_KEY,
    async () => await fetchUserInfromation(),
    { onSuccess }
  );

  const userInfromation = query.data;
  return { userInfromation, ...query };
}
