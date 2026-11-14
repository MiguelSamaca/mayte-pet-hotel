import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { capturarAtribucion } from "./lib/atribucion";

// Antes de renderizar, para que los enlaces de WhatsApp ya lleven el código de la campaña.
capturarAtribucion();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
