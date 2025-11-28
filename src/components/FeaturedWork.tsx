import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Play, Award, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-gradient-to-b from-background to-cinema-dark/20">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Proiect Special
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">CRONOGRAF</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Festivalul Internațional de Film Documentar din Chișinău
          </p>
        </motion.div>

        {/* Feature Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden glass-effect border border-border/50 group">
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-cinema-dark via-primary/20 to-cinema-darker">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728')] bg-cover bg-center opacity-20 group-hover:scale-110 transition-transform duration-700" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-12 md:p-16">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Text Content */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cinema-orange/20 border border-cinema-orange/50">
                    <Award className="w-4 h-4 text-cinema-orange" />
                    <span className="text-sm font-medium text-cinema-orange">
                      Festival Internațional
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-heading font-bold">
                    Cronograf
                    <span className="block text-2xl md:text-3xl text-muted-foreground mt-2">
                      Film Documentar
                    </span>
                  </h3>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Un eveniment cinematografic unic care celebrează arta documentarului,
                    aducând la Chișinău cele mai importante producții și profesioniști din
                    întreaga lume.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-cinema-orange" />
                      <span>Ediția 2024</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Play className="w-5 h-5 text-primary" />
                      <span>Peste 100 de filme</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="mt-6 group/btn"
                    asChild
                  >
                    <Link to="/cronograf">
                      Descoperă CRONOGRAF
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </Button>
                </div>

                {/* Right: Visual Element */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative"
                >
                  <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-cinema-orange/20 to-primary/20 border border-border/50 overflow-hidden hover-lift">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1440404653325-ab127d49abc1')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-transparent to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-cinema-orange/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-6 -right-6 px-6 py-4 rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-white font-bold text-lg shadow-glow"
                  >
                    2024
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cinema-orange/10 to-transparent rounded-br-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWork;
