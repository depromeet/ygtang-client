import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function WithRouterGard({ children }: Props): JSX.Element {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  const hideContent = () => {
    setAuthorized(false);
  };

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
