import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeaderNew = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Filme", path: "/filme" },
    { label: "Producție video", path: "/productie" },
    { label: "Emisiuni", path: "/emisiuni" },
    { label: "Rental", path: "/rental" },
    { label: "Bilete", path: "/bilete" },
    { label: "Despre noi", path: "/despre-noi" },
    { label: "Contacte", path: "/contacte" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-effect shadow-lg"
          : "bg-gradient-to-b from-cinema-dark to-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group z-50">
            <img 
              src="https://owh.md/imagini_lucru/logo.png" 
              alt="OWH Studio" 
              className="h-16 w-auto group-hover:scale-105 transition-transform brightness-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(item.path)
                    ? "bg-primary text-white shadow-glow"
                    : "text-foreground hover:bg-secondary hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* CRONOGRAF Special Button */}
            <Link to="/cronograf">
              <Button
                variant="outline"
                className="ml-4 border-2 border-accent text-accent hover:bg-accent hover:text-white font-bold transition-all hover-glow"
              >
                CRONOGRAF
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Fullscreen */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-cinema-darker/98 backdrop-blur-lg animate-fade-in overflow-y-auto">
            {/* Close button */}
            <button
              className="fixed top-6 right-6 p-3 rounded-lg bg-cinema-orange/20 hover:bg-cinema-orange transition-colors z-[110]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-8 h-8 text-white" />
            </button>
            
            <nav className="flex flex-col items-center justify-center min-h-screen space-y-6 px-6 py-24">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl sm:text-3xl font-heading font-bold transition-all ${
                    isActive(item.path)
                      ? "text-cinema-orange scale-110"
                      : "text-white hover:text-cinema-orange hover:scale-105"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/cronograf"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8"
              >
                <Button
                  size="lg"
                  className="border-2 border-cinema-orange bg-cinema-orange text-white hover:bg-white hover:text-cinema-orange font-bold text-xl sm:text-2xl px-8 sm:px-12 py-6 sm:py-8 shadow-2xl hover:shadow-cinema-orange/50 transition-all"
                >
                  CRONOGRAF
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderNew;
