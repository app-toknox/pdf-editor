import { DndContext } from "@dnd-kit/core";

import { Layout } from "./components/layout";
import useDragAndDrop from "./hooks/useDragAndDrop";
import { Home } from "./pages/home";

const App = () => {
  const {
    positions,
    sensors,
    droppedItems,
    handleDragEnd,
    itemWaitingForText,
    confirmText,
    setItemWaitingForText,
    deleteItem,
  } = useDragAndDrop();
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Layout
        positions={positions}
        confirmText={confirmText}
        itemWaitingForText={itemWaitingForText}
        setItemWaitingForText={setItemWaitingForText}
      >
        <Home droppedItems={droppedItems} deleteItem={deleteItem} />
      </Layout>
    </DndContext>
  );
};

export default App;
