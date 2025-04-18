
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Threats from "./pages/Threats";
import Indicators from "./pages/Indicators";
import Intelligence from "./pages/Intelligence";
import Community from "./pages/Community";
import Analytics from "./pages/Analytics";
import DataSources from "./pages/DataSources";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { AuthState, initialAuthState, initializeAuth } from "@/lib/authService";
import ThemeProvider from "@/components/ThemeProvider";
import MainLayout from "@/components/MainLayout";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const auth = await initializeAuth();
        setAuthState(auth);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading OSCTIP...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route 
                path="/auth" 
                element={
                  authState.isAuthenticated ? 
                  <Navigate to="/chat" replace /> : 
                  <Auth onAuthSuccess={setAuthState} />
                } 
              />
              <Route 
                path="/" 
                element={
                  <MainLayout 
                    authState={authState} 
                    onLogout={() => setAuthState(initialAuthState)} 
                  />
                }
              >
                <Route path="chat" element={<Chat />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="threats" element={<Threats />} />
                <Route path="indicators" element={<Indicators />} />
                <Route path="intelligence" element={<Intelligence />} />
                <Route path="community" element={<Community />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="data-sources" element={<DataSources />} />
                <Route path="reports" element={<Reports />} />
                <Route path="profile" element={<Profile />} />
                {/* Add other routes here as we implement them */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
