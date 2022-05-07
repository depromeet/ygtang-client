import Cookie from 'js-cookie';

import { IS_PRODUCTION } from '~/constants/common';

export default function useCookie() {
  const handleSet = (key: string, value: any) => {
    Cookie.set(key, value, {
      sameSite: 'Lax',
      secure: IS_PRODUCTION,
    });
  };

  return {
    get: Cookie.get,
    set: handleSet,
    remove: Cookie.remove,
  };
}
