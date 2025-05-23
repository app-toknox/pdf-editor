import { PDFDocument } from "pdf-lib";

import { useManagerZustand } from "../hooks/useManagerZustand";

export const PdfExport = ({ pdf }) => {
  const { items } = useManagerZustand();
  const handleDownload = async () => {
    if (!pdf) return;
    const arrayBuffer = await pdf.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    console.log("Pagine trovate:", pages.length);

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
            const yPos = page.getHeight() - item.y - item.height / 2 - imgHeight / 2;
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

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pdf-esportato.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("PDF esportato:", url);
  };
  return (
    <>
      {pdf ? (
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-200"
        >
          Export PDF
        </button>
      ) : (
        <p>No PDF file yet</p>
      )}
    </>
  );
};
