import { Component, PropsWithChildren, ReactNode } from 'react';
import { captureException } from '@sentry/nextjs';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMsg: string | null;
}

export class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMsg: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error: Error) {
    captureException(error);
    console.error('Uncaught error:', error.message);
  }

  render() {
    const { hasError, errorMsg } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) return fallback;
      // TODO: 에러 화면 디자인 적용
      return <h1>error : {errorMsg}</h1>;
    }

    return children;
  }
}
