import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { TonConnectUIProvider} from "@tonconnect/ui-react";



const manifestUrl =
  "https://raw.githubusercontent.com/draysongz/dreamerzclone/main/public/manifest.json";

import App from "./App.tsx";
import './index.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <TonConnectUIProvider manifestUrl={manifestUrl} >
    <ChakraProvider>
      {" "}
      <App />
    </ChakraProvider>
   </TonConnectUIProvider>
  </StrictMode>
);
