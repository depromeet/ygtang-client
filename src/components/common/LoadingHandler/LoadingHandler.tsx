import React, { PropsWithChildren, ReactElement, useId } from 'react';
import { AnimatePresence } from 'framer-motion';

interface LoadingHandler {
  isLoading: boolean;
  loadingComponent: ReactElement;
}

function LoadingHandler({
  children,
  isLoading,
  loadingComponent,
}: PropsWithChildren<LoadingHandler>) {
  const id = useId();

  return (
    <AnimatePresence exitBeforeEnter>
      {isLoading ? <React.Fragment key={id}>{loadingComponent}</React.Fragment> : children}
    </AnimatePresence>
  );
}

export default LoadingHandler;
