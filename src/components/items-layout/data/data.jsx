import { FaCalendarAlt } from "react-icons/fa";
import { RxDragHandleDots1 } from "react-icons/rx";

import { useDragAndDropContext } from "../../../providers/drag-and-drop-provider";

export const Data = ({ dataId }) => {
  const { droppedItems } = useDragAndDropContext();
  const numberData = droppedItems.filter((item) =>
    item.id.includes("data"),
  ).length;

  return (
    <div className="flex items-center border border-blue-500 rounded-lg w-36 px-3 py-4 bg-white shadow-sm">
      {numberData != 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {numberData}
        </div>
      )}
      <div className="mr-0 bg-blue-100 p-2 rounded-full text-blue-600">
        <FaCalendarAlt />
      </div>
      <div className="text-gray-800 textarea-md font-semibold ml-1 first-letter:uppercase">
        {dataId}
      </div>
      <div className="relative ml-4 text-gray-400 hover:text-gray-600 cursor-pointer">
        <RxDragHandleDots1 className="w-8 h-8 rotate-90" />
      </div>
    </div>
  );
};
