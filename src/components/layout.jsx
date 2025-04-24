import { cn } from "../utils";
import { Sidebar } from "./sidebar";

export const Layout = ({ position, children, className }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar finalPosition={position} />
      <div className={cn("flex min-h-screen w-screen", className)}>
        {children}
      </div>
    </div>
  );
};
