import { FaFileSignature } from "react-icons/fa6";
import { RxDragHandleDots1 } from "react-icons/rx";

import useNumberItems from "../../../hooks/useNumberItems";

export const Signature = ({ signId }) => {
  const { numberItems } = useNumberItems(signId);
  return (
    <div className="flex items-center border border-blue-500 rounded-lg px-3 py-3 bg-white shadow-sm w-fit">
      {numberItems != 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {numberItems}
        </div>
      )}
      <div className="mr-0 bg-blue-100 p-2 rounded-full text-blue-600">
        <FaFileSignature />
      </div>
      <div className="text-gray-800 textarea-md font-semibold ml-1 first-letter:uppercase">
        {signId}
      </div>
      <div className="relative ml-4 text-gray-400 hover:text-gray-600 cursor-pointer">
        <RxDragHandleDots1 className="w-8 h-8 rotate-90" />
      </div>
    </div>
  );
};
