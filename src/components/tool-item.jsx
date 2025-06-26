import { Trans } from "@lingui/react/macro";
import { RxDragHandleDots1 } from "react-icons/rx";

import { useToolManager } from "@/hooks/useToolManager";

export const ToolItem = ({ item, Icon, labelKey }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("application/json", item);
  };

  const { numberItems } = useToolManager();

  const itemCount = numberItems.find((el) => el.type === item)?.number || 0;

  const renderLabel = () => {
    switch (labelKey) {
      case "Signature":
        return <Trans>Signature</Trans>;
      case "Stamp":
        return <Trans>Stamp</Trans>;
      case "Text":
        return <Trans>Text</Trans>;
      case "Data":
        return <Trans>Data</Trans>;
      default:
        return item;
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center p-4 mb-3 bg-white border border-gray-200 shadow-sm rounded-lg cursor-move hover:shadow-md transition-shadow space-x-3"
    >
      <RxDragHandleDots1 className="text-gray-400 h-6 w-6" />
      {Icon && <Icon size="1.25em" className="text-gray-600" />}
      <span className="text-gray-800 font-light">{renderLabel()}</span>
      {itemCount > 0 && (
        <div className="ml-auto text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {itemCount}
        </div>
      )}
    </div>
  );
};
