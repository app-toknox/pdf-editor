import { Trans } from "@lingui/react/macro";

import { ToolItem } from "@/components/tool-item";
import { ELEMENT_TYPES } from "@/types/element-types";

export const ToolsSidebar = ({ children }) => {
  const sidebarItems = Object.keys(ELEMENT_TYPES);

  return (
    <aside className="w-1/3 bg-base-200 p-6 border-l border-gray-200 flex flex-col rounded-tl-3xl rounded-bl-3xl shadow-md relative overflow-hidden ">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b pb-2 border-gray-300">
        <Trans>Tools</Trans>
      </h2>
      <div className="flex-1 overflow-y-auto pb-24">
        <nav>
          <ul className="space-y-3">
            {sidebarItems.map((item, index) => {
              const Icon = ELEMENT_TYPES[item]?.icon;
              const labelKey = ELEMENT_TYPES[item]?.labelKey;
              return (
                <li key={`item-${index}`}>
                  <ToolItem item={item} Icon={Icon} labelKey={labelKey} />
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="mt-auto">{children}</div>
    </aside>
  );
};
