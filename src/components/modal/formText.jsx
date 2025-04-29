import { Dialog } from "radix-ui";
import { useState } from "react";

export const ModalExample = ({ open, onTextSubmit, onClose }) => {
  const [text, setText] = useState("");

  function handleText() {
    onTextSubmit(text);
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[400px] shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Read-only text
          </Dialog.Title>

          <form action={handleText}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Aggiungi il tuo testo
              </label>
              <textarea
                className="w-full h-24 p-2 border rounded resize-none"
                placeholder="Enter your text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border"
              >
                Cancella
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Salva
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
