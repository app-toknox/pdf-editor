import { PDFDocument } from "pdf-lib";

import { useManagerZustand } from "../hooks/useManagerZustand";

export const PdfExport = ({ pdf }) => {
  const { items, getRefById } = useManagerZustand();
  const handleDownload = async () => {
    if (!pdf) return;
    const arrayBuffer = await pdf.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    console.log("Pagine trovate:", pages.length);

    for (const [index, page] of pages.entries()) {
      const pageItems = items.filter((item) => item.page === index + 1);

      for (const item of pageItems) {
        const ref = getRefById(item.id);

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.width;
        const centerY = rect.height / 2;
        console.log("ITEM", item);
        if (item.payload && ref && ref.current) {
          if (item.payload.text || item.payload.textEditable) {
            const text = item.payload.textEditable || item.payload.text;
            const styles = window.getComputedStyle(ref.current);
            const fontSize = styles.fontSize;

            page.drawText(text, {
              x: item.x + item.width / 2 - centerX / 2,
              y: page.getHeight() - item.y - item.height / 2 - centerY / 2,
              size: parseFloat(fontSize),
            });
          }
        }
        if (item.payload.img) {
          const ref = getRefById(item.id);
          const img = await pdfDoc.embedPng(item.payload.img);
          page.drawImage(img, {
            x: item.x + item.width / 2 - centerX / 2,
            y: page.getHeight() - item.y - item.height / 2 - centerY,
            height: ref.current.height,
            width: ref.current.width,
          });
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
          onClick={() => {
            handleDownload();
          }}
        >
          ESPORTA
        </button>
      ) : (
        <p>Nessun PDF caricato</p>
      )}
    </>
  );
};
