import { useQuery } from "@tanstack/react-query";
import { get } from "@ygtang/http";

import { UserInformationType } from "../../types/member";

export const USER_INFORMATION_QUERY_KEY = "userInformation";

export default function useGetUserInformation() {
  const query = useQuery({
    queryKey: [USER_INFORMATION_QUERY_KEY],
    queryFn: () => get<UserInformationType>(`/v1/member/me`),
  });

  const { data: userInformation } = query;
  return { userInformation };
}
