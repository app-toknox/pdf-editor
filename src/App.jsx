import { DndContext } from "@dnd-kit/core";

import { Layout } from "./components/layout";
import { Home } from "./pages/Home";

const App = () => {
  return (
    <DndContext>
      <Layout>
        <Home />
      </Layout>
    </DndContext>
  );
};

export default App;
