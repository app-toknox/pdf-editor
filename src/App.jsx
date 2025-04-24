import { DndContext } from "@dnd-kit/core";

import { Layout } from "./components/layout";
import useDragAndDrop from "./hooks/useDragAndDrop";
import { Home } from "./pages/home";

const App = () => {
  const { position, sensors, handleDragEnd } = useDragAndDrop();
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Layout position={position}>
        <Home />
      </Layout>
    </DndContext>
  );
};

export default App;
