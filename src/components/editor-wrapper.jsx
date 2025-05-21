import { useEffect } from "react";

import { useManagerZustand } from "../hooks/useManagerZustand";

export const EditorWrapper = ({ children }) => {
  const { selectItem, handleDelete, handleCopy, handlePaste } =
    useManagerZustand();

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
  }, [selectItem]);
  return (
    <div className="flex-1 flex flex-col items-center w-full">{children}</div>
  );
};
