import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import React from "react";

import { InputPdfFile } from "../components/input-pdf-file";
import { PdfViewer } from "../components/pdf-viewer";

export const Home = () => {
  const [pdf, setPdf] = useState();

  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };
  return (
    <div className="flex w-full items-center flex-col gap-4 my-8">
      <h1 className="text-2xl">PDF EDITOR TOKNOX DEMO</h1>
      <InputPdfFile setPdf={setPdf} />
      {/* here i start to manage droppable features */}
      <div ref={setNodeRef} style={style}>
        <PdfViewer pdf={pdf} />
      </div>
    </div>
  );
};
