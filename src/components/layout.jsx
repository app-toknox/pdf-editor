import { PdfPagesSidebar } from "@/components/pdf-pages-sidebar";
import { ToolsSidebar } from "@/components/tools-sidebar";

export const Layout = ({ children, exportPdf }) => {
  return (
    <div className="flex h-full w-full overflow-hidden bg-white">
      <PdfPagesSidebar />
      {children}
      <ToolsSidebar>{exportPdf}</ToolsSidebar>
    </div>
  );
};
