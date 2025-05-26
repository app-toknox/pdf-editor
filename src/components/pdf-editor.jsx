import { useEventListener } from "../hooks/use-event-listener";
import { usePDFStore } from "../hooks/usePdf";
import { useToolManager } from "../hooks/useToolManager";
import { ELEMENT_TYPES } from "../types/element-types";
import { InputPdfFile } from "./input-pdf-file";
import { Layout } from "./layout";
import { NewDraggableItem } from "./new-draggable-item";
import { PdfExport } from "./pdf-export";
import { PdfViewer } from "./pdf-viewer";
export const PdfEditor = () => {
  const setPDFFile = usePDFStore((state) => state.setPDFFile);
  const pdfFile = usePDFStore((state) => state.pdfFile);
  const pageNumber = usePDFStore((state) => state.pageNumber);

  useEventListener();

  const {
    items,
    handleSelection,
    editingItem,
    handleDropData,
    editingTemplates,
  } = useToolManager();

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
    const x = e.clientX - rect.left - 85;
    const y = e.clientY - rect.top - 42.5;

    handleDropData(type, x, y, pageNumber);
  };
  return (
    <Layout>
      <div className="flex  w-full items-center flex-col gap-4 my-8 overflow-scroll">
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
        <PdfExport pdf={pdfFile} />

        {/* Qui mostro il form se attivo */}
        {editingItem && <FormElement />}
      </div>
    </Layout>
  );
};
