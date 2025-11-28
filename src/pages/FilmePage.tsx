import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { useSheetsFilms } from "@/hooks/sheets/useFilms";
import { Film, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const categories = [
  { value: "all", label: "Toate" },
  { value: "documentare", label: "Documentare" },
  { value: "fictiune", label: "Ficțiune" },
  { value: "prezentare", label: "Filme de Prezentare" },
  { value: "publicitate", label: "Publicitate" },
  { value: "altele", label: "Alte producții video" },
  { value: "proiecte", label: "Proiecte" },
  { value: "distributie", label: "Distribuție" },
];

const FilmePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: films, isLoading } = useSheetsFilms({ 
    category: selectedCategory !== "all" ? selectedCategory : undefined
  });

  const groupedByYear = films?.reduce((acc, film) => {
    const year = film.release_year || "Fără an";
    if (!acc[year]) acc[year] = [];
    acc[year].push(film);
    return acc;
  }, {} as Record<string, typeof films>);

  const years = groupedByYear ? Object.keys(groupedByYear).sort((a, b) => {
    if (a === "Fără an") return 1;
    if (b === "Fără an") return -1;
    return Number(b) - Number(a);
  }) : [];

  const [expandedYears, setExpandedYears] = useState<string[]>([]);

  const toggleYear = (year: string) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Film className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Filme</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              Portofoliul <span className="gradient-text">Cinematografic</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explorează producțiile noastre cinematografice - povești autentice
              spuse prin prisma artei vizuale
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

          {/* Films Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="aspect-[2/3] rounded-xl" />
              ))}
            </div>
          ) : !films || films.length === 0 ? (
            <div className="text-center py-20">
              <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">
                Nu s-au putut încărca filmele din Google Sheets. Verifică că documentul
                este public sau publicat și că tab-ul are numele corect.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Dacă tab-ul nu se numește „Filme”, setează variabila `VITE_GOOGLE_SHEETS_FILMS_SHEET`.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {years.map((year) => {
                const items = groupedByYear?.[year] || [];
                const isOpen = expandedYears.includes(year);
                return (
                  <div key={year} className="rounded-xl border border-border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-heading font-bold">{year}</span>
                        <span className="px-3 py-1 text-xs rounded-full bg-secondary text-foreground">
                          {items.length} filme
                        </span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => toggleYear(year)}>
                        {isOpen ? "Ascunde" : "Vezi filme"}
                      </Button>
                    </div>
                    {isOpen && (
                      <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {items.map((film, index) => (
                            <Link
                              key={film.id}
                              to={`/filme/${film.slug}`}
                              className="group hover-lift"
                              style={{ animationDelay: `${index * 0.05}s` }}
                            >
                              <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-card">
                                <img
                                  src={film.poster_url || "/placeholder.svg"}
                                  alt={film.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  loading="lazy"
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-3 left-3 flex gap-2">
                                  {film.category && (
                                    <span className="px-3 py-1 text-xs rounded-full bg-primary/80 text-white">
                                      {film.category}
                                    </span>
                                  )}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                  <h3 className="text-xl font-heading font-bold text-white mb-2">
                                    {film.title}
                                  </h3>
                                  <div className="flex flex-wrap gap-3 text-xs text-white/80">
                                    {film.duration && (
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {film.duration} min
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FilmePage;
