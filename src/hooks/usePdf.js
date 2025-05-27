import { pdfjs } from "react-pdf";
import { create } from "zustand";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};

export const usePDFStore = create((set, get) => ({
  pageNumber: 1,
  numPages: null,
  isLoaded: false,
  pdfWrapperRef: null,
  pdfFile: null,
  setPDFFile: (file) => set({ pdfFile: file }),

  setPageNumber: (page) => set({ pageNumber: page }),
  setPdfWrapperRef: (ref) => {
    const { pdfWrapperRef } = get();
    if (pdfWrapperRef !== ref && ref !== null) {
      set({ pdfWrapperRef: ref });
    }
  },

  goToNextPage: () => {
    const { pageNumber, numPages } = get();
    if (pageNumber < numPages) {
      set({ pageNumber: pageNumber + 1 });
    }
  },

  goToPrevPage: () => {
    const { pageNumber } = get();
    if (pageNumber > 1) {
      set({ pageNumber: pageNumber - 1 });
    }
  },

  onDocumentLoadSuccess: ({ numPages }) => {
    set({ numPages, isLoaded: true });
  },

  options,
}));
