
import React from 'react' // Make sure React is explicitly imported
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Detection from "./pages/Detection";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// AnimatedRoutes component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <div className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/detection" element={<Detection />} />
        <Route path="/login" element={<Login />} />
        {/* Placeholder for future dashboard page */}
        <Route path="/dashboard" element={<div className="min-h-screen flex items-center justify-center bg-credping-black text-white">Dashboard Page (Coming Soon)</div>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
