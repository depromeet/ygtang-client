import { EffectCallback, useEffect, useRef } from 'react';

export default function useDidMount(effectCallback: EffectCallback) {
  const didMountRef = useRef<boolean>(false);

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;
    effectCallback();
  }, [effectCallback]);
}
