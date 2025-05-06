import { useDragAndDropContext } from "../providers/drag-and-drop-provider";

function useNumberItems(searchId) {
  const { droppedItems } = useDragAndDropContext();
  const numberItems = droppedItems.filter((item) =>
    item.id.includes(searchId),
  ).length;

  return { numberItems };
}

export default useNumberItems;
