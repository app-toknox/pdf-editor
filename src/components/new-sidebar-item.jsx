import { RxDragHandleDots1 } from "react-icons/rx";

import { useManagerZustand } from "../hooks/useManagerZustand";

export const NewSidebarItem = ({ item, Icon }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("application/json", item);
  };

  const { numberItems } = useManagerZustand();

  const itemCount = numberItems.find((el) => el.type === item)?.number || 0;
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center p-4 mb-3 bg-white border border-gray-200 shadow-sm rounded-lg cursor-move hover:shadow-md transition-shadow space-x-3"
    >
      <RxDragHandleDots1 className="text-gray-400 h-6 w-6" />
      {Icon && <Icon size="1.25em" className="text-gray-600" />}
      <span className="text-gray-800 font-medium">{item}</span>
      {itemCount > 0 && (
        <div className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {itemCount}
        </div>
      )}
    </div>
  );
};
