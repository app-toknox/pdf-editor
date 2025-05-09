export const DataComponent = ({ onRemove, item }) => {
  const dateObj = new Date();
  const formattedDate = dateObj.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div
      className="relative w-full h-full bg-white border-1 border-dashed border-gray-400 rounded cursor-move"
      style={{ fontSize: `${Math.min(item.width, item.height) / 4}px` }}
      onDoubleClick={() => onRemove(item.id)}
    >
      {/* resize handles */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-gray-500 cursor-nw-resize rounded-full" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-500 cursor-ne-resize rounded-full" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gray-500 cursor-sw-resize rounded-full" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gray-500 cursor-se-resize rounded-full" />
      <button
        className="absolute top-1 right-1 text-gray-500 hover:text-red-600"
        onClick={() => onRemove(item.id)}
      >
        &times;
      </button>
      <div className="w-full h-full flex items-center justify-center text-center">
        {formattedDate}
      </div>
    </div>
  );
};
