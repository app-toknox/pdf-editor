export const NewSidebarItem = ({ item, Icon }) => {
  const handleDragStart = (e) => {
    //e.dataTransfer.setData("application/json", JSON.stringify(type));
    e.dataTransfer.setData("application/json", item);
  };

  return (
    <div draggable={true} onDragStart={handleDragStart} className="flex">
      {Icon && <Icon size="1.25em" className="text-gray-600 mr-2" />}
      {item}
    </div>
  );
};
