import { useEffect } from "react";
import { useState } from "react";

import { useDragAndDropContext } from "../providers/drag-and-drop-provider";

function useUpdateDelete() {
  const { setDroppedItems, itemWaitingForContent ,setItemWaitingForContent } = useDragAndDropContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (itemWaitingForContent) {
      setIsModalOpen(true);
    }
  }, [itemWaitingForContent]);

  const handleSubmitForm = (text) => {
    if (itemWaitingForContent) {
      const completedItems = {
        ...itemWaitingForContent,
        data: {
          ...itemWaitingForContent.data,
        },
      };
      setDroppedItems((prev) => [...prev, completedItems]);
      setItemWaitingForContent(null);
    }
  };

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

  return { deleteItem, updateItem };
}

export default useUpdateDelete;
