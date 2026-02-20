import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AppLayout from "@/components/AppLayout";
import LoginPage from "@/pages/LoginPage";
import Index from "@/pages/Index";
import EventsPage from "@/pages/EventsPage";
import EventDetailPage from "@/pages/EventDetailPage";
import PeoplePage from "@/pages/PeoplePage";
import FleetPage from "@/pages/FleetPage";
import TestersPage from "@/pages/TestersPage";
import StandsPage from "@/pages/StandsPage";
import ContentPage from "@/pages/ContentPage";
import KnowledgePage from "@/pages/KnowledgePage";
import SchedulePage from "@/pages/SchedulePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.mustChangePassword) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated && !user?.mustChangePassword) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
      <Route path="/events/:id" element={<ProtectedRoute><EventDetailPage /></ProtectedRoute>} />
      <Route path="/people" element={<ProtectedRoute><PeoplePage /></ProtectedRoute>} />
      <Route path="/fleet" element={<ProtectedRoute><FleetPage /></ProtectedRoute>} />
      <Route path="/testers" element={<ProtectedRoute><TestersPage /></ProtectedRoute>} />
      <Route path="/stands" element={<ProtectedRoute><StandsPage /></ProtectedRoute>} />
      <Route path="/content" element={<ProtectedRoute><ContentPage /></ProtectedRoute>} />
      <Route path="/knowledge" element={<ProtectedRoute><KnowledgePage /></ProtectedRoute>} />
      <Route path="/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
