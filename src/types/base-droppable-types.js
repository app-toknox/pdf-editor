export const getFormattedDate = () => {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

export const dataItem = (type, x, y) => ({
  id: `${type}-${Date.now()}`,
  type,
  x,
  y,
  width: 170,
  height: 50,
  payload: { text: getFormattedDate() },
});

export const generalItem = (type, x, y) => ({
  id: `${type}-${Date.now()}`,
  type,
  x,
  y,
  width: 170,
  height: 50,
  payload: { text: `${type} not provided` },
});

export const textItem = (type, x, y) => ({
  id: `${type}-${Date.now()}`,
  type,
  x,
  y,
  width: 170,
  height: 50,
  payload: { text: "text" },
});

export const getItemByType = (type, x, y) => {
  if (type === "Data") return dataItem(type, x, y);
  if (type === "Text") return textItem(type, x, y);
  return generalItem(type, x, y);
};
