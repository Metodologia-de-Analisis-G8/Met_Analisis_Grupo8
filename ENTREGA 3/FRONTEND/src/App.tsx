import Router from "./routes/Routes";
import { useRoutes } from "react-router-dom";

function App() {
  const content = useRoutes(Router);
  return content;
}
export default App;
