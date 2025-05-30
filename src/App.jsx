import { InputPdfFile } from "@/components/input-pdf-file";
import { PdfEditor } from "@/components/pdf-editor";
import { usePDFStore } from "@/hooks/usePdf";

const App = () => {
  const { setPDFFile, pdfFile } = usePDFStore();
  const handleExport = (blob) => {
    console.log("Ricevuto PDF esportato:", blob);
  };
  return (
    <div className="w-[1200px] h-[800px] border border-gray-300">
      <InputPdfFile setPdf={setPDFFile} />
      <PdfEditor pdfFile={pdfFile} handleExport={handleExport} />
    </div>
  );
};

export default App;
