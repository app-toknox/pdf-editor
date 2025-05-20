import { useState } from "react";

import { InputPdfFile } from "../components/input-pdf-file";
import { NewDraggableItem } from "../components/new-draggable-item";
import { PdfViewer } from "../components/pdf-viewer";
import { useManagerZustand } from "../hooks/useManagerZustand";
import { ELEMENT_TYPES } from "../types/element-types";

export const Home = () => {
  const [pdf, setPdf] = useState();

  const {
    items,
    handleSelection,
    editingItem,
    handleDropData,
    editingTemplates,
  } = useManagerZustand();

  const FormElement = editingItem
    ? ELEMENT_TYPES[editingItem.type]?.form
    : editingTemplates;

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("application/json");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    handleDropData(type, x, y);
  };
  return (
    <div className="flex w-full items-center flex-col gap-4 my-8">
      <h1 className="text-3xl font-bold text-gray-800 items-center">
        PDF EDITOR TOKNOX DEMO
      </h1>
      <InputPdfFile setPdf={setPdf} />

      {/* Questo è il mio container che sarà poi PDFviewer */}
      <div
        className="z-40 relative border-2 w-200 h-200"
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onClick={() => handleSelection(null)}
      >
        <PdfViewer pdf={pdf} />
        <div className="absolute inset-0 z-50">
          {items.map((item) => (
            <NewDraggableItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Qui mostro il form se attivo */}
      {editingItem && <FormElement />}
    </div>
  );
};
