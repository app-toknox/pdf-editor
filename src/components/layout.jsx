import { NewSidebar } from "../pages/NewSidebar";
import { Sidebar } from "../pages/Sidebar";
import { cn } from "../utils";

export const Layout = ({ children, className }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className={cn("flex min-h-screen w-screen", className)}>
        {children}
      </div>
      <NewSidebar />
    </div>
  );
};
