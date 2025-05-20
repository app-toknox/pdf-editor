import { Rnd } from "react-rnd";

import { useManagerZustand } from "../hooks/useManagerZustand";
import { ELEMENT_TYPES } from "../types/element-types";

export const NewDraggableItem = ({ item }) => {
  const Element = ELEMENT_TYPES[item.type]?.component;
  const { handleDragStart, handleDragStop, handleResizeStop } =
    useManagerZustand();
  return (
    <Rnd
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
