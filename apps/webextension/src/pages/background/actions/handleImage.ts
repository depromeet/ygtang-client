import { createInspiration } from "@ygtang/api";

import { fileDownload } from "~/utils/fileDownload";

import { getAuth } from "../helpers/getAuth";
import { sendToast } from "../helpers/sendToast";

export const handleImage = async (
  tab: chrome.tabs.Tab,
  info: chrome.contextMenus.OnClickData,
) => {
  if (!tab || !tab.id) {
    throw new Error("tab is not defined");
  }
  const { accessToken, isAuth } = await getAuth(tab.id);
  if (!isAuth) return;

  if (!info.srcUrl) {
    sendToast(tab.id, "선택한 이미지 데이터를 가져오지 못했어요.", "error");
    return;
  }

  const { file, ext } = await fileDownload(info.srcUrl);
  const imgData = new FormData();
  imgData.append("file", file, `image-${new Date().getTime()}.${ext}`);
  imgData.append("memo", "");
  imgData.append("type", "IMAGE");
  imgData.append("tagIds", [].toString());

  try {
    await createInspiration({
      accessToken,
      data: imgData,
    });
    sendToast(tab.id, "이미지를 성공적으로 보냈어요.", "success");
  } catch (e) {
    sendToast(
      tab.id,
      "이미지를 영감탱에 업로드하지 못했어요.\n이미지가 올바르지 않거나, 크기가 너무 크진 않은지 확인해주세요.",
      "error",
    );
  }
};
