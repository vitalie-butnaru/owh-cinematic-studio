import { useState } from "react";
import { Button } from "@/components/ui/button";

const ProductionSection = () => {
  const [activeCategory, setActiveCategory] = useState("toate");

  const categories = [
    { id: "toate", label: "Toate" },
    { id: "publicitate", label: "Publicitate" },
    { id: "sociale", label: "Spoturi Sociale" },
    { id: "institutionale", label: "Filme Instituționale" },
    { id: "animatii", label: "Animații" },
  ];

  const projects = [
    {
      id: 1,
      title: "Campanie Brand X",
      client: "Brand X",
      category: "publicitate",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Campanie Educațională",
      client: "Ministerul Educației",
      category: "sociale",
      thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Prezentare Corporativă",
      client: "Corp Industries",
      category: "institutionale",
      thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Animație Explicativă",
      client: "Tech Startup",
      category: "animatii",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    },
  ];

  const filteredProjects = activeCategory === "toate" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="productie" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Producție <span className="text-cinema-orange">Video</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            De la spoturi publicitare la filme corporative și animații.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-full"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group hover-lift cursor-pointer">
              <div className="relative aspect-video rounded-md overflow-hidden bg-card hover-zoom">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-darker via-cinema-darker/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-heading font-bold mb-1">{project.title}</h3>
                  <p className="text-sm text-foreground/80">{project.client}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductionSection;
