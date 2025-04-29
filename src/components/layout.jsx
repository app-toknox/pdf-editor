import { cn } from "../utils";
import { ModalExample } from "./modal/formText";
import { Sidebar } from "./sidebar";

export const Layout = ({
  positions,
  children,
  className,
  itemWaitingForText,
  confirmText,
  setItemWaitingForText,
}) => {
  return (
    <div className="flex min-h-screen">
      {itemWaitingForText && (
        <ModalExample
          open={true}
          onTextSubmit={(text) => confirmText(text)}
          onClose={() => setItemWaitingForText(null)}
        />
      )}
      <Sidebar finalPositions={positions} />
      <div className={cn("flex min-h-screen w-screen", className)}>
        {children}
      </div>
    </div>
  );
};
