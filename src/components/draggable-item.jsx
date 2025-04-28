import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export const DraggableItem = ({ id, label, position, index }) => {
  const { attributes, listeners, transform, isDragging, setNodeRef } =
    useDraggable({
      id,
      data: { label, index },
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
      {label}
    </div>
  );
};
