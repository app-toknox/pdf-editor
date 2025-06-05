import { ToolItem } from "@/components/tool-item";
import { ELEMENT_TYPES } from "@/types/element-types";

export const ToolsSidebar = ({ children }) => {
  const sidebarItems = Object.keys(ELEMENT_TYPES);

  return (
    <aside className="w-1/3 bg-base-200 p-6 border-l border-gray-200 flex flex-col rounded-tl-3xl rounded-bl-3xl shadow-md relative overflow-hidden ">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-300">
        Tools
      </h2>
      <div className="flex-1 overflow-y-auto pb-24">
        <nav>
          <ul className="space-y-3">
            {sidebarItems.map((item, index) => {
              const Icon = ELEMENT_TYPES[item]?.icon;
              return (
                <li key={`item-${index}`}>
                  <ToolItem item={item} Icon={Icon} />
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
