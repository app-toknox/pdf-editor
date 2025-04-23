import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

import { Layout } from "./components/layout";
import { Home } from "./pages/Home";

const App = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [droppedItem, setDroppedItem] = useState(null);

  const handleDragEnd = (event) => {
    if (!event.over) return;

    if (event.over.id === "droppable") {
      const { clientX, clientY } = event.activatorEvent;

      const dropZone = document.getElementById("pdf");
      if (!dropZone) return;

      const x = clientX;
      const y = clientY;

      setIsDropped(true);
      setDroppedItem({
        type: event.active.data.current?.type,
        id: event.active.id,
        position: { x, y },
        label: event.active.id,
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Layout>
        <Home dropped={isDropped} droppedItem={droppedItem} />
      </Layout>
    </DndContext>
  );
};

export default App;
