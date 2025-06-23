import { useState } from "react";

import { InputPdfFile } from "@/components/input-pdf-file";
import { PdfEditor } from "@/components/pdf-editor";

const App = () => {
  const [setPdf, useSetPdf] = useState(null);
  const [locale, setLocale] = useState("it");

  const handleExport = (file) => {
    console.log("Ricevuto PDF esportato:", file);
  };

  return (
    <div className="w-[1200px] h-[800px] border border-gray-300 ">
      <button onClick={() => setLocale("it")}> it </button>
      <button onClick={() => setLocale("en")}> en </button>
      <InputPdfFile setPdf={useSetPdf} />
      <PdfEditor pdfFile={setPdf} handleExport={handleExport} locale={locale} />
    </div>
  );
};

export default App;
