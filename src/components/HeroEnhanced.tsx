import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Play, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroEnhanced = () => {
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    // Lazy load video after component mounts
    const timer = setTimeout(() => setVideoLoaded(true), 100);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0">
        {videoLoaded && (
          <iframe
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              transform: `scale(1.5) translateY(${scrollY * 0.3}px)`,
            }}
            src="https://www.youtube.com/embed/GbECRNhr4Lk?autoplay=1&mute=1&loop=1&playlist=GbECRNhr4Lk&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&disablekb=1&fs=0&iv_load_policy=3"
            title="OWH Studio Background Video"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            loading="lazy"
          />
        )}
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-cinema-darker/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-dark/80 via-cinema-dark/50 to-cinema-darker/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,15,0.8)_100%)]" />
        
        {/* Animated Dots Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-2 h-2 bg-cinema-orange rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-3 h-3 bg-primary rounded-full animate-pulse delay-75" />
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-cinema-orange rounded-full animate-pulse delay-150" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
        </div>
      </div>

      {/* Content */}
      <div 
        className="container mx-auto px-4 z-10 text-center relative py-10"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: Math.max(0, 1 - scrollY / 500)
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto space-y-6 md:space-y-8"
        >
          {/* Logo/Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect border border-border/50 mb-6"
          >
            <div className="w-2 h-2 bg-cinema-orange rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Înființat în 1995 • Peste 25 de ani de experiență
            </span>
          </motion.div>

          {/* Main Heading with Animated Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <AnimatedText
              text="OWH STUDIO"
              duration={0.08}
              delay={0.03}
              textClassName="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-heading font-bold leading-tight gradient-text"
              underlineGradient="from-cinema-orange via-primary to-cinema-orange"
              underlineHeight="h-1.5"
              underlineOffset="-bottom-3"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-3xl mx-auto px-4"
          >
            Film • Producție Video • Rental Echipament
            <br className="hidden sm:block" />
            <span className="text-cinema-orange font-medium">
              Povestea ta devine artă
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-6 md:pt-8 px-4"
          >
            <Link to="/filme" className="w-full sm:w-auto">
              <InteractiveHoverButton
                text="Explorează Filmele"
                className="w-full sm:w-auto min-w-[320px] px-10 py-4 text-base md:text-lg"
              />
            </Link>
            <Link to="/productie" className="w-full sm:w-auto">
              <InteractiveHoverButton
                text="Portofoliu Producție"
                className="w-full sm:w-auto min-w-[320px] px-10 py-4 text-base md:text-lg glass-effect"
              />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-12 md:pt-16 max-w-4xl mx-auto px-4"
          >
            {[
              { number: "25+", label: "Ani Experiență" },
              { number: "200+", label: "Proiecte Realizate" },
              { number: "50+", label: "Premii Internaționale" },
              { number: "100%", label: "Dedicare" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-4xl lg:text-5xl font-bold gradient-text mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Descoperă
          </span>
          <ChevronDown className="w-6 h-6 text-cinema-orange" />
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-br from-cinema-orange/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default HeroEnhanced;
