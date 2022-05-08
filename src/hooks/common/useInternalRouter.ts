import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

export type RouterPathType =
  | `/`
  | '/test'
  | '/add/link'
  | '/add/text'
  | '/add/image'
  | '/add/tag'
  | '/my'
  | '/my/tag';

export default function useInternalRouter() {
  const router = useRouter();

  return useMemo(() => {
    return {
      ...router,
      push(path: RouterPathType, as?: UrlObject | string, options?: TransitionOptions) {
        router.push(path, as, options);
      },
    };
  }, [router]);
}

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
}
