import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function WithUpdatedRouterGard({ children }: Props): JSX.Element {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);
  }, [router.asPath]);

  const authCheck = (url: string) => {
    const publicRoutes = ['/password', '/signup', '/login'];
    const path = url.split('?')[0];

    if (!publicRoutes.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  };

  return authorized ? children : <></>;
}

export interface Props {
  children: JSX.Element;
}
