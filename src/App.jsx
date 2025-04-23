import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

import { Layout } from "./components/layout";
import { Home } from "./pages/Home";

const App = () => {
  const [isDropped, setIsDropped] = useState(false);
  //const draggableMarkup = <DraggableItem>Drag me</DraggableItem>;

  const handleDragEnd = (event) => {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Layout>
        <Home dropped={isDropped} />
      </Layout>
    </DndContext>
  );
};

export default App;
