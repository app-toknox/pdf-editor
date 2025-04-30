import { useState } from "react";

import useUpdateDelete from "../../hooks/useUpdateDelete";

export const ItemsLayout = ({ id, content }) => {
  const { deleteItem, updateItem } = useUpdateDelete();
  const [text, setText] = useState(content);
  return (
    <div>
      {!id.includes("-") ? (
        <div>{id}</div>
      ) : (
        <div className="w-32">
          <button
            onClick={() => deleteItem(id)}
            className="absolute top-1 right-1 text-red-500"
          >
            X
          </button>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            className="border px-1 w-28"
          />
        </div>
      )}
    </div>
  );
};
