import { createInspiration } from "@ygtang/api";

import { getAuth } from "../helpers/getAuth";
import { sendToast } from "../helpers/sendToast";

export const handleLink = async (
  tab: chrome.tabs.Tab,
  info: chrome.contextMenus.OnClickData,
) => {
  if (!tab.id) return;
  const { accessToken, isAuth } = await getAuth(tab.id);
  if (!isAuth) return;

  const imgData = new FormData();
  imgData.append("content", info.linkUrl as string);
  imgData.append("memo", "");
  imgData.append("type", "LINK");
  imgData.append("tagIds", [].toString());

  try {
    await createInspiration({
      accessToken,
      data: imgData,
    });
    sendToast(tab.id, "링크를 성공적으로 보냈어요.", "success");
  } catch (e) {
    sendToast(tab.id, "링크를 영감탱에 전송하지 못했어요.", "error");
  }
};
