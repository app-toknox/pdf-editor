import { PdfPagesSidebar } from "@/components/pdf-pages-sidebar";
import { ToolsSidebar } from "@/components/tools-sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <PdfPagesSidebar />
      {children}
      <ToolsSidebar />
    </div>
  );
};
