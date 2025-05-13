import { useState } from "react";
import { useEffect } from "react";

import { InputPdfFile } from "../components/input-pdf-file";
import { NewDraggableItem } from "../components/new-draggable-item";
import { PdfViewer } from "../components/pdf-viewer";
import useItemManager from "../hooks/useItemManager";
import { ELEMENT_TYPES } from "../types/element-types";

export const Home = () => {
  const [pdf, setPdf] = useState();
  const [items, setItems] = useState([]);
  const [configuredTemplates, setConfiguredTemplates] = useState([]); //questo solo per la prima volta;
  // richaimo hook per form
  const {
    editingItemId,
    openEditForm,
    closeEditForm,
    editItem,
    submitEditForm,
  } = useItemManager({
    items,
    setItems,
    setConfiguredTemplates,
  });
  const editingItem = items.find((i) => i.id === editingItemId);
  const FormElement = editingItem
    ? ELEMENT_TYPES[editingItem.type]?.form
    : null;

  // QUESTO DOPO ANDRA' IN HOOKS APPOSTA
  const [, setNumberItems] = useState([]);
  const [selectItem, setSelectItem] = useState(null);
  const [copiedItem, setCopiedItem] = useState(null);

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // c'è gia sui template?
    const isAlreadyConfigured = configuredTemplates.find(
      (item) => item.data === data,
    );
    if (isAlreadyConfigured) {
      const newItem = {
        id: `${data}-${Date.now()}`,
        type: data,
        data,
        x,
        y,
        width: 170,
        height: 50,
        payload: isAlreadyConfigured.payload,
      };
      console.log(newItem);
      setItems((prev) => [...prev, newItem]);
      handleNumberItems(newItem);
      handleSelection(newItem);
    } else {
      const newItem = {
        id: `${data}-${Date.now()}`,
        type: data,
        data,
        x,
        y,
        width: 170,
        height: 50,
        payload: "",
      };
      setConfiguredTemplates((prev) => [...prev, newItem]);
      setItems((prev) => [...prev, newItem]);
      handleNumberItems(newItem);
      handleSelection(newItem);
      openEditForm(newItem.id);
    }
  };

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
  }, [selectItem, copiedItem, items]);

  return (
    <div className="flex w-full items-center flex-col gap-4 my-8">
      <h1 className="text-2xl">PDF EDITOR TOKNOX DEMO</h1>
      <InputPdfFile setPdf={setPdf} />
      <PdfViewer pdf={pdf} />

      {/* Questo è il mio container che sarà poi PDFviewer */}
      <div
        className="w-200 h-screen border-2"
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
      >
        {/* qui gestisco il child component */}
        {items.map((item) => (
          <NewDraggableItem
            key={item.id}
            item={item}
            onDragStop={handleDragStop}
            onResize={handleResizeStop}
            onRemove={handleRemove}
            openEditForm={openEditForm}
            editItem={editItem}
            selectItem={selectItem}
            handleSelection={handleSelection}
          />
        ))}
      </div>

      {/* Qui mostro il form se attivo */}
      {editingItemId && (
        <FormElement
          onClose={closeEditForm}
          onSubmit={submitEditForm}
          item={editingItemId}
        />
      )}
    </div>
  );
};
