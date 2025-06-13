import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

export const DownloadForm = ({ initialValue, setFormOpen, onSubmit }) => {
  const [fileName, setFileName] = useState(initialValue || "");

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative bg-base-100 rounded-lg p-8 w-[400px] shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Modifica Nome File
        </h2>
        <FiX
          size="1em"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer"
          onClick={() => setFormOpen(false)}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(fileName);
            setFormOpen(false);
          }}
          className="flex flex-col items-center"
        >
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
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
