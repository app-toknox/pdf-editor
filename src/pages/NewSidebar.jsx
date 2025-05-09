import { NewSidebarItem } from "../components/new-sidebar-item";
import { ELEMENT_TYPES } from "../types/element-types";

export const NewSidebar = () => {
  const sidebarItems = Object.keys(ELEMENT_TYPES);
  const Icon = ELEMENT_TYPES[sidebarItems]?.icon;

  console.log(Icon, sidebarItems);
  return (
    <aside className="w-64 h-screen bg-base-200 p-6 border-l-1 flex flex-col">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Strumenti</h2>
      <nav className="overflow-y-auto">
        <ul className="space-y-3">
          {sidebarItems.map((item) => {
            const Icon = ELEMENT_TYPES[item]?.icon;
            return (
              <li key={item}>
                <NewSidebarItem item={item} Icon={Icon} />
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
