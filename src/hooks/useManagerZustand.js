import { create } from "zustand";

import { getItemByType } from "../types/base-droppable-types";

export const useManagerZustand = create((set, get) => ({
  items: [],
  // configuredTemplates: [], //questo è il preload di tutti i componenti
  numberItems: [],
  selectItem: null,
  //selectTemplateItem: null,
  copiedItem: null,
  editingItem: null,
  //editingTemplates: null,

  setItems: (newItem) => {
    const current = get().items;
    const updated = [...current, newItem];
    set({ items: updated });
  },

  // setConfiguredTemplates: (templates) => {
  //   const current = get().configuredTemplates;
  //   const updated = [...current, templates];
  //   set({ configuredTemplates: updated });
  // },

  // setDeleteTemplates: (template) => {
  //   const current = get().configuredTemplates;
  //   const updated = current.filter((item) => item !== template);
  //   set({ configuredTemplates: updated });
  // },

  // submitConfiguredTemplates: (type, newPayload) => {
  //   const timestamp = Date.now();
  //   const newTemplate = {
  //     id: `${type}-${timestamp}`,
  //     type: type,
  //     payload: {
  //       [type]: newPayload,
  //     },
  //     selected: true,
  //   };
  //   const current = get().configuredTemplates;
  //   const updated = [...current, newTemplate];
  //   set({ configuredTemplates: updated });
  //   set({
  //     editingTemplates: null,
  //   });
  //   console.log("step 3 upgrade templates", updated);
  // },

  // handleAddTemplate: (templateType) => {
  //   const timestamp = Date.now();
  //   const newTemplate = {
  //     id: `${templateType}-${timestamp}`,
  //     type: templateType,
  //     payload: {
  //       type: "",
  //       data: "",
  //       style: "",
  //     },
  //     selected: true,
  //   };

  //   set({
  //     editingTemplates: newTemplate,
  //   });
  // },

  // submitFormTemplate: (itemId, type, newPayload) => {
  //   const updatedTemplates = get().configuredTemplates.map((template) =>
  //     template.id === itemId
  //       ? {
  //           ...template,
  //           payload: {
  //             ...template.payload,
  //             [type]: newPayload,
  //           },
  //         }
  //       : template
  //   );
  //   set({ configuredTemplates: updatedTemplates });
  //   set({ editingTemplates: null });
  // },

  handleDropData: (type, x, y) => {
    const newItem = getItemByType(type, x, y);

    if (type === "Signature" || type === "Stamp") {
      get().openEditForm(newItem);
    }

    get().setItems(newItem);
    get().handleNumberItems(newItem);
    get().handleSelection(newItem);
  },

  // handleDropData: (type, x, y) => {
  //   const isAlreadyConfigured = get().configuredTemplates.find(
  //     (t) => t.type === type,
  //   );
  //   const newItem = {
  //     id: `${type}-${Date.now()}`,
  //     type,
  //     x,
  //     y,
  //     width: 170,
  //     height: 50,
  //     payload: isAlreadyConfigured?.payload || "",
  //   };

  //   if (!isAlreadyConfigured) {
  //     get().openEditForm(newItem);
  //     console.log("step 1 form + newItem", newItem);
  //   }
  //   get().setItems(newItem);
  // },

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
  // setSelectTemplateItem: (item) => set({ selectTemplateItem: item }),

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
    }
  },

  handleDelete: () => {
    const selected = get().selectItem;
    if (selected) {
      const filteredItems = get().items.filter(
        (item) => item.id !== selected.id,
      );
      set({ items: filteredItems, selectItem: null });
    }
  },

  editItem: (itemId, newValues) => {
    const editedItems = get().items.map((item) =>
      item.id === itemId ? { ...item, ...newValues } : item,
    );
    set({ items: editedItems });
  },

  removeItem: (itemId) => {
    const filteredItems = get().items.filter((item) => item.id !== itemId);
    set({ items: filteredItems });
  },
}));
