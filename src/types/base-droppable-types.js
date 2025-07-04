export const DEFAULT_ITEM_WIDTH = 145;
export const DEFAULT_ITEM_HEIGHT = 85;

export const getFormattedDate = () => {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

export const dataItem = (type, x, y, page) => ({
  id: `${type}-${Date.now()}`,
  type,
  x,
  y,
  page,
  width: DEFAULT_ITEM_WIDTH,
  height: DEFAULT_ITEM_HEIGHT,
  payload: { text: getFormattedDate() },
});

export const generalItem = (type, x, y, page) => ({
  id: `${type}-${Date.now()}`,
  type,
  x,
  y,
  page,
  width: DEFAULT_ITEM_WIDTH,
  height: DEFAULT_ITEM_HEIGHT,
  payload: { text: `${type} not provided` },
});

export const textItem = (type, x, y, page) => ({
  id: `${type}-${Date.now()}`,
  type,
  x,
  y,
  page,
  width: DEFAULT_ITEM_WIDTH,
  height: DEFAULT_ITEM_HEIGHT,
  payload: { textEditable: "text" },
});

export const getItemByType = (type, x, y, page) => {
  if (type === "Data") return dataItem(type, x, y, page);
  if (type === "Text") return textItem(type, x, y, page);
  return generalItem(type, x, y, page);
};
