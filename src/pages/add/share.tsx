import { useCallback } from 'react';

import { AppMessageListener } from '~/hooks/bridge/useAppMessage';

export default function AddShare() {
  const handleMessage = useCallback((action: string, data?: any) => {
    console.log('action: ', action, ' data: ', data);
  }, []);

  return <AppMessageListener handler={handleMessage}></AppMessageListener>;
}
