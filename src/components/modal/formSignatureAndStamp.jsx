import { useState } from "react";

import useUpdateDelete from "../../hooks/useUpdateDelete";

export const ModalExample = ({ setIsModalOpen, itemWaitingForContent }) => {
  const [text, setText] = useState("");
  const fonts = [
    { id: "font1", label: "Classico", className: "font-sans" },
    { id: "font2", label: "Corsivo", className: "italic" },
    { id: "font3", label: "Elegante", className: "font-serif" },
    { id: "font4", label: "Creativo", className: "font-mono" },
  ];
  const [selectedFont, setSelectedFont] = useState("font1");
  const [uploadStamp, setUploadStamp] = useState(null);
  const { newItem } = useUpdateDelete();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("prima del drop", itemWaitingForContent);
    if (itemWaitingForContent.id.includes("signature")) {
      newItem(itemWaitingForContent, { text, selectedFont });
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
              <input
                type="text"
                placeholder="Scrivi qui il tuo nome..."
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="space-y-2">
                {fonts.map((font) => (
                  <div key={font.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={font.id}
                      name="font"
                      value={font.id}
                      checked={selectedFont === font.id}
                      onChange={() => setSelectedFont(font.id)}
                    />
                    <label
                      htmlFor={font.id}
                      className={`${font.className} text-lg`}
                    >
                      {text || "Anteprima"}
                    </label>
                  </div>
                ))}
              </div>
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
