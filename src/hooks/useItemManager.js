import { useState } from "react";

// hook usato solo per i vari form + modofica item
function useItemManager(initialItems) {
  const [items, setItems] = useState(initialItems || []);
  const [editingItemId, setEditingItemId] = useState(null);

  const editItem = (itemId, newValues) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, ...newValues } : item,
      ),
    );
  };

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const openEditForm = (itemId) => {
    setEditingItemId(itemId);
  };

  const closeEditForm = () => {
    setEditingItemId(null);
  };

  return {
    items,
    setItems,
    editingItemId,
    editItem,
    removeItem,
    openEditForm,
    closeEditForm,
  };
}

export default useItemManager;
