import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "./contexts/RoleContext";
import { UserProvider } from "./contexts/UserContext";
import { SimulationProvider } from "./contexts/SimulationContext";
import { AuthProvider } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Access from "./pages/Access";
import Dashboard from "./pages/Dashboard";
import ScenarioSetup from "./pages/ScenarioSetup";
import Processing from "./pages/Processing";
import Analysis from "./pages/Analysis";
import Comparison from "./pages/Comparison";
import History from "./pages/History";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <UserProvider>
          <RoleProvider>
            <SimulationProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/access" element={<Access />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/scenario-setup" element={<ScenarioSetup />} />
                <Route path="/processing" element={<Processing />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/comparison" element={<Comparison />} />
                <Route path="/history" element={<History />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SimulationProvider>
          </RoleProvider>
        </UserProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
