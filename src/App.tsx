import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AssetsPage from "./pages/AssetsPage";
import AlertsPage from "./pages/AlertsPage";
import HandOverPage from "./pages/HandOverPage";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import PrincipalAssetsPage from "./pages/PrincipalAssetsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assets/:category" element={<AssetsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/handover" element={<HandOverPage />} />
          <Route path="/principal" element={<PrincipalDashboard />} />
          <Route path="/principal/assets" element={<PrincipalAssetsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
