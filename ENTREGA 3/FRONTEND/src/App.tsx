import MobileWrapper from "./components/MobileWrapper";
import Router from "./routes/Routes";
import { useRoutes } from "react-router-dom";

function App() {
  const content = useRoutes(Router);

  return <MobileWrapper>{content}</MobileWrapper>;
}

export default App;
