import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

import { Layout } from "./components/layout";
import { Home } from "./pages/Home";

const App = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [droppedItem, setDroppedItem] = useState(null);
  // Track size of the draggable element
  const [dragSize, setDragSize] = useState({ width: 0, height: 0 });

  const handleDragEnd = (event) => {
    if (!event.over) return;

    const startX = event.activatorEvent.pageX;
    const startY = event.activatorEvent.pageY;
    const { x: dx, y: dy } = event.delta;

    const { left, top } = document
      .getElementById("pdf")
      .getBoundingClientRect();
    console.log(left + window.scrollX, top + window.scrollY);

    // posizione di drop sul documento
    const dropPageX = startX + dx - (left + window.scrollX);
    const dropPageY = startY + dy - (top + window.scrollY);

    console.log("Drop document coords:", dropPageX, dropPageY);

    if (event.over.id === "pdf") {
      setIsDropped(true);
      setDroppedItem({
        id: event.active.id,
        position: {
          x: dropPageX,
          y: dropPageY,
        },
        label: event.active.id,
      });
    }
  };

  const handleDragStart = (event) => {
    const draggable = document.getElementById(event.active.id);
    console.log(draggable);
    if (draggable) {
      const { width, height } = draggable.getBoundingClientRect();
      setDragSize({ width, height });
      console.log("Draggable size:", width, height);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Layout>
        <Home dropped={isDropped} droppedItem={droppedItem} />
      </Layout>
    </DndContext>
  );
};

export default App;
