import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

import { useManagerZustand } from "../../../hooks/useManagerZustand";

export const StampForm = () => {
  const { editingItem, submitEditForm, closeEditForm } = useManagerZustand();

  const [imageSrc, setImageSrc] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setImageSrc(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative bg-base-100 rounded-lg p-8 w-80 shadow-lg">
        <FiX
          size="1em"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer"
          onClick={closeEditForm}
        />
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Modifica Timbro
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEditForm(editingItem.id, imageSrc);
          }}
          className="flex flex-col items-center"
        >
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Anteprima Timbro"
              className="mb-4 max-h-40 object-contain"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full mb-4"
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
