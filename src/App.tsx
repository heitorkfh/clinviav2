
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Agenda from "./pages/agenda";
import NovoAgendamento from "./pages/novo-agendamento";
import PublicBooking from "./pages/public-booking";
import Patients from "./pages/patients";
import Procedures from "./pages/procedures";
import Settings from "./pages/settings";
import CompanyProfile from "./pages/company-profile";
import Atendimento from "./pages/atendimento";
import ProfessionalSetup from "./pages/professional-setup";
import MarketingLeads from "./pages/marketing/leads";
import MarketingDisparos from "./pages/marketing/disparos";
import MarketingFerramentas from "./pages/marketing/ferramentas";
import MarketingConfiguracoes from "./pages/marketing/configuracoes";
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
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<ProfessionalSetup />} />
          <Route path="/agendar" element={<PublicBooking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda/novo" element={<NovoAgendamento />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/procedures" element={<Procedures />} />
          <Route path="/procedures/new" element={<Procedures />} />
          <Route path="/procedures/:id" element={<Procedures />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/atendimento" element={<Atendimento />} />
          <Route path="/marketing/leads" element={<MarketingLeads />} />
          <Route path="/marketing/disparos" element={<MarketingDisparos />} />
          <Route path="/marketing/ferramentas" element={<MarketingFerramentas />} />
          <Route path="/marketing/configuracoes" element={<MarketingConfiguracoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
