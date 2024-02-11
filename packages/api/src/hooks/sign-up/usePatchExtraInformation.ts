import { useMutation } from "@tanstack/react-query";
import { patch } from "@ygtang/http";

export interface ExtraInformationParams {
  email: string;
  job: string;
  gender: string;
}

/**
 * NOTE: @ddarkr - 이전 과정에서 api fetching을 다루지 않는 로직이 제거되었습니다. 이전 시 확인 부탁드립니다.
 */
export function usePatchExtraInformation() {
  const mutation = useMutation<
    unknown,
    { message?: string },
    ExtraInformationParams
  >({
    mutationFn: (data: ExtraInformationParams) =>
      patch(`/v1/signup/extra-informations?email=${data.email}`, {
        json: data,
      }),
  });

  return mutation;
}
