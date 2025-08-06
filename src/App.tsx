import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CentralNoivas from "./pages/CentralNoivas";
import ConvidadosPage from "./pages/ConvidadosPage";
import Login from "./pages/Login";
import FormularioPosPagamento from "./pages/FormularioPosPagamento";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/central-noivas" element={<CentralNoivas />} />
          <Route path="/convidados" element={<ConvidadosPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/formulario-pos-pagamento" element={<FormularioPosPagamento />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
