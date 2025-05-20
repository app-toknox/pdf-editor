import React, { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

import { useManagerZustand } from "../../../hooks/useManagerZustand";
import { SignaturePad } from "../../signature-pad"; // Assuming SignaturePad is imported from this path
export const SignatureForm = ({ initialValue = "" }) => {
  const [text, setText] = useState(initialValue);
  const [font, setFont] = useState("Arial");
  const [mode, setMode] = useState("text");
  const { closeEditForm, submitEditForm, editingItem } = useManagerZustand();

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative bg-base-100 rounded-lg p-8 w-[400px] shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Modifica Firma</h2>
        <FiX
          size="1em"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer"
          onClick={closeEditForm}
        />

        <div className="tabs tabs-boxed flex justify-center">
          <button
            onClick={() => setMode("text")}
            className={`tab ${mode === "text" ? "tab-active" : ""}`}
          >
            Testo
          </button>
          <button
            onClick={() => setMode("draw")}
            className={`tab ${mode === "draw" ? "tab-active" : ""}`}
          >
            Disegna
          </button>
          <button
            onClick={() => setMode("upload")}
            className={`tab ${mode === "upload" ? "tab-active" : ""}`}
          >
            Upload
          </button>
        </div>

        {mode === "text" && (
          <form
            onSubmit={() => {
              submitEditForm(editingItem.id, { text: text, style: font });
            }}
            className="flex flex-col items-center"
          >
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="select select-bordered w-full mb-4"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
            </select>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Inserisci firma..."
              autoFocus
              style={{ fontFamily: font }}
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
        )}

        {mode === "draw" && (
          <SignaturePad
            onSaveSignatureCallback={(dataUrl) =>
              submitEditForm(editingItem.id, { img: dataUrl })
            }
          />
        )}

        {mode === "upload" && (
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full mb-4"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    submitEditForm(editingItem.id, { img: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
