import { useEffect } from "react";

import { useToolManager } from "./useToolManager";

export const useEventListener = () => {
  const { selectItem, handleDelete, handleCopy, handlePaste } =
    useToolManager();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const active = document.activeElement;
      const isEditing = active.getAttribute("contenteditable") === "true";

      //if (isEditing) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        handleCopy();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault();
        handlePaste();
      }

      if ((e.key === "Delete" || e.key === "Backspace") && !isEditing) {
        e.preventDefault();
        handleDelete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCopy, handleDelete, handlePaste, selectItem]);
};
