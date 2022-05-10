import { NextPageContext } from 'next';
import * as Sentry from '@sentry/nextjs';

interface ErrorPageProps {
  statusCode?: number;
  hasGetInitialPropsRun?: boolean;
  err: NextPageContext['err'];
}

function ErrorPage({ statusCode, hasGetInitialPropsRun, err }: ErrorPageProps): JSX.Element {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps가 호출되지 않았을 시
    // https://github.com/vercel/next.js/issues/8592
    Sentry.captureException(err);
  }

  // TODO: 에러 페이지 디자인
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  );
}

ErrorPage.getInitialProps = async ({ res, err, asPath }: NextPageContext) => {
  const hasGetInitialPropsRun = true;
  let statusCode = 404;
  if (res?.statusCode) statusCode = res.statusCode;
  else if (err?.statusCode) statusCode = err.statusCode;

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return { statusCode, hasGetInitialPropsRun, err };
  }

  Sentry.captureException(new Error(`${asPath}에서 _error.js getInitialProps 누락`));
  await Sentry.flush(2000);
  return { statusCode, hasGetInitialPropsRun, err };
};

export default ErrorPage;
