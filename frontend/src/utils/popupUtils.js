import React, { useCallback } from "react";

export function handleOverlayClose(onClose) {
  return (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
}

export function useEscClose(onClose, isOpen) {
  const handleEscClose = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, handleEscClose]);
}
