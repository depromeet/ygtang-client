import { PropsWithChildren } from 'react';

import { useUser } from './';

export function UserProvider({ children }: PropsWithChildren<unknown>) {
  const {} = useUser();
  return <>{children}</>;
}
