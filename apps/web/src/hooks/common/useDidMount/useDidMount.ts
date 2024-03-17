import { EffectCallback, useEffect, useRef } from "react";

export function useDidMount(effectCallback: EffectCallback) {
  const didMountRef = useRef<boolean>(false);

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;
    effectCallback();
  }, [effectCallback]);
}
