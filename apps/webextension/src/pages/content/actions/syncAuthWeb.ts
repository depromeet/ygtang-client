import { localStorageExtensionKeys } from "@ygtang/constants";

export function syncAuthWeb() {
  if (
    window.location.hostname !== "app.ygtang.kr" &&
    window.location.hostname !== "localhost"
  ) {
    return;
  }
  localStorage.setItem(localStorageExtensionKeys.use, "true");
  chrome.storage.onChanged.addListener((changes) => {
    for (const [key, { newValue }] of Object.entries(changes)) {
      if (key === localStorageExtensionKeys.refreshToken) {
        if (newValue === "undefined" || newValue === undefined) {
          localStorage.removeItem(localStorageExtensionKeys.refreshToken);
        } else {
          localStorage.setItem(
            localStorageExtensionKeys.refreshToken,
            newValue,
          );
        }
      }
    }
  });
}

syncAuthWeb();
