import { useState } from "react";

import { InputPdfFile } from "../components/input-pdf-file";
import { NewDraggableItem } from "../components/new-draggable-item";
import { PdfViewer } from "../components/pdf-viewer";
import useItemManager from "../hooks/useItemManager";
import { ELEMENT_TYPES } from "../types/element-types";

export const Home = () => {
  const [pdf, setPdf] = useState();

  // QUESTO DOPO ANDRA' IN HOOKS APPOSTA
  const [items, setItems] = useState([]);

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    //const { type } = JSON.parse(data);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
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
    setItems((prev) => [...prev, newItem]);
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
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // richaimo hook per form
  const { editingItemId, openEditForm, closeEditForm, editItem } =
    useItemManager();
  const editingItem = items.find((i) => i.id === editingItemId);
  const FormElement = editingItem
    ? ELEMENT_TYPES[editingItem.type]?.form
    : null;

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
          />
        ))}
      </div>

      {/* Qui mostro il form se attivo */}
      {editingItemId && <FormElement onClose={closeEditForm} />}
    </div>
  );
};
