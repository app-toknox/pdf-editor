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

      const dropZoneRect = document
        .getElementById("pdf")
        .getBoundingClientRect();

      const x = clientX - dropZoneRect.left;
      const y = clientY - dropZoneRect.top;

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
        {droppedItem && <pre>{JSON.stringify(droppedItem, null, 2)}</pre>}
        <Home dropped={isDropped} droppedItem={droppedItem} />
      </Layout>
    </DndContext>
  );
};

export default App;
