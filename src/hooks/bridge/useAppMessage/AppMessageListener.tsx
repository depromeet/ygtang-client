import { PropsWithChildren, useEffect } from 'react';

import { AppMessageArgs, useAppMessage } from './useAppMessage';

export function AppMessageListener({ children, handler }: PropsWithChildren<AppMessageArgs>) {
  const { startListening, stopListening } = useAppMessage({ handler });

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
