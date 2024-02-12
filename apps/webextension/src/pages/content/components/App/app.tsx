import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messageListener = (message: any) => {
    if (!("name" in message) || !("data" in message)) {
      return;
    }
    const { name, data } = message;

    if (name === "show-toast") {
      if (data.type === "success") {
        toast.success(data.message);
      }
      if (data.type === "error") {
        toast.error(data.message);
      }
      if (data.type === "default") {
        toast(data.message);
      }
    }
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(messageListener);
    () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <div className="ygt-extension-container">
      <Toaster />
    </div>
  );
}
