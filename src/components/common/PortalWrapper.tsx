import { PropsWithChildren } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface ModalWrapperProps {
  isShowing: boolean;
}

export default function PortalWrapper({
  children,
  isShowing,
}: PropsWithChildren<ModalWrapperProps>) {
  const container = typeof window !== 'undefined' && document.body;

  return container ? (
    createPortal(<AnimatePresence mode="wait">{isShowing && children}</AnimatePresence>, container)
  ) : (
    <></>
  );
}
