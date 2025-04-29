import { createContext, useContext } from "react";

export const DragAndDropContext = createContext(null);

export const useDragAndDropContext = () => useContext(DragAndDropContext);
