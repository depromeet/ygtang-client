import { reissue } from "@ygtang/api";
import { setAccessToken } from "@ygtang/http";

import { sendToast } from "./sendToast";

export async function getAuth(tabId: number) {
  const data = await chrome.storage.local.get("ygtang-refresh");

  if (data["ygtang-refresh"]) {
    const refreshToken = data["ygtang-refresh"];
    try {
      const data = await reissue({ refreshToken });
      setAccessToken(data.data.accessToken);
      chrome.storage.local.set({
        "ygtang-refresh": data.data.refreshToken,
      });
      return {
        isAuth: true,
        accessToken: data.data.accessToken,
        refresh: refreshToken,
      };
    } catch (e) {
      sendToast(
        tabId,
        "세션이 올바르지 않아 로그인하지 못했습니다.\n우측 상단의 '확장'을 통해 영감탱에 로그인해주세요.",
        "error",
      );
      return { isAuth: false };
    }
  }

  sendToast(
    tabId,
    "로그인이 필요합니다.\n우측 상단의 '확장'을 통해 영감탱에 로그인해주세요.",
    "error",
  );

  return {
    isAuth: false,
  };
}
