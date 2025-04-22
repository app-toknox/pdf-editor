import { cn } from "../utils";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children, className }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className={cn("flex h-screen w-screen", className)}>{children}</div>
    </div>
  );
};
