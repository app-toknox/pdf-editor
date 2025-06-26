import { Rnd } from "react-rnd";

import { useToolManager } from "@/hooks/useToolManager";
import { ELEMENT_TYPES } from "@/types/element-types";

export const NewDraggableItem = ({ item }) => {
  const Element = ELEMENT_TYPES[item.type]?.component;
  const { handleDragStart, handleDragStop, handleResizeStop } =
    useToolManager();
  return (
    <Rnd
      maxHeight={125}
      maxWidth={250}
      minHeight={85}
      minWidth={150}
      size={{ width: item.width, height: item.height }}
      position={{ x: item.x, y: item.y }}
      onDragStop={(e, d) => handleDragStop(item.id, d.x, d.y)}
      onDragStart={() => handleDragStart(item)}
      onResize={(e, direction, ref, delta, position) =>
        handleResizeStop(
          item.id,
          ref.offsetWidth,
          ref.offsetHeight,
          position.x,
          position.y,
        )
      }
      bounds="parent"
    >
      {Element ? <Element item={item} /> : item.type}
    </Rnd>
  );
};
