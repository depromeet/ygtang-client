export function syncAuthWeb() {
  if (
    window.location.hostname !== "app.ygtang.kr" &&
    window.location.hostname !== "localhost"
  ) {
    return;
  }
  localStorage.setItem("use-ygtang-extension", "true");
  chrome.storage.onChanged.addListener((changes) => {
    for (const [key, { newValue }] of Object.entries(changes)) {
      if (key === "ygtang-refresh") {
        if (newValue === "undefined" || newValue === undefined) {
          localStorage.removeItem("ygte-refresh");
        } else {
          localStorage.setItem("ygte-refresh", newValue);
        }
      }
    }
  });
}

syncAuthWeb();
