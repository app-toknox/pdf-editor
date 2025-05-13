import { Rnd } from "react-rnd";

import { ELEMENT_TYPES } from "../types/element-types";

export const NewDraggableItem = ({
  item,
  onDragStop,
  onResize,
  onRemove,
  openEditForm,
  editItem,
  selectItem,
  handleSelection,
}) => {
  const Element = ELEMENT_TYPES[item.type]?.component;

  return (
    <Rnd
      size={{ width: item.width, height: item.height }}
      position={{ x: item.x, y: item.y }}
      onDragStop={(e, d) => onDragStop(item.id, d.x, d.y)}
      onResize={(e, direction, ref, delta, position) =>
        onResize(
          item.id,
          ref.offsetWidth,
          ref.offsetHeight,
          position.x,
          position.y,
        )
      }
      bounds="parent"
    >
      {Element ? (
        <Element
          onRemove={onRemove}
          item={item}
          openEditForm={openEditForm}
          editItem={editItem}
          selectItem={selectItem}
          handleSelection={handleSelection}
        />
      ) : (
        item.type
      )}
    </Rnd>
  );
};
