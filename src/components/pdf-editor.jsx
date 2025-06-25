import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { useEffect } from "react";

import { Layout } from "@/components/layout";
import { NewDraggableItem } from "@/components/new-draggable-item";
import { PdfExport } from "@/components/pdf-export";
import { PdfViewer } from "@/components/pdf-viewer";
import { useCleanup } from "@/hooks/use-cleanup";
import { useEventListener } from "@/hooks/use-event-listener";
import { usePDFStore } from "@/hooks/usePdf";
import { useToolManager } from "@/hooks/useToolManager";
import { messages as enMessages } from "@/locales/en/messages";
import { messages as itMessages } from "@/locales/it/messages";
import { ELEMENT_TYPES } from "@/types/element-types";
import { cn } from "@/utils/index";

export const PdfEditor = ({ pdfFile, handleExport, className, locale }) => {
  const { pageNumber, setPDFFile } = usePDFStore();
  
  i18n.load({
    en: enMessages,
    it: itMessages,
  });
  i18n.activate(locale || "en");
  
  useEventListener();
  useCleanup(); // Handle cleanup when component unmounts

  useEffect(() => {
    if (pdfFile) {
      setPDFFile(pdfFile);
    }
  }, [pdfFile, setPDFFile]);

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
    <I18nProvider i18n={i18n}>
      <Layout exportPdf={<PdfExport pdf={pdfFile} onExport={handleExport} />}>
        <div
          className={cn(
            "flex w-full items-center flex-col gap-4 my-8 overflow-scroll",
            className,
          )}
        >
          <h1 className="text-3xl font-semibold text-gray-800 items-center">
            <Trans>PDF EDITOR TOKNOX</Trans>
          </h1>

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
      </Layout>
    </I18nProvider>
  );
};
