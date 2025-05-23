import { create } from "zustand";

import { getItemByType } from "../types/base-droppable-types";

export const useManagerZustand = create((set, get) => ({
  items: [],
  numberItems: [],
  selectItem: null,
  copiedItem: null,
  editingItem: null,
  setItems: (newItem) => {
    const current = get().items;
    const updated = [...current, newItem];
    set({ items: updated });
  },

  handleDropData: (type, x, y, page) => {
    const newItem = getItemByType(type, x, y, page);
    console.log(newItem);
    if (type === "Signature" || type === "Stamp") {
      get().openEditForm(newItem);
    }

    get().setItems(newItem);
    get().handleNumberItems(newItem);
    get().handleSelection(newItem);
  },

  openEditForm: (item) => set({ editingItem: item }),

  closeEditForm: () => set({ editingItem: null }),

  submitEditForm: (itemId, newPayload) => {
    const updatedItems = get().items.map((item) =>
      item.id === itemId ? { ...item, payload: newPayload } : item,
    );
    set({ items: updatedItems });
    set({ editingItem: null });
    console.log(updatedItems);
  },

  setSelectItem: (item) => set({ selectItem: item }),
  setCopiedItem: (item) => set({ copiedItem: item }),

  handleDragStop: (itemId, x, y) => {
    const currentItems = get().items;
    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, x, y } : item,
    );
    set({ items: updatedItems });
  },

  handleDragStart: (item) => {
    get().handleSelection(item);
  },

  handleResizeStop: (itemId, width, height, x, y) => {
    const currentItems = get().items;
    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, width, height, x, y } : item,
    );
    set({ items: updatedItems });
  },

  handleRemove: (itemId) => {
    const currentItems = get().items;
    const removedItem = currentItems.find((item) => item.id === itemId);
    if (removedItem) {
      get().decrementNumberItems(removedItem);
    }
    const filteredItems = currentItems.filter((item) => item.id !== itemId);
    set({ items: filteredItems });
  },

  handleNumberItems: (droppedItem) => {
    const current = get().numberItems;
    const existingItem = current.find((item) => item.type === droppedItem.type);
    if (existingItem) {
      const updated = current.map((item) =>
        item.type === droppedItem.type
          ? { ...item, number: item.number + 1 }
          : item,
      );
      set({ numberItems: updated });
    } else {
      set({ numberItems: [...current, { type: droppedItem.type, number: 1 }] });
    }
  },

  decrementNumberItems: (removedItem) => {
    const current = get().numberItems;
    const updated = current
      .map((item) =>
        item.data === removedItem.data
          ? { ...item, number: item.number - 1 }
          : item,
      )
      .filter((item) => item.number > 0);
    set({ numberItems: updated });
  },

  handleSelection: (item) => {
    set({ selectItem: item });
  },

  handleCopy: () => {
    const selected = get().selectItem;
    console.log(selected);
    if (selected) {
      set({ copiedItem: selected });
    } else {
      set({ copiedItem: null });
    }
  },

  handlePaste: () => {
    const copied = get().copiedItem;
    console.log(copied);
    if (copied) {
      const newItem = {
        ...copied,
        id: `${copied.data}-${Date.now()}`,
        x: copied.x + 20,
        y: copied.y + 20,
      };
      const updatedItems = [...get().items, newItem];
      set({
        items: updatedItems,
        selectItem: newItem,
        copiedItem: newItem,
      });
      get().handleNumberItems(newItem);
    }
  },

  handleDelete: () => {
    const selected = get().selectItem;
    if (selected) {
      const filteredItems = get().items.filter(
        (item) => item.id !== selected.id,
      );
      set({ items: filteredItems, selectItem: null });
      get().decrementNumberItems(filteredItems);
    }
  },

  editItem: (itemId, newValues) => {
    const editedItems = get().items.map((item) =>
      item.id === itemId ? { ...item, ...newValues } : item,
    );
    set({ items: editedItems });
  },

  updateItemMetadata: (id, data) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, payload: { ...item.payload, ...data } }
          : item,
      ),
    })),
}));
