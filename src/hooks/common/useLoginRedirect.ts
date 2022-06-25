import { useRouter } from 'next/router';

import { sessionStorageRedirectKey } from '~/constants/sessionStorage';

export function useLoginRedirect() {
  const router = useRouter();
  const getRedirect = (): string | null => {
    return sessionStorage.getItem(sessionStorageRedirectKey);
  };

  const setRedirect = (path: string) => {
    sessionStorage.setItem(sessionStorageRedirectKey, path);
  };

  const goRedirect = () => {
    const redirect = getRedirect();
    if (!redirect) return;
    router.replace(redirect);
    sessionStorage.removeItem(sessionStorageRedirectKey);
  };

  return { getRedirect, setRedirect, goRedirect };
}
