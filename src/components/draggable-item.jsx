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
      className="cursor-move p-2 bg-white border rounded shadow z-20 w-40"
    >
      <ItemsLayout id={id} content={content} />
    </div>
  );
};
