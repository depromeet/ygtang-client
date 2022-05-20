import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

export type RouterPathType =
  | `/`
  | '/onboard'
  | '/test'
  | '/add/link'
  | '/add/text'
  | '/add/image'
  | '/add/tag'
  | '/my'
  | '/my/tag'
  | '/login'
  | '/signup'
  | '/signup/sent-email'
  | '/signup/email-verified'
  | '/password';

export default function useInternalRouter() {
  const router = useRouter();

  return useMemo(() => {
    return {
      ...router,
      push(path: RouterPathType, as?: UrlObject | string, options?: TransitionOptions) {
        router.push(path, as, options);
      },
      scrollPreventedPush(
        path: RouterPathType,
        as?: UrlObject | string,
        options?: Omit<TransitionOptions, 'scroll'>
      ) {
        router.push(path, as, { ...options, scroll: false });
      },
    };
  }, [router]);
}

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
}
