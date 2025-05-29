import { InputPdfFile } from "@/components/input-pdf-file";
import { PdfEditor } from "@/components/pdf-editor";
import { usePDFStore } from "@/hooks/usePdf";

const App = () => {
  const { setPDFFile, pdfFile } = usePDFStore();
  return (
    <div className="w-[1200px] h-[800px] border border-gray-300">
      <InputPdfFile setPdf={setPDFFile} />
      <PdfEditor pdfFile={pdfFile} />
    </div>
  );
};

export default App;
