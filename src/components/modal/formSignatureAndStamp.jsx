import { useState } from "react";

import useUpdateDelete from "../../hooks/useUpdateDelete";

export const ModalExample = ({ setIsModalOpen, itemWaitingForContent }) => {
  const [text, setText] = useState("");
  const [uploadStamp, setUploadStamp] = useState(null);
  const { newItem } = useUpdateDelete();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("prima del drop", itemWaitingForContent);
    if (itemWaitingForContent.id.includes("signature")) {
      newItem(itemWaitingForContent, text);
    } else {
      newItem(itemWaitingForContent, uploadStamp);
    }
    setIsModalOpen(false);
  };

  return (
    <dialog id="my_modal_1" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Aggiungi il tuo testo</h3>

        <form onSubmit={handleSubmitForm}>
          {itemWaitingForContent.id.includes("signature") ? (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Firma</label>
              <textarea
                className="textarea textarea-bordered w-full h-24"
                placeholder="Scrivi qui..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Immagine</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setUploadStamp(URL.createObjectURL(e.target.files[0]))
                }
              />
              {uploadStamp && (
                <div>
                  <img
                    src={uploadStamp}
                    alt="Anteprima"
                    className="w-10 h-10"
                  />
                </div>
              )}
            </div>
          )}

          <div className="modal-action flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn btn-outline"
            >
              Annulla
            </button>
            <button type="submit" className="btn btn-primary">
              Salva
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
