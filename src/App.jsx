import { useState } from "react";
import { InputPdfFile } from "./components/input-pdf-file";
import { Layout } from "./components/layout";
import { PdfViewer } from "./components/pdf-viewer";

const App = () => {
  const [pdf, setPdf] = useState();

  return (
    <Layout>
      <div className="flex w-full items-center flex-col gap-4 my-8">
        <h1 className="text-2xl">PDF EDITOR TOKNOX DEMO</h1>
        <InputPdfFile setPdf={setPdf} />
  
        <PdfViewer pdf={pdf} />
      </div>
    </Layout>
  );
};

export default App;
