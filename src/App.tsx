import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound"; // Always Must Include

// Import new pages
import DashboardPage from "./pages/DashboardPage";
import JointAccountOverviewPage from "./pages/JointAccountOverviewPage";
import JointAccountCreationInitiationPage from "./pages/JointAccountCreationInitiationPage";
import JointAccountInvitationPermissionsPage from "./pages/JointAccountInvitationPermissionsPage";
import AccountDetailsTransactionPage from "./pages/AccountDetailsTransactionPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route redirects to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Application Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/joint-account-overview/:accountId" element={<JointAccountOverviewPage />} />
          <Route path="/joint-account/create/initiate" element={<JointAccountCreationInitiationPage />} />
          <Route path="/joint-account/create/invite" element={<JointAccountInvitationPermissionsPage />} />
          <Route path="/account-details/:accountId" element={<AccountDetailsTransactionPage />} />
          <Route path="/account-details" element={<AccountDetailsTransactionPage />} /> {/* For general /account-details view */}


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;