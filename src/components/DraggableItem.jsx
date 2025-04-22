import { useDraggable } from "@dnd-kit/core";

export const DraggableItem = ({ id, label }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-move p-2 bg-white border rounded shadow"
    >
      {label}
    </div>
  );
};
