import { fetchAdapter, instance } from "@ygtang/http";

import { AuthTokenResponseInterface } from "../../types/auth";
import { ApiHelper } from "../interface";

export const reissue: ApiHelper<
  { refreshToken?: string },
  {
    message: string;
    data: AuthTokenResponseInterface;
  }
> = async ({ refreshToken, isUsingFetch }) => {
  const res = await instance({
    url: "/v1/auth/reissue",
    method: "POST",
    headers: {
      "REFRESH-TOKEN": refreshToken,
    },
    adapter: isUsingFetch ? fetchAdapter : undefined,
  });
  return res.data;
};
