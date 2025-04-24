import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState } from "react";

function useDragAndDrop() {
  const [isDropped, setIsDropped] = useState(false);
  const [position, setPosition] = useState();

  const handleDragEnd = (event) => {
    const { over, delta } = event;

    console.log("Drag end:", {
      over: over?.id,
      delta,
      isDropped,
      position,
    });

    // Se rilasciato nel canvas
    if (over && over.id === "pdf") {
      if (!isDropped) {
        // Prima volta nel canvas - usiamo una posizione predefinita
        console.log("Primo rilascio nel canvas");
        setPosition({
          x: delta.x + 20,
          y: delta.y + 80,
        });
        setIsDropped(true);
        // Non modifichiamo la posizione qui, usiamo quella predefinita in useState
      } else {
        // Aggiorna posizione con delta
        console.log("Aggiornamento posizione con delta:", delta);
        setPosition({
          x: position.x + delta.x,
          y: position.y + delta.y,
        });
      }
    } else {
      // Rilasciato fuori dal canvas
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
    position,
    handleDragEnd,
  };
}

export default useDragAndDrop;
