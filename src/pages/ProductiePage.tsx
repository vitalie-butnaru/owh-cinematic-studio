import { useState } from "react";
import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { useProductions } from "@/hooks/wordpress";
import { Video } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { value: "all", label: "Toate" },
  { value: "publicitate", label: "Publicitate" },
  { value: "spoturi_sociale", label: "Spoturi Sociale" },
  { value: "filme_institutionale", label: "Filme Instituționale" },
  { value: "animatii", label: "Animații" },
  { value: "emisiuni", label: "Emisiuni" },
];

const ProductiePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: productions, isLoading } = useProductions({
    per_page: 100,
    category: selectedCategory !== "all" ? selectedCategory : undefined,
  });

  const getCategoryLabel = (value: string) => {
    return categories.find(cat => cat.value === value)?.label || value;
  };

  const groupedByCategory = productions?.reduce((acc, production) => {
    const cat = production.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(production);
    return acc;
  }, {} as Record<string, typeof productions>);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Video className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Producție Video</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              Servicii de <span className="gradient-text">Producție</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              De la publicitate comercială la documentare sociale - fiecare proiect este o poveste unică
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.value)}
                  className="shadow-sm"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Productions Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="aspect-video rounded-xl" />
              ))}
            </div>
          ) : !productions || productions.length === 0 ? (
            <div className="text-center py-20">
              <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">
                {selectedCategory === "all" 
                  ? "În curând vom adăuga producțiile noastre aici"
                  : "Nu există producții în această categorie"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productions.map((production, index) => (
                <Link
                  key={production.id}
                  to={`/productie/${production.slug}`}
                  className="group animate-fade-up hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-card bg-muted">
                    <img
                      src={production.gif_preview_url}
                      alt={production.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-primary/80 text-white rounded">
                          {getCategoryLabel(production.category)}
                        </span>
                        {production.year && (
                          <span className="text-xs px-2 py-1 bg-secondary/80 text-white rounded">
                            {production.year}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-white mb-1">
                        {production.title}
                      </h3>
                      {production.client && (
                        <p className="text-sm text-white/80">
                          Client: {production.client}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Emisiuni Section Link */}
          <div className="mt-20 text-center glass-effect p-12 rounded-2xl animate-fade-up">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Emisiuni TV
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explorează emisiunile noastre: Știu că Știi, Identitate.Basarabia, 
              EU sunt aici, Expedițiile Memoriei
            </p>
            <Link to="/emisiuni">
              <Button size="lg" className="shadow-glow">
                Vezi toate emisiunile
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductiePage;
