import { useDroppable } from "@dnd-kit/core";

import { DraggableItem } from "./draggable-item";

export const Sidebar = ({ finalPositions }) => {
  //esempio di items
  const items = [
    { id: "stamp", label: "Timbro", index: 0 },
    { id: "signature", label: "Firma", index: 1 },
  ];

  const { setNodeRef } = useDroppable({
    id: "sidebar",
  });

  return (
    <aside
      className="w-64 bg-gray-100 p-4 border-r"
      id="sidebar"
      ref={setNodeRef}
    >
      <h2 className="text-lg font-bold mb-4">Strumenti</h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const position = finalPositions?.[item.id] ?? {
            x: 20,
            y: 80 + 20 * 3 * item.index,
          };

          return (
            <DraggableItem
              key={item.id}
              id={item.id}
              label={item.label}
              position={position}
              index={item.index}
            />
          );
        })}
      </div>
    </aside>
  );
};
