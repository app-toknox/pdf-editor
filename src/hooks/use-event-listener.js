import { useEffect } from "react";

import { useToolManager } from "@/hooks/useToolManager";

export const useEventListener = () => {
  const { selectItem, handleDelete, handleCopy, handlePaste } =
    useToolManager();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const active = document.activeElement;
      // Blocca le shortcut globali se il focus è su un input, textarea o contenteditable
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable)
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        handleCopy();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault();
        handlePaste();
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        handleDelete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCopy, handleDelete, handlePaste, selectItem]);

  // Cleanup function to remove event listeners
  const cleanupEventListeners = () => {};

  return { cleanupEventListeners };
};
