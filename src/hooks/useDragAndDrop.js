import { useState } from "react";

import { getBasePosition } from "../utils";

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
        const newItem = {
          id: active.id + "-" + Date.now(),
          positions: getBasePosition(index, delta),
          data: {
            label: active.data.current?.label,
            index: active.data.current?.index,
            description: active.data.current?.description || "",
          },
        };
        setItemWaitingForText(newItem);
        //setDroppedItems((prev) => [...prev, newItem]);
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
                data: {
                  ...item.data,
                },
              };
            }
            return item;
          })
        );
      }
      setIsDropped(true);
      console.log(event);
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

  const handleSubmitForm = (text) => {
    if (itemWaitingForText) {
      const completedItems = {
        ...itemWaitingForText,
        data: {
          ...itemWaitingForText.data,
          description: text,
        },
      };
      setDroppedItems((prev) => [...prev, completedItems]);
      setItemWaitingForText(null);
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

  const updateItem = (id, newDescription) => {
    setDroppedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, data: { ...item.data, description: newDescription } }
          : item
      )
    );
  };

  return {
    positions,
    droppedItems,
    handleDragEnd,
    itemWaitingForText,
    setItemWaitingForText,
    deleteItem,
    updateItem,
    handleSubmitForm,
  };
}

export default useDragAndDrop;
