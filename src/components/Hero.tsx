import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import heroImage from "@/assets/hero-cinema.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="OWH Studio Cinema"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-darker/80 via-cinema-dark/60 to-cinema-dark"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center" id="acasa">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
            OWH Studio<br />
            <span className="text-cinema-orange">Film. Producție. Inspirație.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 font-body">
            Documentare, producții comerciale, festivaluri.<br />
            <span className="text-lg text-cinema-orange">Înființat în 1995</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" className="group" asChild>
              <a href="#filme">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Vezi Filme
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#servicii">Servicii</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-cinema-orange/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cinema-orange rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
