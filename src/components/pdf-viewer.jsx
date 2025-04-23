import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { useDroppable } from "@dnd-kit/core";
import { saveAs } from "file-saver";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { cn } from "../utils";
import { Loader } from "./loading";
import { SignaturePad } from "./signature-pad";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};
export const PdfViewer = ({ pdf, dropped, droppedItem }) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [signature, setSignature] = useState();
  const [signaturePos, setSignaturePos] = useState();
  const [isModified, setIsModified] = useState(false);
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

  const handleMouseMove = (e) => {
    if (!pdf || !signature) return;
    const canvas = pdfWrapperRef.current?.querySelector("canvas");
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSignaturePos({ x, y });
    setIsModified(true);
  };

  const handleDownload = async () => {
    if (!pdf || !signature || !signaturePos) return;
    const arrayBuffer = await pdf.arrayBuffer(); // dove `pdf` è un File/Blob
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pngImageBytes = await fetch(signature).then((res) =>
      res.arrayBuffer(),
    );
    const embeddedImage = await pdfDoc.embedPng(pngImageBytes);
    const scaledImage = embeddedImage.scale(0.5); // puoi regolare lo scale qui

    const pages = pdfDoc.getPages();
    const currentPage = pages[pageNumber - 1]; // attenzione: pageNumber è 1-based

    currentPage.drawImage(embeddedImage, {
      x: signaturePos.x,
      y: currentPage.getHeight() - signaturePos.y - scaledImage.height, // sistema di coordinate PDF
      width: scaledImage.width,
      height: scaledImage.height,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "signed.pdf");
  };

  //Logica per aggiungere su PDF con drag & drop
  const { setNodeRef } = useDroppable({
    id: "pdf",
  });

  return (
    <div className="flex flex-col gap-8 py-8">
      {pdf ? (
        <>
          {isLoaded ? (
            <SignaturePad onSaveSignatureCallback={setSignature} />
          ) : null}
          {isModified ? (
            <button
              className="btn btn-warning text-black"
              onClick={handleDownload}
            >
              Download Pdf
            </button>
          ) : null}

          <div
            className="relative z-10 max-w-xl shadow-2xl"
            onClick={handleMouseMove}
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
              <Page pageNumber={pageNumber} x />
            </Document>

            {droppedItem && droppedItem.position ? (
              <div
                className="absolute bg-yellow-200 px-4 py-2 rounded font-bold shadow"
                style={{
                  top: `${droppedItem.position.y}px`,
                  left: `${droppedItem.position.x}px`,
                  position: "absolute",
                  pointerEvents: "none",
                }}
              >
                {droppedItem.label}
              </div>
            ) : null}

            {signature && signaturePos ? (
              <img
                src={signature}
                className={cn("absolute")}
                style={{
                  top: `${signaturePos.y}px`,
                  left: `${signaturePos.x}px`,
                  pointerEvents: "none",
                }}
              />
            ) : null}
          </div>

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
