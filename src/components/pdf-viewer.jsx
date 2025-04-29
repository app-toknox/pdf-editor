import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { DraggableItem } from "./draggable-item";
import { Loader } from "./loading";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};
export const PdfViewer = ({ pdf, droppedItems, deleteItem }) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  //const [signature, setSignature] = useState();

  const pdfWrapperRef = useRef();

  async function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoaded(true);
  }

  // Handlers for next and previous page
  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  //Logica per aggiungere su PDF con drag & drop
  const { setNodeRef } = useDroppable({
    id: "pdf",
  });

  return (
    <div className="flex flex-col gap-8 py-8">
      {pdf ? (
        <>
          <div
            className="relative z-10 max-w-xl shadow-2xl"
            id="pdf"
            ref={(el) => {
              setNodeRef(el);
              pdfWrapperRef.current = el;
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
          {droppedItems.map((item) => {
            return (
              <DraggableItem
                key={item.id}
                id={item.id}
                label={item.label}
                position={item.positions}
                index={item.index}
                description={item?.description}
                deleteItem={deleteItem}
              />
            );
          })}
          {isLoaded ? (
            <div className="w-full flex flex-row justify-between items-center px-8">
              <button
                className="btn w-32 btn-primary"
                onClick={goToPrevPage}
                disabled={pageNumber === 1}
              >
                Previous
              </button>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <button
                className="btn w-32 btn-primary"
                onClick={goToNextPage}
                disabled={pageNumber === numPages}
              >
                Next
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};
