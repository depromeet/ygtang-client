import { ApiException, instance } from "@ygtang/http";

import { ApiHelper } from "../interface";

export const createInspiration: ApiHelper<{
  data: FormData;
}> = async ({ data, accessToken }) => {
  const res = await instance.post("v1/inspiration/add", {
    body: data,
    headers: { accessToken },
  });
  if (res.status >= 400) {
    throw new ApiException(
      { message: "서버 문제로 영감을 생성하지 못했습니다." },
      res.status,
    );
  }
  return res;
};
