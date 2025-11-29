import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { useSheetsFilms } from "@/hooks/sheets/useFilms";
import { Film, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Timeline } from "@/components/ui/timeline";

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
                <InteractiveHoverButton
                  key={category.value}
                  text={category.label}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`min-w-[240px] px-8 py-3 text-base shadow-sm ${
                    selectedCategory === category.value
                      ? "border-cinema-gold bg-cinema-gold/10"
                      : ""
                  }`}
                />
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
            <Timeline
              data={years.map((year) => {
                const items = groupedByYear?.[year] || [];
                return {
                  title: year,
                  content: (
                    <div>
                      <p className="text-foreground text-xs md:text-sm font-normal mb-4">
                        {items.length} {items.length === 1 ? "film" : "filme"} în {year}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {items.map((film) => (
                          <Link
                            key={film.id}
                            to={`/filme/${film.slug}`}
                            className="group hover-lift"
                          >
                            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-card">
                              <img
                                src={film.poster_url || "/placeholder.svg"}
                                alt={film.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    "/placeholder.svg";
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              {film.category && (
                                <div className="absolute top-2 left-2">
                                  <span className="px-2 py-1 text-xs rounded-full bg-cinema-gold/90 text-cinema-darker font-medium">
                                    {film.category}
                                  </span>
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-sm md:text-base font-heading font-bold text-white mb-1 line-clamp-2">
                                  {film.title}
                                </h3>
                                {film.duration && (
                                  <div className="flex items-center gap-1 text-xs text-white/80">
                                    <Clock className="w-3 h-3" />
                                    {film.duration} min
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ),
                };
              })}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FilmePage;
