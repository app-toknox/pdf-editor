import { EditorWrapper } from "./components/editor-wrapper";
import { Layout } from "./components/layout";
import { Home } from "./pages/Home";

const App = () => {
  return (
    <Layout>
      <EditorWrapper>
        <Home />
      </EditorWrapper>
    </Layout>
  );
};

export default App;
