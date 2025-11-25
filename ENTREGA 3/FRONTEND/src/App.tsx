import { useRoutes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Router from "./routes/Routes";

function App() {
  const location = useLocation();
  const content = useRoutes(Router);

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        {content}
      </div>
    </AnimatePresence>
  );
}

export default App;
