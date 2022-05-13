import { DependencyList, useEffect, useRef } from 'react';

export default function useDidUpdate(callback: VoidFunction, dependencyList: DependencyList) {
  const didMountRef = useRef<boolean>(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencyList]);
}
