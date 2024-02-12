import { handleImage } from "./actions/handleImage";
import { handleLink } from "./actions/handleLink";
import { registerToContextMenu } from "./helpers/registerToContextMenu";
import { sendToast } from "./helpers/sendToast";

registerToContextMenu();

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab || !tab.id) {
    return;
  }
  try {
    if (info.menuItemId === "handle-link") {
      await handleLink(tab, info);
    }
    if (info.menuItemId === "handle-image") {
      await handleImage(tab, info);
    }
  } catch (e) {
    sendToast(tab.id, "알 수 없는 오류가 발생했어요.", "error");
  }
});

// chrome.runtime.onMessage.addListener((message) => {
//   console.log(message);
// });

// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (const key in changes) {
//     const storageChange = changes[key];
//     console.log(
//       'Storage key "%s" in namespace "%s" changed. ' +
//         'Old value was "%s", new value is "%s".',
//       key,
//       namespace,
//       storageChange.oldValue,
//       storageChange.newValue,
//     );
//   }
// });
