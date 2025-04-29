import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

import { useDragAndDropContext } from "../content/dragAndDropContext";

export const DraggableItem = ({ id, label, position, index, description }) => {
  const { deleteItem } = useDragAndDropContext();
  const { attributes, listeners, transform, isDragging, setNodeRef } =
    useDraggable({
      id,
      data: { label, index, description },
    });

  const [text, setText] = useState(label);

  const style = {
    opacity: isDragging ? 0.5 : 1,
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-move p-2 bg-white border rounded shadow z-20 w-40"
    >
      {!id.includes("-") ? (
        // Elemento principale
        <div>{label}</div>
      ) : (
        // Elemento copiato
        <>
          <button
            onClick={() => deleteItem(id)}
            className="absolute top-1 right-1 text-red-500"
          >
            X
          </button>
          {id.includes(["signature", "stamp", "text"]) ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-1 border rounded"
            />
          ) : (
            <span>{text}</span>
          )}
        </>
      )}
    </div>
  );
};
