import { FiEdit2, FiX } from "react-icons/fi";

import { useManagerZustand } from "../../hooks/useManagerZustand";

const GeneralItemLayout = ({ item }) => {
  const { openEditForm, selectItem, handleSelection, handleRemove } =
    useManagerZustand();
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
      onDoubleClick={() => openEditForm(item)}
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
            onClick={() => handleRemove(item.id)}
          />
          <FiEdit2
            className="absolute top-1 -right-6 text-gray-500 hover:text-blue-600 cursor-pointer"
            onClick={() => openEditForm(item)}
          />
        </>
      )}
      <div className="w-full h-full flex items-center justify-center text-center">
        {item.payload.img ? (
          <img
            src={item.payload.img}
            alt="Signature"
            className="max-h-full max-w-full object-contain ml-2"
            draggable={false}
          />
        ) : item.payload.text ? (
          <div style={{ fontFamily: item.payload.style }}>
            {item.payload.text}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GeneralItemLayout;
