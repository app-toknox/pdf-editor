import { useEffect, useState } from "react";

export default function useDraggableItems(openEditForm) {
  const [items, setItems] = useState([]);
  const [numberItems, setNumberItems] = useState([]);
  const [selectItem, setSelectItem] = useState(null);
  const [copiedItem, setCopiedItem] = useState(null);

  // DROP & COUNT
  const handleOnDrop = (droppedItem) => {
    setItems((prev) => [...prev, droppedItem]);
    setNumberItems((prev) => {
      const exists = prev.find((i) => i.data === droppedItem.data);
      if (exists) {
        return prev.map((i) =>
          i.data === droppedItem.data ? { ...i, number: i.number + 1 } : i,
        );
      } else {
        openEditForm(droppedItem.id);
        return [...prev, { data: droppedItem.data, number: 1 }];
      }
    });
    setSelectItem(droppedItem);
  };

  // DRAG/RESIZE/REMOVE
  const updateItem = (itemId, changes) =>
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, ...changes } : i)),
    );
  const handleDragStop = (id, x, y) => updateItem(id, { x, y });
  const handleResizeStop = (id, width, height, x, y) =>
    updateItem(id, { width, height, x, y });
  const handleRemove = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  // SELECTION
  const handleSelection = (item) => setSelectItem(item);

  // COPY / PASTE / DELETE
  const handleCopy = () => selectItem && setCopiedItem(selectItem);
  const handlePaste = () => {
    if (!copiedItem) return;
    const newItem = {
      ...copiedItem,
      id: `${copiedItem.data}-${Date.now()}`,
      x: copiedItem.x + 20,
      y: copiedItem.y + 20,
    };
    setItems((prev) => [...prev, newItem]);
    setSelectItem(newItem);
    setCopiedItem(newItem);
  };
  const handleDelete = () => {
    if (!selectItem) return;
    setItems((prev) => prev.filter((i) => i.id !== selectItem.id));
    setSelectItem(null);
  };

  // KEYBOARD SHORTCUTS
  useEffect(() => {
    const onKeyDown = (e) => {
      const cmd = e.ctrlKey || e.metaKey;
      if (cmd && e.key === "c") {
        e.preventDefault();
        handleCopy();
      }
      if (cmd && e.key === "v") {
        e.preventDefault();
        handlePaste();
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        handleDelete();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectItem, copiedItem]);

  return {
    items,
    numberItems,
    selectItem,
    copiedItem,
    handleOnDrop,
    handleDragStop,
    handleResizeStop,
    handleRemove,
    handleSelection,
    handleCopy,
    handlePaste,
    handleDelete,
  };
}
