import { useEffect, useState } from "react";

import { InputPdfFile } from "../components/input-pdf-file";
import { ModalExample } from "../components/modal/formSignatureAndStamp"; // importa il tuo form
import { PdfViewer } from "../components/pdf-viewer";
import { useDragAndDropContext } from "../providers/drag-and-drop-provider";

export const Home = () => {
  const [pdf, setPdf] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { itemWaitingForContent } = useDragAndDropContext();

  useEffect(() => {
    if (
      itemWaitingForContent &&
      Object.keys(itemWaitingForContent).length > 0
    ) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [itemWaitingForContent]);

  return (
    <div className="flex w-full items-center flex-col gap-4 my-8">
      <h1 className="text-2xl">PDF EDITOR TOKNOX DEMO</h1>
      <InputPdfFile setPdf={setPdf} />
      <PdfViewer pdf={pdf} />

      {isModalOpen && (
        <ModalExample
          setIsModalOpen={setIsModalOpen}
          itemWaitingForContent={itemWaitingForContent}
        />
      )}
    </div>
  );
};
