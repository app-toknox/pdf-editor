import { FiEdit2, FiX } from "react-icons/fi";

export const StampComponent = ({ onRemove, item, openEditForm }) => {
  return (
    <div
      className="relative w-full h-full bg-white border-2 border-dashed border-gray-300 rounded cursor-move"
      style={{ fontSize: `${Math.min(item.width, item.height) / 4}px` }}
      onDoubleClick={() => onRemove(item.id)}
    >
      {/* resize handles */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-gray-500 cursor-nw-resize rounded-full" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-500 cursor-ne-resize rounded-full" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gray-500 cursor-sw-resize rounded-full" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gray-500 cursor-se-resize rounded-full" />
      <FiX
        size="1em"
        className="absolute top-1 right-1 text-gray-500 hover:text-red-600 cursor-pointer"
        onClick={() => onRemove(item.id)}
      />
      <FiEdit2
        className="absolute top-1 -right-6 text-gray-500 hover:text-blue-600 cursor-pointer"
        onClick={() => openEditForm(item.id)}
      />
      <div className="w-full h-full flex items-center justify-center text-center">
        Stamp
      </div>
    </div>
  );
};
