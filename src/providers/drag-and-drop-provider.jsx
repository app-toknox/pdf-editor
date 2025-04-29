import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createContext, useContext } from "react";

import useDragAndDrop from "../hooks/useDragAndDrop";

const DragAndDropContext = createContext(undefined);

export const DragAndDropProvider = ({ children }) => {
  const {
    positions,
    droppedItems,
    handleDragEnd,
    itemWaitingForText,
    setItemWaitingForText,
    deleteItem,
    updateItem,
    handleSubmitForm,
  } = useDragAndDrop();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const context = {
    positions,
    droppedItems,
    itemWaitingForText,
    setItemWaitingForText,
    deleteItem,
    updateItem,
    handleSubmitForm,
  };
  console.log("===", positions);
  return (
    <DragAndDropContext.Provider value={context}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {children}
      </DndContext>
    </DragAndDropContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDragAndDropContext = () => {
  const context = useContext(DragAndDropContext);
  if (!context) throw new Error("No context found");
  return context;
};
