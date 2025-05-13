import React, { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

export const DataForm = ({
  initialFormat = "dd-mm-yyyy",
  onSubmit,
  onClose,
  item,
}) => {
  const [format, setFormat] = useState(initialFormat);

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
          onClick={onClose}
        />
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Seleziona Formato Data
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(item, getFormattedDate(format));
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
          <p className="mb-4 text-center text-gray-700">
            Anteprima: {getFormattedDate(format)}
          </p>
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
