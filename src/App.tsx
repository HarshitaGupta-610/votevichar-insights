import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "./contexts/RoleContext";
import Landing from "./pages/Landing";
import Access from "./pages/Access";
import Dashboard from "./pages/Dashboard";
import ScenarioSetup from "./pages/ScenarioSetup";
import Processing from "./pages/Processing";
import Analysis from "./pages/Analysis";
import Comparison from "./pages/Comparison";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/access" element={<Access />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scenario-setup" element={<ScenarioSetup />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/insights" element={<Insights />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;