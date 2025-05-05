import "react-resizable/css/styles.css";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { ResizableBox } from "react-resizable";

import { ItemsLayout } from "./items-layout/itemsLayout";

export const DraggableItem = ({ id, content, position, index }) => {
  const { attributes, listeners, transform, isDragging, setNodeRef } =
    useDraggable({
      id,
      data: { content, index },
    });

  const [size, setSize] = useState({ width: 100, height: 35 });

  const handleResize = (event, { size }) => {
    setSize(size);
  };

  const style = {
    opacity: isDragging ? 0.5 : 1,
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div style={style} className="z-20">
      <ResizableBox
        width={size.width}
        height={size.height}
        minConstraints={[150, 75]}
        maxConstraints={[400, 300]}
        resizeHandles={["se"]}
        className="border bg-white shadow"
        onResize={handleResize}
      >
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className="w-full h-full p-3 flex items-center justify-center cursor-move border-amber-200"
          style={{
            fontSize: `${Math.max(12, size.width / 10)}px`,
          }}
        >
          <ItemsLayout id={id} content={content} />
        </div>
      </ResizableBox>
    </div>
  );
};
