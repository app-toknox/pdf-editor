import { useState } from "react";

// hook usato solo per i vari form + modofica item
function useItemManager({ items, setItems, setConfiguredTemplates }) {
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
    console.log(editingItemId);
  };

  const closeEditForm = () => {
    setEditingItemId(null);
  };

  const submitEditForm = (itemId, newPayload) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, payload: newPayload } : item,
      ),
    );

    submitConfiguredTemplates(itemId, newPayload);

    setEditingItemId(null);
  };

  const submitConfiguredTemplates = (itemId, newPayload) => {
    const editedItem = items.find((item) => item.id === itemId);
    if (editedItem) {
      setConfiguredTemplates((prev) =>
        prev.map((template) =>
          template.data === editedItem.data && template.payload === ""
            ? { ...template, payload: newPayload }
            : template,
        ),
      );
    }
  };

  return {
    items,
    setItems,
    editingItemId,
    editItem,
    removeItem,
    openEditForm,
    closeEditForm,
    submitEditForm,
  };
}

export default useItemManager;
