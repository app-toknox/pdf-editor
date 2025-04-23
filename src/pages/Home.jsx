import { useState } from "react";
import React from "react";

import { InputPdfFile } from "../components/input-pdf-file";
import { PdfViewer } from "../components/pdf-viewer";

export const Home = ({ isDropped, droppedItem }) => {
  const [pdf, setPdf] = useState();

  return (
    <div className="flex w-full items-center flex-col gap-4 my-8">
      <h1 className="text-2xl">PDF EDITOR TOKNOX DEMO</h1>
      <InputPdfFile setPdf={setPdf} />
      <PdfViewer pdf={pdf} dropped={isDropped} droppedItem={droppedItem} />
    </div>
  );
};
