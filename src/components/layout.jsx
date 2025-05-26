import { cn } from "../utils/index";
import { PdfPagesSidebar } from "./pdf-pages-sidebar";
import { ToolsSidebar } from "./tools-sidebar";

export const Layout = ({ children, className = "" }) => {
  return (
    <div className="flex min-h-screen">
      <PdfPagesSidebar />
      <div className={cn("flex min-h-screen w-screen", className)}>
        {children}
      </div>
      <ToolsSidebar />
    </div>
  );
};
