import { FiEdit2, FiX } from "react-icons/fi";

export const SignatureComponent = ({
  item,
  onRemove,
  openEditForm,
  selectItem,
  handleSelection,
}) => {
  return (
    <div
      className={`relative w-full h-full bg-transparent rounded cursor-move ${
        item.id === selectItem?.id ? "border border-dashed border-gray-400" : ""
      }`}
      style={{ fontSize: `${Math.min(item.width, item.height) / 4}px` }}
      onClick={(e) => {
        e.stopPropagation();
        handleSelection(item);
      }}
      onDoubleClick={() => openEditForm(item.id)}
    >
      {item.id === selectItem?.id && (
        <>
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 cursor-nw-resize rounded-full" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 cursor-ne-resize rounded-full" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 cursor-sw-resize rounded-full" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 cursor-se-resize rounded-full" />
          <FiX
            size="1em"
            className="absolute top-1 right-1 text-gray-500 hover:text-red-600 cursor-pointer"
            onClick={() => onRemove(item.id)}
          />
          <FiEdit2
            className="absolute top-1 -right-6 text-gray-500 hover:text-blue-600 cursor-pointer"
            onClick={() => openEditForm(item.id)}
          />
        </>
      )}
      <div className="w-full h-full flex items-center justify-center text-center">
        {typeof item.payload === "string" &&
        item.payload.startsWith("data:image") ? (
          <img
            src={item.payload}
            alt="Anteprima firma"
            className="max-h-40 object-contain pointer-events-none"
            draggable="false"
          />
        ) : (
          item.payload
        )}
      </div>
    </div>
  );
};
