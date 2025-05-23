import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Document, Page } from "react-pdf";

import { usePDFStore } from "../hooks/usePdf";
import { Loader } from "./loading";

export const PdfViewer = ({ pdf }) => {
  const pageNumber = usePDFStore((state) => state.pageNumber);
  const onDocumentLoadSuccess = usePDFStore(
    (state) => state.onDocumentLoadSuccess,
  );
  const options = usePDFStore((state) => state.options);
  const setPdfWrapperRef = usePDFStore((state) => state.setPdfWrapperRef);

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
