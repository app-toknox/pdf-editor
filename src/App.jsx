import { DndContext } from "@dnd-kit/core";

import { Layout } from "./components/layout";
import useDragAndDrop from "./hooks/useDragAndDrop";
import { Home } from "./pages/home";

const App = () => {
  const { positions, sensors, droppedItems, handleDragEnd } = useDragAndDrop();
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Layout positions={positions}>
        <Home droppedItems={droppedItems} />
      </Layout>
    </DndContext>
  );
};

export default App;
