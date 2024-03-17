import { useRouter } from "next/compat/router";
import { sessionStorageRedirectKey } from "@ygtang/constants";

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
    router && router.replace(redirect);
    sessionStorage.removeItem(sessionStorageRedirectKey);
  };

  return { getRedirect, setRedirect, goRedirect };
}
