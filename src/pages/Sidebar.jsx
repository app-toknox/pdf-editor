import { Document, Page } from "react-pdf";

import { usePDFStore } from "../hooks/usePDF";

export const Sidebar = () => {
  const numPages = usePDFStore((state) => state.numPages);
  const onDocumentLoadSuccess = usePDFStore(
    (state) => state.onDocumentLoadSuccess,
  );
  const options = usePDFStore((state) => state.options);
  const pdfFile = usePDFStore((state) => state.pdfFile);
  const setPageNumber = usePDFStore((state) => state.setPageNumber);

  return (
    <aside className="w-80 bg-base-200 p-6 border-r border-gray-200 flex flex-col rounded-tr-3xl rounded-br-3xl shadow-md relative overflow-hidden overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">PDF Pages</h2>
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <div
            key={index}
            className="mb-6 text-center cursor-pointer hover:ring hover:ring-blue-300 rounded"
            onClick={() => setPageNumber(index + 1)}
          >
            <Page pageNumber={index + 1} width={150} />
            <div className="text-xs text-gray-600 mt-1">{index + 1}</div>
          </div>
        ))}
      </Document>
    </aside>
  );
};
