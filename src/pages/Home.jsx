import { InputPdfFile } from "../components/input-pdf-file";
import { NewDraggableItem } from "../components/new-draggable-item";
import { PdfViewer } from "../components/pdf-viewer";
import { useManagerZustand } from "../hooks/useManagerZustand";
import { usePDFStore } from "../hooks/usePdf";
import { ELEMENT_TYPES } from "../types/element-types";

export const Home = () => {
  const setPDFFile = usePDFStore((state) => state.setPDFFile);
  const pdfFile = usePDFStore((state) => state.pdfFile);
  const pageNumber = usePDFStore((state) => state.pageNumber);
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

    handleDropData(type, x, y, pageNumber);
  };
  return (
    <div className="flex w-full items-center flex-col gap-4 my-8">
      <h1 className="text-3xl font-bold text-gray-800 items-center">
        PDF EDITOR TOKNOX DEMO
      </h1>
      <InputPdfFile setPdf={setPDFFile} />

      {/* Questo è il mio container che sarà poi PDFviewer */}
      <div
        className="z-40 relative"
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onClick={() => handleSelection(null)}
      >
        <PdfViewer pdf={pdfFile} />
        <div className="absolute inset-0 z-50">
          {items
            .filter((item) => item.page === pageNumber)
            .map((item) => (
              <NewDraggableItem key={item.id} item={item} />
            ))}
        </div>
      </div>

      {/* Qui mostro il form se attivo */}
      {editingItem && <FormElement />}
    </div>
  );
};
