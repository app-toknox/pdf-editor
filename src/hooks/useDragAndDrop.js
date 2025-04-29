import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState } from "react";

function useDragAndDrop() {
  // Creo una lista con tutti gli oggetti droppati
  const [droppedItems, setDroppedItems] = useState([]);

  const [, setIsDropped] = useState();
  const [positions, setPositions] = useState({});

  // Sato per gestire l'inserimentod del testo
  const [itemWaitingForText, setItemWaitingForText] = useState(null);

  const handleDragEnd = (event) => {
    const { over, delta, active } = event;
    const index = active.data.current?.index ?? 0;

    if (over && over.id === "pdf") {
      const alreadyDropped = droppedItems.some((item) => item.id === active.id);
      if (!alreadyDropped) {
        const isTextItem = active.id === "text";

        const newItem = {
          id: active.id + "-" + Date.now(),
          positions: {
            x: 20 + delta.x,
            y: 80 + 20 * 3 * index + delta.y,
          },
          label: active.data.current?.label,
        };

        if (isTextItem) {
          setItemWaitingForText(newItem);
        } else {
          setDroppedItems((prev) => [...prev, newItem]);
        }
      } else {
        setDroppedItems((prev) =>
          prev.map((item) => {
            if (item.id === active.id) {
              return {
                ...item,
                positions: {
                  x: item.positions.x + delta.x,
                  y: item.positions.y + delta.y,
                },
              };
            }
            return item;
          }),
        );
      }
      setIsDropped(true);
    } else if (over && over.id === "sidebar") {
      setPositions((prev) => {
        const newPositions = { ...prev };
        delete newPositions[active.id];
        return newPositions;
      });
      setDroppedItems((prev) => prev.filter((item) => item.id != active.id));
      setIsDropped(false);
    } else {
      console.log("Rilasciato fuori dal canvas");
      setIsDropped(false);
    }
  };

  const deleteItem = (id) => {
    console.log("Deleting item with id:", id);

    setPositions((prev) => {
      const newPositions = { ...prev };
      delete newPositions[id];
      return newPositions;
    });

    setDroppedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const confirmText = (text) => {
    if (itemWaitingForText) {
      const completedItem = { ...itemWaitingForText, description: text };
      setDroppedItems((prev) => [...prev, completedItem]);
      setItemWaitingForText(null);
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
    droppedItems,
    handleDragEnd,
    itemWaitingForText,
    confirmText,
    setItemWaitingForText,
    deleteItem,
  };
}

export default useDragAndDrop;
