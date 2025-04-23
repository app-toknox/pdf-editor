import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

import { Layout } from "./components/layout";
import { Home } from "./pages/Home";

const App = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [droppedItem, setDroppedItem] = useState(null);

  const handleDragEnd = (event) => {
    if (!event.over) return;

    if (event.over.id === "pdf") {
      const { clientX, clientY } = event.activatorEvent;
      const canvas = document.getElementById("pdf");

      const rect = canvas.getBoundingClientRect();
      const x = clientX;
      const y = clientY;
      setIsDropped(true);
      setDroppedItem({
        id: event.active.id,
        position: { x, y },
        label: event.active.id,
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Layout>
        {JSON.stringify(droppedItem)}
        <Home dropped={isDropped} droppedItem={droppedItem} />
      </Layout>
    </DndContext>
  );
};

export default App;
