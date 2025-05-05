import "react-resizable/css/styles.css";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { ItemsLayout } from "./items-layout/itemsLayout";

export const DraggableItem = ({ id, content, position, index }) => {
  const { attributes, listeners, transform, isDragging, setNodeRef } =
    useDraggable({
      id,
      data: { content, index },
    });

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
      className="z-20"
    >
      {isDragging ? (
        <div className="relative bg-white px-4 py-2 text-center">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-300"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-300"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-300"></div>
          <span className="relative text-gray-800 font-semibold">
            {id}.....
          </span>
        </div>
      ) : (
        <ItemsLayout id={id} content={content} />
      )}
    </div>
  );
};
