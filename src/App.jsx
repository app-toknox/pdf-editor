import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { DragAndDropProvider } from "./providers/drag-and-drop-provider";

const App = () => {
  return (
    <DragAndDropProvider>
      <Layout>
        <Home />
      </Layout>
    </DragAndDropProvider>
  );
};

export default App;
