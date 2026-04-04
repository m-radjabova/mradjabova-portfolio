import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
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
          hideProgressBar
          closeButton={false}
          theme="light"
          toastClassName={() =>
            "min-h-[72px] rounded-[1.35rem] border border-[var(--border-soft)] bg-[color:var(--card-bg)] px-4 py-3 text-base text-[var(--text-primary)] shadow-[0_18px_40px_rgba(255,107,154,0.16)] backdrop-blur-2xl"
          }
        />
      </CreateContextPro>
    </BrowserRouter>
  </QueryClientProvider>
);
