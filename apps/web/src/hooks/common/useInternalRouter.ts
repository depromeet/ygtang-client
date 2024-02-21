import { useRouter } from "next/compat/router";
import type { UrlObject } from "url";

export type RouterPathType =
  | `/`
  | "/onboard"
  | "/test"
  | "/add/link"
  | "/add/text"
  | "/add/image"
  | "/add/tag"
  | "/edit/tag"
  | "/my"
  | "/my/tag"
  | "/my/account"
  | "/my/account/change-password"
  | "/my/account/change-nickname"
  | "/login"
  | "/signup"
  | "/signup/sent-email"
  | "/signup/email-verified"
  | "/signup/information"
  | "/password";

export function useInternalRouter() {
  const router = useRouter();

  if (!router) {
    throw new Error(
      "useInternalRouter must be used under Next.js Pages Router",
    );
  }

  return {
    router,
    async push(
      path: RouterPathType,
      as?: UrlObject | string,
      options?: TransitionOptions,
    ) {
      return router.push(path, as, options);
    },
    async scrollPreventedPush(
      path: RouterPathType,
      as?: UrlObject | string,
      options?: Omit<TransitionOptions, "scroll">,
    ) {
      return router.push(path, as, { ...options, scroll: false });
    },
  };
}

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
}
