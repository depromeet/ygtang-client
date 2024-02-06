export function sendToast(tabId: number, message: string, type = "error") {
  chrome.tabs.sendMessage(
    tabId,
    {
      name: "show-toast",
      data: {
        type,
        message,
      },
    },
    (_e) => {
      const lastError = chrome.runtime.lastError;
      if (lastError) {
        // message 전송 오류 시
        if (lastError.message?.includes("message port closed")) {
          // eslint-disable-next-line no-console
          console.log("Toast Error: ", lastError);
        }
        return;
      }
    },
  );
}
