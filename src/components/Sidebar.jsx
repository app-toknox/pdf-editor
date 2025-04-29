import { useDroppable } from "@dnd-kit/core";

import { useDragAndDropContext } from "../providers/drag-and-drop-provider";
import { getBasePosition } from "../utils";
import { DraggableItem } from "./draggable-item";

export const Sidebar = () => {
  //esempio di items
  const { positions } = useDragAndDropContext();
  const items = [
    { id: "stamp", label: "Timbro", index: 0, description: "" },
    { id: "signature", label: "Firma", index: 1, description: "" },
    { id: "text", label: "Testo", index: 2, description: "" },
    { id: "data", label: "Data", index: 3, description: "" },
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
          const position = positions?.[item.id] ?? getBasePosition(item.index);

          return (
            <DraggableItem
              key={item.id}
              id={item.id}
              label={item.label}
              position={position}
              index={item.index}
              description={item?.description}
            />
          );
        })}
      </div>
    </aside>
  );
};
