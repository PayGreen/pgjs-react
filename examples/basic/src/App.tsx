import { PGJSProvider } from "@paygreen/pgjs-react";
import "./App.css";
import PayGreenForm from "./components/PayGreenForm";

function App() {
  return (
    <PGJSProvider devMode>
      <PayGreenForm />
    </PGJSProvider>
  );
}

export default App;
