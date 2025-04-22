import { useDraggable } from "@dnd-kit/core";

export const DraggableItem = ({ id, label }) => {
  const { attributes, listeners, transform, isDragging, setNodeRef } =
    useDraggable({ id });

  const style = {
    // sposta l'elemento secondo i valori X e Y del drag
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    // abbassa l'opacità mentre trascini
    opacity: isDragging ? 0.5 : 1,
    cursor: "move",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-move p-2 bg-white border rounded shadow"
    >
      {label}
    </div>
  );
};
