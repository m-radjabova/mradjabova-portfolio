import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateContextPro from "./hooks/CreateContextPro.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <CreateContextPro>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
          toastClassName={() =>
            "rounded-2xl border border-white/10 bg-slate-900/90 text-sm text-slate-100 shadow-2xl backdrop-blur"
          }
        />
      </CreateContextPro>
    </BrowserRouter>
  </QueryClientProvider>
);
