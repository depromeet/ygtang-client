export function registerToContextMenu() {
  chrome.contextMenus.create({
    id: "handle-link",
    title: "영감탱에 해당 링크 담기",
    contexts: ["link"],
  });
  chrome.contextMenus.create({
    id: "handle-image",
    title: "영감탱에 해당 이미지 담기",
    contexts: ["image"],
  });
}
