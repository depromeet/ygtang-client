import { PropsWithChildren, useEffect } from 'react';

import { AppMessageArgs, useAppMessage } from './useAppMessage';

export function AppMessageListener({
  children,
  handler,
  targetType,
}: PropsWithChildren<AppMessageArgs>) {
  const { startListening, stopListening } = useAppMessage({ handler, targetType });

  useEffect(() => {
    if (startListening) {
      startListening();
      return () => {
        stopListening();
      };
    }
  }, [startListening, stopListening]);

  return <>{children}</>;
}
