import { useState } from "react";
import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { useProjects } from "@/hooks/wordpress";
import { Film, Briefcase, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { data: projects, isLoading } = useProjects({ per_page: 100 });

  const categories = [
    { value: "all", label: "Toate Proiectele", icon: Briefcase },
    { value: "film", label: "Film & Video", icon: Film },
    { value: "social", label: "Proiecte Sociale", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Portofoliu</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              Proiectele <span className="gradient-text">Noastre</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explorează proiectele speciale care definesc identitatea OWH Studio
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.value)}
                  className="shadow-sm"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 animate-fade-up">
            {[
              { number: "8", label: "Proiecte Active" },
              { number: "15+", label: "Parteneri" },
              { number: "1000+", label: "Beneficiari" },
              { number: "20+", label: "Premii" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="glass-effect p-6 rounded-xl text-center hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="aspect-video rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                ?.filter((project) =>
                  selectedCategory === "all" ? true : project.category === selectedCategory
                )
                .map((project, index) => (
                  <div
                    key={project.id}
                    className="group glass-effect rounded-xl overflow-hidden hover-lift animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.featured_image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                          {project.year}
                        </span>
                        {project.status && (
                          <span className="text-xs px-2 py-1 bg-cinema-orange/20 text-cinema-orange rounded">
                            {project.status}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
