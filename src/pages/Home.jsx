import { useState } from "react";

import { InputPdfFile } from "../components/input-pdf-file";
import { NewDraggableItem } from "../components/new-draggable-item";
import { PdfViewer } from "../components/pdf-viewer";
import useDraggableItems from "../hooks/useDraggableItems";
import useItemManager from "../hooks/useItemManager";
import { ELEMENT_TYPES } from "../types/element-types";

export const Home = () => {
  const [pdf, setPdf] = useState();

  const {
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
  } = useDraggableItems();
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
