import React, { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

export const SignatureForm = ({ initialValue = "", onSubmit, onClose }) => {
  const [text, setText] = useState(initialValue);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative bg-base-100 rounded-lg p-8 w-80 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Modifica Firma
        </h2>
        <FiX
          size="1em"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(text);
          }}
          className="flex flex-col items-center"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Inserisci firma..."
            autoFocus
            className="input input-bordered w-full mb-4 text-center"
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
