import { PropsWithChildren, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  isShowing: boolean;
}

export function PortalWrapper({
  children,
  isShowing,
}: PropsWithChildren<ModalWrapperProps>) {
  const container = typeof window !== "undefined" && document.body;

  return container ? (
    (createPortal(
      <AnimatePresence mode="wait">{isShowing && children}</AnimatePresence>,
      container,
    ) as ReactNode)
  ) : (
    <></>
  );
}
