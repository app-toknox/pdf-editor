import { useState } from "react";
import { FaTimes } from "react-icons/fa";

import useUpdateDelete from "../../../hooks/useUpdateDelete";

export const TextDropped = ({ textId, content }) => {
  const [text, setText] = useState(content);
  const { deleteItem, updateItem } = useUpdateDelete();

  const handleUpdate = (e) => {
    setText(e.target.value);
    updateItem(textId, e.target.value);
  };
  return (
    <div className="flex items-center w-full h-full px-3 py-2 relative text-gray-800 text-[12px] font-medium font-sans border-1 rounded-sm">
      <button
        onClick={() => deleteItem(textId)}
        className="absolute top-0 right-0 text-red-400 hover:text-red-700"
      >
        <FaTimes size={14} />
      </button>
      <input
        type="text"
        value={text}
        onChange={handleUpdate}
        className="flex items-center justify-center h-full border px-1 py-1 w-28"
      />
    </div>
  );
};
