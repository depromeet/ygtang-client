import { get, remove, set } from 'js-cookie';

import { IS_PRODUCTION } from '~/constants/common';

export default function useCookie() {
  const handleSet = (key: string, value: any) => {
    set(key, value, {
      sameSite: 'Lax',
      secure: IS_PRODUCTION,
    });
  };

  return {
    get,
    set: handleSet,
    remove,
  };
}
