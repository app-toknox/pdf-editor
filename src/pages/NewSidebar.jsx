import { NewSidebarItem } from "../components/new-sidebar-item";
import { useManagerZustand } from "../hooks/useManagerZustand";
import { ELEMENT_TYPES } from "../types/element-types";

export const NewSidebar = () => {
  const sidebarItems = Object.keys(ELEMENT_TYPES);
  const Icon = ELEMENT_TYPES[sidebarItems]?.icon;
  const { configuredTemplates } = useManagerZustand();
  const signatureStampTemplates = configuredTemplates.filter(
    (template) =>
      template.type === "Signature" || template.type === "Stamp",
  );

  console.log("SEIDEC", configuredTemplates);
  return (
    <aside className="w-1/3 bg-base-200 p-6 border-l border-gray-200 flex flex-col rounded-tl-3xl rounded-bl-3xl shadow-md relative overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2 border-gray-300">
        Items
      </h2>
      <div className="flex-1 overflow-y-auto pb-24">
        <nav>
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
        {signatureStampTemplates.length > 0 && (
          <ul className="space-y-2">
            {signatureStampTemplates.map((template) => (
              <li key={template.id}>ciao</li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};
