import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState } from "react";

function useDragAndDrop() {
  // Creo una lista con tutti gli oggetti droppati
  const [droppedItems, setDroppedItems] = useState([]);

  const [isDropped, setIsDropped] = useState();
  const [positions, setPositions] = useState({});

  const handleDragEnd = (event) => {
    const { over, delta, active } = event;
    const index = active.data.current?.index ?? 0;

    console.log("Drag end:", {
      over: over?.id,
      delta,
      isDropped,
      positions,
    });

    if (over && over.id === "pdf") {
      setPositions((prev) => {
        const prevPos = prev[active.id] || {
          x: 20,
          y: 80 + 20 * 3 * index,
        };
        return {
          ...prev,
          [active.id]: {
            x: prevPos.x + delta.x,
            y: prevPos.y + delta.y,
          },
        };
      });
      setIsDropped(true);
      setDroppedItems((prev) => [...prev, prev]);
    } else if (over && over.id === "sidebar") {
      setPositions((prev) => {
        const newPositions = { ...prev };
        delete newPositions[active.id];
        return newPositions;
      });
      setIsDropped(false);
    } else {
      console.log("Rilasciato fuori dal canvas");
      setIsDropped(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  return {
    sensors,
    positions,
    handleDragEnd,
  };
}

export default useDragAndDrop;
