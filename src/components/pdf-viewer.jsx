import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Document, Page } from "react-pdf";

import { Loader } from "@/components/loading";
import { usePDFStore } from "@/hooks/usePdf";

export const PdfViewer = ({ pdf }) => {
  const { pageNumber, options, setPdfWrapperRef, onDocumentLoadSuccess } =
    usePDFStore();

  return (
    <div className="flex flex-col gap-8">
      {pdf ? (
        <>
          <div
            className="relative z-10 max-w-2xl shadow-2xl"
            id="pdf"
            ref={(el) => {
              setPdfWrapperRef(el);
            }}
          >
            {/* logica per droppable element */}
            <Document
              options={options}
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="w-full flex items-center justify-center ">
                  <Loader />
                </div>
              }
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        </>
      ) : null}
    </div>
  );
};
