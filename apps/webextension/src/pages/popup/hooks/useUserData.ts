import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function useUserData() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string>("");

  const { mutate: reissue, isLoading: reissueLoading } = useReissueMutation({
    onSuccess: (data) => {
      if (data) {
        chrome.storage.local.set({
          "ygtang-refresh": data.data.refreshToken,
        });
        setIsLoggedIn(true);
        setError("");
      }
    },
    onError: () => {
      setIsLoggedIn(false);
      setError("세션 갱신에 실패했습니다. 다시 로그인 해 주세요.");
    },
  });
  const { mutate: login, isLoading: loginLoading } = useMemberLoginMutation({
    onSuccess: ({ data }) => {
      console.log(data.data.refreshToken);
      chrome.storage.local.set({
        "ygtang-refresh": data.data.refreshToken,
      });
      setIsLoggedIn(true);
    },
    onError: (data) => {
      if (data) {
        if (data.message.includes("404")) {
          setError("아이디 또는 비밀번호가 일치하지 않습니다.");
          return;
        }
        setError(data.message || "알 수 없는 오류가 발생했습니다.");
      }
    },
  });

  // chrome storage 체크
  const { isLoading: tokenLoading, refetch } = useQuery(
    ["ygtang-refresh-token"],
    () => chrome.storage.local.get("ygtang-refresh"),
    {
      cacheTime: 0,
      onSuccess: (data) => {
        if (data && data["ygtang-refresh"]) {
          reissue({ refreshToken: data["ygtang-refresh"] });
        }
      },
      onError: (e) => {
        console.log("err", e);
        setIsLoggedIn(false);
      },
    },
  );

  return {
    isLoggedIn,
    error,
    login,
    isLoading: reissueLoading || tokenLoading,
    isLoginLoading: loginLoading,
    tokenRecheck: refetch,
  };
}
