import { useRecoilState } from 'recoil';

import useGetUserInformation from '~/hooks/api/member/useGetUserInformation';

import { userInformationState } from './userInformationStates';

export function useUserInformation() {
  const [userInformation, setUserInformation] = useRecoilState(userInformationState);
  const { refetch } = useGetUserInformation(setUserInformation);

  return {
    userInformation,
    resetUserInformation: refetch,
  };
}
