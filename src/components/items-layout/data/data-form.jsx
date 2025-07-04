import { Trans } from "@lingui/react/macro";
import React, { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

import { useToolManager } from "@/hooks/useToolManager";

export const DataForm = ({ initialFormat = "dd-mm-yyyy" }) => {
  const { editingItem, submitEditForm, closeEditForm } = useToolManager();
  const [format, setFormat] = useState(initialFormat);
  const [color, setColor] = useState(editingItem?.payload?.color || "#000000");

  const colors = [
    "#2C2C2C",
    "#F8F8F8",
    "#1E88E5",
    "#43A047",
    "#FFC107",
    "#E53935",
  ];
  const getFormattedDate = (format) => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    switch (format) {
      case "dd-mm-yyyy":
        return `${day}-${month}-${year}`;
      case "dd/mm/yyyy":
        return `${day}/${month}/${year}`;
      case "yyyy-mm-dd":
        return `${year}-${month}-${day}`;
      case "yyyy/mm/dd":
        return `${year}/${month}/${day}`;
      case "mm-dd-yyyy":
        return `${month}-${day}-${year}`;
      case "mm/dd/yyyy":
        return `${month}/${day}/${year}`;
      default:
        return today.toLocaleDateString();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative bg-base-100 rounded-lg p-8 w-80 shadow-lg">
        <FiX
          size="1em"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer"
          onClick={() => closeEditForm()}
        />
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          <Trans>Select Data type</Trans>
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEditForm(editingItem.id, {
              text: getFormattedDate(format),
              color: color,
            });
          }}
          className="flex flex-col"
        >
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="select select-bordered w-full mb-4"
          >
            <option value="dd-mm-yyyy">dd-mm-yyyy</option>
            <option value="dd/mm/yyyy">dd/mm/yyyy</option>
            <option value="yyyy-mm-dd">yyyy-mm-dd</option>
            <option value="yyyy/mm/dd">yyyy/mm/dd</option>
            <option value="mm-dd-yyyy">mm-dd-yyyy</option>
            <option value="mm/dd/yyyy">mm/dd/yyyy</option>
          </select>

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

          <div className="mb-4 flex items-center gap-1">
            <span className="text-black">
              <Trans>Preview</Trans>:
            </span>
            <span style={{ color: color }}>{getFormattedDate(format)}</span>
          </div>
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
