import { useEffect } from "react";

import { useManagerZustand } from "../hooks/useManagerZustand";

export const EditorWrapper = ({ children }) => {
  const { selectItem, handleDelete, handleCopy, handlePaste } =
    useManagerZustand();

  useEffect(() => {
    const handleKeyDown = (e) => {
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
  }, [selectItem]);
  return <div>{children}</div>;
};
