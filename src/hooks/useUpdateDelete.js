import { useDragAndDropContext } from "../providers/drag-and-drop-provider";

function useUpdateDelete() {
  const { setDroppedItems, setItemWaitingForContent } = useDragAndDropContext();
  const deleteItem = (id) => {
    console.log("Deleting item with id:", id);
    setDroppedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id, newContent) => {
    setDroppedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, data: { ...item.data, content: newContent } }
          : item,
      ),
    );
  };

  const newItem = (itemWaitingForContent, newContent) => {
    const newIt = {
      ...itemWaitingForContent,
      data: {
        ...itemWaitingForContent.data,
        content: newContent,
      },
    };
    console.log("new item con content nuovo", newIt);
    setDroppedItems((prev) => [...prev, newIt]);
    setItemWaitingForContent({});
  };

  return { deleteItem, updateItem, newItem };
}

export default useUpdateDelete;
