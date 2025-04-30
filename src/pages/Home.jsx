import { useState } from "react";

import { InputPdfFile } from "../components/input-pdf-file";
import { ModalExample } from "../components/modal/formSignatureAndStamp"; // importa il tuo form
import { PdfViewer } from "../components/pdf-viewer";
import { useDragAndDropContext } from "../providers/drag-and-drop-provider"; // importa il context

export const Home = () => {
  const [pdf, setPdf] = useState();

  const { itemWaitingForContent, setItemWaitingForContent, handleSubmitForm } =
    useDragAndDropContext();

  return (
    <div className="flex w-full items-center flex-col gap-4 my-8">
      <h1 className="text-2xl">PDF EDITOR TOKNOX DEMO</h1>
      <InputPdfFile setPdf={setPdf} />
      <PdfViewer pdf={pdf} />

      {/*{isModalOpen && (
        <ModalExample
          onTextSubmit={handleTextSubmit}
          onClose={handleCloseModal}
        />
      )}*/}
    </div>
  );
};
