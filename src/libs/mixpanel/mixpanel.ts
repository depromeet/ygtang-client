function callWhenMixpanelReady(callback: VoidFunction) {
  try {
    if (window?.mixpanel) {
      callback();
    }
  } catch (e) {
    console.error(e);
  }
}

export function mixpanelTrack(event_name: string, ...props: any) {
  callWhenMixpanelReady(() => {
    window.mixpanel.track(event_name, props);
  });
}

export function setMixpanelIdentify(userId: string) {
  callWhenMixpanelReady(() => {
    window.mixpanel.identify(userId);
  });
}
