import React, { PropsWithChildren, ReactElement, useId } from 'react';
import { AnimatePresence } from 'framer-motion';

interface LoadingHandlerProps {
  isLoading: boolean;
  loadingComponent: ReactElement;
}

function LoadingHandler({
  children,
  isLoading,
  loadingComponent,
}: PropsWithChildren<LoadingHandlerProps>) {
  const id = useId();

  return (
    <AnimatePresence exitBeforeEnter>
      {isLoading ? <React.Fragment key={id}>{loadingComponent}</React.Fragment> : children}
    </AnimatePresence>
  );
}

export default LoadingHandler;
