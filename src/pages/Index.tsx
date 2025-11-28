import { Toaster } from "@/components/ui/sonner";
import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import HeroEnhanced from "@/components/HeroEnhanced";
import ServicesPreview from "@/components/ServicesPreview";
import FeaturedWork from "@/components/FeaturedWork";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <HeaderNew />
      <main className="relative">
        <HeroEnhanced />
        <ServicesPreview />
        <FeaturedWork />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
