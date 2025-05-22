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
  width: 170,
  height: 85,
  payload: { text: getFormattedDate() },
});

export const generalItem = (type, x, y, page) => ({
  id: `${type}-${Date.now()}`,
  type,
  x,
  y,
  page,
  width: 170,
  height: 100,
  payload: { text: `${type} not provided` },
});

export const textItem = (type, x, y, page) => ({
  id: `${type}-${Date.now()}`,
  type,
  x,
  y,
  page,
  width: 150,
  height: 85,
  payload: { textEditable: "text" },
});

export const getItemByType = (type, x, y, page) => {
  if (type === "Data") return dataItem(type, x, y, page);
  if (type === "Text") return textItem(type, x, y, page);
  return generalItem(type, x, y, page);
};
