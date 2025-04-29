import { cn } from "../utils";
import { ModalExample } from "./modal/formText";
import { Sidebar } from "./sidebar";

export const Layout = ({ children, className }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={cn("flex min-h-screen w-screen", className)}>
        {children}
      </div>
    </div>
  );
};
