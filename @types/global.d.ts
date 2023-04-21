declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage(msg: string): void;
    };
    mixpanel: {
      track(event_name: string, ...props: unknown): void;
      identify(userId: string): void;
    };
  }
}

export {};
