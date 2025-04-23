import { DraggableItem } from "./draggable-item";

export const Sidebar = () => {
  //esempio di items
  const items = [
    { id: "stamp", label: "Timbro" },
    { id: "signature", label: "Firma" },
  ];
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r">
      <h2 className="text-lg font-bold mb-4">Strumenti</h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <DraggableItem key={item.id} id={item.id} label={item.label} />
        ))}
      </div>
    </aside>
  );
};
