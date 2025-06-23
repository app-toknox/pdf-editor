import { Trans } from "@lingui/react/macro";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";

import { useToolManager } from "@/hooks/useToolManager";

import { DownloadForm } from "./download-form";

export const PdfExport = ({ pdf, onExport }) => {
  const { items } = useToolManager();

  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(
    pdf ? pdf.name.replace(/\.pdf$/i, "") + "-signed" : "signed",
  );

  const handleDownload = async (customName) => {
    if (!pdf) return;
    const arrayBuffer = await pdf.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    for (const [index, page] of pages.entries()) {
      const pageItems = items.filter((item) => item.page === index + 1);

      for (const item of pageItems) {
        if (item.payload) {
          // Calcolo dimensioni per testo
          const textWidth = item.payload.widthSmallDiv;
          const textHeight = item.payload.heightSmallDiv;

          if (item.payload.text || item.payload.textEditable) {
            const text = item.payload.textEditable || item.payload.text;
            const fontSize = item.payload.fontSize;

            page.drawText(text, {
              x: item.x + item.width / 2 - textWidth / 2,
              y: page.getHeight() - item.y - item.height / 2 - textHeight / 2,
              size: parseFloat(fontSize),
            });
          }

          if (item.payload.img) {
            // Calcolo dimensioni per immagine
            const imgWidth = item.payload.widthImage;
            const imgHeight = item.payload.heightImage;
            if (isNaN(imgWidth) || isNaN(imgHeight)) {
              console.warn("Invalid image dimensions for item", item);
              continue;
            }
            const image = await pdfDoc.embedPng(item.payload.img);
            const xPos = item.x + item.width / 2 - imgWidth / 2;
            const yPos =
              page.getHeight() - item.y - item.height / 2 - imgHeight / 2;
            page.drawImage(image, {
              x: xPos,
              y: yPos,
              width: imgWidth,
              height: imgHeight,
            });
          }
        }
      }
    }

    const safeFileName = customName.endsWith(".pdf")
      ? customName
      : `${customName}.pdf`;
    const pdfBytes = await pdfDoc.save();

    const file = new File([pdfBytes], safeFileName, {
      type: "application/pdf",
    });

    if (onExport) onExport(file);
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = safeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {pdf ? (
        <>
          <button
            onClick={() => {
              const originalName = pdf.name.replace(/\.pdf$/i, "");
              setFileName(`${originalName}-signed`);
              setShowModal(true);
            }}
            className="px-6 py-2 bg-indigo-700 text-white rounded-md shadow hover:bg-indigo-800 transition duration-200"
          >
            <Trans>Export PDF</Trans>
          </button>
          {showModal && (
            <DownloadForm
              initialValue={fileName}
              setFormOpen={setShowModal}
              onSubmit={(name) => {
                setFileName(name);
                handleDownload(name);
                setShowModal(false);
              }}
            />
          )}
        </>
      ) : (
        <p>No PDF file yet</p>
      )}
    </>
  );
};
