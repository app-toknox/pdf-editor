import { useState } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { ResizableBox } from "react-resizable";

import useUpdateDelete from "../../../hooks/useUpdateDelete";

export const DataDropped = ({ dataId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("dd-mm-yyyy");

  const [size, setSize] = useState({ width: 100, height: 35 });

  const handleResize = (event, { size }) => {
    console.log(event);
    setSize(size);
  };
  const { deleteItem } = useUpdateDelete();

  const dateFormat = (format) => {
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
  const handleModify = () => {
    setIsModalOpen(true);
  };

  const handleSetDate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formatSelected = formData.get("format");
    setSelectedFormat(formatSelected.toString());
    setIsModalOpen(false);
  };

  return (
    <ResizableBox
      width={size.width}
      height={size.height}
      minConstraints={[150, 75]}
      maxConstraints={[400, 300]}
      resizeHandles={["se"]}
      className="border border-blue-500 rounded-lg bg-white shadow-sm"
      onResize={handleResize}
      lockAspectRatio={true}
    >
      <div className="relative">
        <button
          onClick={() => deleteItem(dataId)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-700"
        >
          <FaTimes size={18} />
        </button>

        <div className="border border-blue-500 rounded-lg px-4 py-2 text-center w-full font-medium text-gray-800 bg-white shadow-sm text-sm">
          {dateFormat(selectedFormat)}
        </div>

        <div
          onClick={handleModify}
          className="absolute bottom-2 right-2 text-gray-400 hover:text-gray-700 cursor-pointer"
        >
          <FaPencilAlt />
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-gray-300/30 to-transparent backdrop-blur-sm z-50">
            <form
              onSubmit={handleSetDate}
              className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
            >
              <label>
                <input
                  type="radio"
                  name="format"
                  value="dd-mm-yyyy"
                  defaultChecked={selectedFormat === "dd-mm-yyyy"}
                />{" "}
                dd-mm-yyyy
              </label>
              <br />

              <label>
                <input
                  type="radio"
                  name="format"
                  value="dd/mm/yyyy"
                  defaultChecked={selectedFormat === "dd/mm/yyyy"}
                />{" "}
                dd/mm/yyyy
              </label>
              <br />

              <label>
                <input
                  type="radio"
                  name="format"
                  value="yyyy-mm-dd"
                  defaultChecked={selectedFormat === "yyyy-mm-dd"}
                />{" "}
                yyyy-mm-dd
              </label>
              <br />

              <label>
                <input
                  type="radio"
                  name="format"
                  value="yyyy/mm/dd"
                  defaultChecked={selectedFormat === "yyyy/mm/dd"}
                />{" "}
                yyyy/mm/dd
              </label>
              <br />

              <label>
                <input
                  type="radio"
                  name="format"
                  value="mm-dd-yyyy"
                  defaultChecked={selectedFormat === "mm-dd-yyyy"}
                />{" "}
                mm-dd-yyyy
              </label>
              <br />

              <label>
                <input
                  type="radio"
                  name="format"
                  value="mm/dd/yyyy"
                  defaultChecked={selectedFormat === "mm/dd/yyyy"}
                />{" "}
                mm/dd/yyyy
              </label>
              <br />

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Applica
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </ResizableBox>
  );
};
