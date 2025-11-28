import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FilmePage from "./pages/FilmePage";
import FilmDetailPage from "./pages/FilmDetailPage";
import ProductiePage from "./pages/ProductiePage";
import ProductionDetailPage from "./pages/ProductionDetailPage";
import RentalPage from "./pages/RentalPage";
import BiletePage from "./pages/BiletePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CronografPage from "./pages/CronografPage";
import SeriesPage from "./pages/SeriesPage";
import SeriesDetailPage from "./pages/SeriesDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import PortfolioPage from "./pages/PortfolioPage";
import LoginPage from "./pages/auth/LoginPage";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import BlogManagePage from "./pages/admin/BlogManagePage";
import FilmsPage from "./pages/admin/FilmsPage";
import ProductionsPage from "./pages/admin/ProductionsPage";
import EquipmentPage from "./pages/admin/EquipmentPage";
import SeriesManagePage from "./pages/admin/SeriesManagePage";

const queryClient = new QueryClient();

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/filme" element={<FilmePage />} />
          <Route path="/filme/:slug" element={<FilmDetailPage />} />
          <Route path="/productie" element={<ProductiePage />} />
          <Route path="/productie/:slug" element={<ProductionDetailPage />} />
          <Route path="/rental" element={<RentalPage />} />
          <Route path="/bilete" element={<BiletePage />} />
          <Route path="/despre-noi" element={<AboutPage />} />
          <Route path="/contacte" element={<ContactPage />} />
          <Route path="/cronograf" element={<CronografPage />} />
          <Route path="/emisiuni" element={<SeriesPage />} />
          <Route path="/emisiuni/:slug" element={<SeriesDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/portofoliu" element={<PortfolioPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="blog" element={<BlogManagePage />} />
            <Route path="films" element={<FilmsPage />} />
            <Route path="productions" element={<ProductionsPage />} />
            <Route path="equipment" element={<EquipmentPage />} />
            <Route path="series" element={<SeriesManagePage />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
