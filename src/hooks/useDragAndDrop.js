import { useState } from "react";

import { getBasePosition } from "../utils";

function useDragAndDrop() {
  // Creo una lista con tutti gli oggetti droppati
  const [droppedItems, setDroppedItems] = useState([]);

  // Sato per gestire l'inserimentod del testo
  const [itemWaitingForContent, setItemWaitingForContent] = useState({});

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
            content: active.data.current?.content,
            index: active.data.current?.index,
          },
        };

        if (["stamp", "signature"].includes(active.id)) {
          setItemWaitingForContent(newItem);
          console.log(itemWaitingForContent);
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
                data: {
                  ...item.data,
                },
              };
            }
            return item;
          })
        );
      }
      console.log(event);
    } else if (over && over.id === "sidebar") {
      setDroppedItems((prev) => prev.filter((item) => item.id != active.id));
    } else {
      console.log("Rilasciato fuori dal canvas");
    }
  };

  return {
    droppedItems,
    setDroppedItems,
    handleDragEnd,
    itemWaitingForContent,
    setItemWaitingForContent,
  };
}

export default useDragAndDrop;
