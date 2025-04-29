import { DndContext } from "@dnd-kit/core";

import { Layout } from "./components/layout";
import { DragAndDropContext } from "./content/dragAndDropContext";
import useDragAndDrop from "./hooks/useDragAndDrop";
import { Home } from "./pages/home";

const App = () => {
  const {
    positions,
    sensors,
    droppedItems,
    handleDragEnd,
    itemWaitingForText,
    setItemWaitingForText,
    deleteItem,
    updateItem,
    handleSubmitForm,
  } = useDragAndDrop();
  return (
    <DragAndDropContext.Provider
      value={{
        positions,
        droppedItems,
        sensors,
        handleDragEnd,
        itemWaitingForText,
        setItemWaitingForText,
        deleteItem,
        updateItem,
        handleSubmitForm,
      }}
    >
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Layout>
          <Home />
        </Layout>
      </DndContext>
    </DragAndDropContext.Provider>
  );
};

export default App;
