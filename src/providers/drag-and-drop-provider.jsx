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
    droppedItems,
    handleDragEnd,
    itemWaitingForContent,
    setItemWaitingForContent,
    setDroppedItems,
  } = useDragAndDrop();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const context = {
    droppedItems,
    itemWaitingForContent,
    setItemWaitingForContent,
    setDroppedItems,
  };
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
