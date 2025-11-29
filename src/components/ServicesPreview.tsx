import { Film, Video, Camera, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import { Link } from "react-router-dom";
import { RevealImageList } from "./ui/reveal-images";

const services = [
  {
    icon: Film,
    title: "Producție Film",
    description: "Documentare și filme de ficțiune cu viziune artistică și tehnică de top",
    link: "/filme",
    gradient: "from-cinema-orange to-orange-600",
  },
  {
    icon: Video,
    title: "Producție Video",
    description: "Spoturi publicitare, filme instituționale și conținut video profesional",
    link: "/productie",
    gradient: "from-primary to-blue-600",
  },
  {
    icon: Camera,
    title: "Rental Echipament",
    description: "Camere cinema, lumini și accesorii profesionale pentru producția ta",
    link: "/rental",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Sparkles,
    title: "CRONOGRAF",
    description: "Festivalul Internațional de Film Documentar - tradiție și inovație",
    link: "/cronograf",
    gradient: "from-amber-500 to-yellow-600",
  },
];

const ServicesPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen py-20 md:py-32 relative overflow-hidden flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cinema-orange/10 text-cinema-orange text-sm font-medium mb-4">
            Serviciile Noastre
          </span>
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            De la Idee la
            <span className="gradient-text block mt-2">Ecran</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oferim servicii complete de producție video, de la concept până la
            distribuție
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={service.link}
                  className="group block h-full"
                >
                  <div className="relative h-full p-10 rounded-2xl bg-card border border-border overflow-hidden hover-lift transition-all duration-300">
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />

                    {/* Icon */}
                    <div className="relative z-10 mb-6">
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} shadow-glow`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-cinema-orange transition-colors">
                        <Icon className="inline-block w-5 h-5 text-cinema-orange mr-2 align-[-2px]" />
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex items-center text-cinema-orange font-medium text-sm">
                        Află mai mult
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cinema-orange/5 to-transparent rounded-bl-3xl pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Reveal Images Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <RevealImageList
            items={[
              {
                text: "Film",
                images: [
                  {
                    src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&auto=format&fit=crop&q=80",
                    alt: "Producție Film 1",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=80",
                    alt: "Producție Film 2",
                  },
                ],
                link: "/filme",
              },
              {
                text: "Producție",
                images: [
                  {
                    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&auto=format&fit=crop&q=80",
                    alt: "Video Producție 1",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&auto=format&fit=crop&q=80",
                    alt: "Video Producție 2",
                  },
                ],
                link: "/productie",
              },
              {
                text: "Rental",
                images: [
                  {
                    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80",
                    alt: "Echipament 1",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&auto=format&fit=crop&q=80",
                    alt: "Echipament 2",
                  },
                ],
                link: "/rental",
              },
            ]}
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16"
        >
          <Link to="/contacte">
            <InteractiveHoverButton
              text="Contactează-ne"
              className="w-auto min-w-[300px] px-12 py-4 text-base"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
