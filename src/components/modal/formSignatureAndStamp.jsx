import { useState } from "react";

export const ModalExample = ({ onTextSubmit, onClose }) => {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onTextSubmit(text);
  }

  return (
    <dialog id="my_modal_1" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Aggiungi il tuo testo</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Testo</label>
            <textarea
              className="textarea textarea-bordered w-full h-24"
              placeholder="Scrivi qui..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="modal-action flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="btn btn-outline">
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
