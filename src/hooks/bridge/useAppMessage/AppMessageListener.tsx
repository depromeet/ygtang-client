import { PropsWithChildren, useEffect } from 'react';

import { useAppMessage } from './useAppMessage';

export function AppMessageListener({ children }: PropsWithChildren<unknown>) {
  const { startListening, stopListening } = useAppMessage();

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
