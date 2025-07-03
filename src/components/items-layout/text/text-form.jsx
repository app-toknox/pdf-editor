import { Trans, useLingui } from "@lingui/react/macro";
import { useEffect, useRef, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

import { useToolManager } from "@/hooks/useToolManager";

export const TextForm = ({ initialValue = "" }) => {
  const { editingItem, submitEditForm, closeEditForm } = useToolManager();

  const [text, setText] = useState(editingItem?.payload?.text || initialValue);
  const [font, setFont] = useState(editingItem?.payload?.style || "Arial");
  const [color, setColor] = useState(editingItem?.payload?.color || "#000000");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useLingui();

  const fonts = [
    "Arial",
    "Times New Roman",
    "Georgia",
    "Montserrat",
    "Courier New",
  ];

  const colors = [
    "#2C2C2C",
    "#F8F8F8",
    "#1E88E5",
    "#43A047",
    "#FFC107",
    "#E53935",
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
      <div className="relative bg-base-100 rounded-lg p-8 w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          <Trans>Enter text</Trans>
        </h2>
        <FiX
          size="1em"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer"
          onClick={() => closeEditForm()}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEditForm(editingItem.id, {
              text: text,
              style: font,
              color: color,
            });
          }}
          className="flex flex-col items-center"
        >
          {/* Dropdown Font */}
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

          {/* Selezione Colore */}
          <div className="w-full mb-10">
            <div className="flex items-center gap-2">
              <Trans>Colors:</Trans>
              <div className="flex gap-2">
                {colors.map((colorOption) => (
                  <button
                    key={colorOption}
                    type="button"
                    className={`w-3 h-3 rounded-full transition-all ${
                      color === colorOption
                        ? "border-2 border-gray-400 scale-110"
                        : colorOption === "#FFFFFF"
                          ? "border border-gray-300 hover:border-gray-400"
                          : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: colorOption }}
                    onClick={() => setColor(colorOption)}
                    title={colorOption}
                  />
                ))}
              </div>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t`Write your text here...`}
            autoFocus
            style={{ fontFamily: font, color: color }}
            className="textarea textarea-bordered w-full mb-4"
            rows={4}
          />
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
          >
            <FiCheck size="1em" className="mr-2" />
            <Trans>Save</Trans>
          </button>
        </form>
      </div>
    </div>
  );
};
