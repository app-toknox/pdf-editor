import { useEffect, useState } from "react";

function useDraggableItems() {
  const [items, setItems] = useState([]);
  const [configuredTemplates, setConfiguredTemplates] = useState([]); //questo solo per la prima volta;
  const [numberItems, setNumberItems] = useState([]);
  const [selectItem, setSelectItem] = useState(null);
  const [copiedItem, setCopiedItem] = useState(null);

  const handleDragStop = (itemId, x, y) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, x, y } : item)),
    );
  };

  const handleResizeStop = (itemId, width, height, x, y) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, width, height, x, y } : item,
      ),
    );
  };

  const handleRemove = (itemId) => {
    const removedItem = items.find((item) => item.id === itemId);
    if (removedItem) {
      decrementNumberItems(removedItem);
    }
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleNumberItems = (droppedItem) => {
    setNumberItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.data === droppedItem.data,
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.data === droppedItem.data
            ? { ...item, number: item.number + 1 }
            : item,
        );
      } else {
        return [...prevItems, { data: droppedItem.data, number: 1 }];
      }
    });
  };

  const decrementNumberItems = (removedItem) => {
    setNumberItems((prevItems) => {
      return prevItems
        .map((item) =>
          item.data === removedItem.data
            ? { ...item, number: item.number - 1 }
            : item,
        )
        .filter((item) => item.number > 0); // rimuove gli item con numero 0
    });
  };

  const handleSelection = (item) => {
    setSelectItem(item);
  };

  // Comportamenti da tastiera
  const handleCopy = () => {
    if (selectItem) {
      setCopiedItem(selectItem);
    }
  };

  const handlePaste = () => {
    if (copiedItem) {
      const newItem = {
        ...copiedItem,
        id: `${copiedItem.data}-${Date.now()}`,
        x: copiedItem.x + 20,
        y: copiedItem.y + 20,
      };
      setItems((prev) => [...prev, newItem]);
      setSelectItem(newItem);
      setCopiedItem(newItem);
    }
  };

  const handleDelete = () => {
    if (selectItem) {
      setItems((prev) => prev.filter((item) => item.id !== selectItem.id));
      setSelectItem(null);
    }
  };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if ((e.ctrlKey || e.metaKey) && e.key === "c") {
  //       e.preventDefault();
  //       handleCopy();
  //     }

  //     if ((e.ctrlKey || e.metaKey) && e.key === "v") {
  //       e.preventDefault();
  //       handlePaste();
  //     }

  //     if (e.key === "Delete" || e.key === "Backspace") {
  //       e.preventDefault();
  //       handleDelete();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectItem, copiedItem, items]);


  return {
    items,
    setItems,
    configuredTemplates,
    setConfiguredTemplates,
    handleDragStop,
    handleResizeStop,
    handleRemove,
    handleNumberItems,
    selectItem,
    handleSelection,
  };
}

export default useDraggableItems;
