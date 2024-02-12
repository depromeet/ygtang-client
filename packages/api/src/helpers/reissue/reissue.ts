import { post } from "@ygtang/http";

import { AuthTokenResponseInterface } from "../../types/auth";
import { ApiHelper } from "../interface";

interface ReissueResponse {
  message: string;
  data: AuthTokenResponseInterface;
}

export const reissue: ApiHelper<
  { refreshToken?: string },
  ReissueResponse
> = async ({ refreshToken }) => {
  const res = await post<ReissueResponse>("v1/reissue", {
    headers: {
      "REFRESH-TOKEN": refreshToken,
    },
  });
  return res;
};
