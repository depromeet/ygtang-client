import { useEffect, useState } from "react";
import { localStorageUserTokenKeys } from "@ygtang/constants";

import { ADD_ROUTES, PUBLIC_ROUTES } from "~/constants/routes";

import { useInternalRouter } from "./useInternalRouter";
import { useLoginRedirect } from "./useLoginRedirect";

interface UseRouterGuardProps {
  isLoaded: boolean;
}

export function useRouterGuard({ isLoaded }: UseRouterGuardProps) {
  const [isRouterGuardPassed, setIsRouterGuardPassed] =
    useState<boolean>(false);
  const { router } = useInternalRouter();
  const { setRedirect } = useLoginRedirect();

  useEffect(() => {
    const authCheck = (url: string) => {
      if (!isLoaded) return;

      const isLoggedIn = Boolean(
        localStorage.getItem(localStorageUserTokenKeys.accessToken),
      );
      if (isLoggedIn) {
        // 로그인 시 모든 route 접근 가능
        setIsRouterGuardPassed(true);
        return;
      }

      const path = url.split("?")[0] ?? "";
      if (!PUBLIC_ROUTES.includes(path)) {
        if (ADD_ROUTES.includes(path)) {
          setRedirect(path);
        }
        router.push("/onboard");
      } else {
        // 로그인을 하지 않았으며, 퍼블릭 route에 방문시 패스 인증
        setIsRouterGuardPassed(true);
      }
    };

    authCheck(router.asPath);
    router.events.on("routeChangeStart", authCheck);

    return () => {
      router.events.off("routeChangeStart", authCheck);
    };
  }, [isLoaded, router, setRedirect]);

  return { isRouterGuardPassed };
}
