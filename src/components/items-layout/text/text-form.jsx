import React, { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

import { useManagerZustand } from "../../../hooks/useManagerZustand";

export const TextForm = ({ initialValue = "" }) => {
  const [text, setText] = useState(initialValue);
  const { editingItem, submitEditForm, closeEditForm } = useManagerZustand();

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative bg-base-100 rounded-lg p-8 w-80 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Inserisci Testo
        </h2>
        <FiX
          size="1em"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer"
          onClick={() => closeEditForm()}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEditForm(editingItem.id, { text: text });
          }}
          className="flex flex-col items-center"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Scrivi qui il tuo testo..."
            autoFocus
            className="textarea textarea-bordered w-full mb-4"
            rows={4}
          />
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
          >
            <FiCheck size="1em" className="mr-2" />
            Salva
          </button>
        </form>
      </div>
    </div>
  );
};
