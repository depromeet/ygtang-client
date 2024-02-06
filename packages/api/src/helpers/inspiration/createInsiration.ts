import { fetchAdapter, instance } from "@ygtang/http";

import { ApiHelper } from "../interface";

export const createInspiration: ApiHelper<{
  data: FormData;
}> = async ({ data, accessToken, isUsingFetch }) => {
  const res = await instance({
    url: "/v1/inspiration/add",
    method: "POST",
    data,
    headers: { accessToken },
    adapter: isUsingFetch ? fetchAdapter : undefined,
  });
  return res.data;
};
