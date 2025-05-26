import { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { FiEdit2, FiX } from "react-icons/fi";

import { useToolManager } from "@/hooks/useToolManager";

const GeneralItemLayout = ({ item }) => {
  const [textEditable] = useState(item.payload?.textEditable);
  const [isHover, setIsHover] = useState(false);
  const ref = useRef(null);

  const {
    openEditForm,
    selectItem,
    handleSelection,
    handleRemove,
    submitEditForm,
    handleCopy,
    handlePaste,
    updateItemMetadata,
  } = useToolManager();

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const styles = window.getComputedStyle(ref.current);

    updateItemMetadata(item.id, {
      widthSmallDiv: rect.width,
      heightSmallDiv: rect.height,
      fontSize: parseFloat(styles.fontSize),
    });
  }, [item.id, updateItemMetadata]);

  return (
    <div
      className={`relative w-full h-full bg-transparent rounded cursor-move p-5 flex items-center justify-center
        ${item.id === selectItem?.id ? "border border-dashed border-gray-400" : ""}
        ${isHover ? "border border-dashed border-blue-500" : ""}
      `}
      onClick={(e) => {
        e.stopPropagation();
        handleSelection(item);
      }}
      onDoubleClick={() => openEditForm(item)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {item.id === selectItem?.id && (
        <>
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 cursor-nw-resize rounded-full" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 cursor-ne-resize rounded-full" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 cursor-sw-resize rounded-full" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 cursor-se-resize rounded-full" />
          <FiX
            size="1em"
            className="absolute top-1 -right-6 text-gray-500 hover:text-red-600 cursor-pointer"
            onClick={() => handleRemove(item.id)}
          />
          <FiEdit2
            className="absolute top-1 right-1 text-gray-500 hover:text-blue-600 cursor-pointer w-3 h-3"
            onClick={() => openEditForm(item)}
          />
          <FaCopy
            className="absolute top-6 right-1 text-gray-500 hover:text-blue-600 cursor-pointer w-3 h-3"
            onClick={() => {
              handleCopy();
              handlePaste();
            }}
          />
        </>
      )}

      <div
        className={`w-full h-full ${isHover && "border border-red-300"} ${item.id === selectItem?.id && "border border-blue-400"} flex items-center justify-center text-center`}
      >
        {item.payload.img ? (
          <img
            ref={ref}
            src={item.payload.img}
            alt="Signature"
            className="max-h-full max-w-full object-contain ml-2"
            draggable={false}
            onLoad={() => {
              if (!ref.current) return;
              const rect = ref.current.getBoundingClientRect();
              updateItemMetadata(item.id, {
                widthImage: rect.width,
                heightImage: rect.height,
              });
            }}
          />
        ) : item.payload.text ? (
          <div style={{ fontFamily: item.payload.style }} ref={ref}>
            {item.payload.text}
          </div>
        ) : item.payload.textEditable ? (
          <div
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              submitEditForm(item.id, { textEditable: e.target.innerText });
            }}
          >
            {textEditable}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GeneralItemLayout;
