import { useMutation } from "@tanstack/react-query";
import { del } from "@ygtang/http";

interface UseMemberSignOutMutationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (...props: any) => unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (...props: any) => unknown;
}

/**
 * NOTE: @ddarkr - 이전 과정에서 api fetching을 다루지 않는 로직이 제거되었습니다. 이전 시 확인 부탁드립니다.
 */
export function useMemberSignOutMutation({
  onSuccess,
  onError,
}: UseMemberSignOutMutationProps) {
  return useMutation({
    mutationFn: () => del("v1/auth/signout"),
    onSuccess,
    onError,
  });
}
