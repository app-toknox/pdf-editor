import { Trans } from "@lingui/react/macro";
import React, { useEffect, useRef, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

import { SignaturePad } from "@/components/signature-pad";
import { useToolManager } from "@/hooks/useToolManager";
export const SignatureForm = ({ initialValue = "" }) => {
  const [text, setText] = useState(initialValue);
  const [font, setFont] = useState("Dancing Script");
  const [mode, setMode] = useState("text");
  const { closeEditForm, submitEditForm, editingItem } = useToolManager();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fonts = [
    "Dancing Script",
    "Great Vibes",
    "Allura",
    "Pacifico",
    "Kaushan Script",
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative bg-base-100 rounded-lg p-8 w-[400px] shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          <Trans>Edit Signature</Trans>
        </h2>
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
            <Trans>Text</Trans>
          </button>
          <button
            onClick={() => setMode("draw")}
            className={`tab ${mode === "draw" ? "tab-active" : ""}`}
          >
            <Trans>Draw</Trans>
          </button>
          <button
            onClick={() => setMode("upload")}
            className={`tab ${mode === "upload" ? "tab-active" : ""}`}
          >
            <Trans>Upload</Trans>
          </button>
        </div>

        {mode === "text" && (
          <form
            onSubmit={() => {
              submitEditForm(editingItem.id, { text: text, style: font });
            }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full mb-4" ref={dropdownRef}>
              <div
                className="input input-bordered w-full cursor-pointer flex items-center justify-between"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ fontFamily: font }}
              >
                <span>{font}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                  {fonts.map((fontName) => (
                    <div
                      key={fontName}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      style={{ fontFamily: fontName }}
                      onClick={() => {
                        setFont(fontName);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {fontName}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              <Trans>Save</Trans>
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
