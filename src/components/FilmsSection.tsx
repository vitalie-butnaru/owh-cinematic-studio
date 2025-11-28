import FilmCard from "./FilmCard";

const FilmsSection = () => {
  const films = [
    {
      id: "1",
      title: "Drumul Către Lumină",
      year: "2023",
      genre: "Documentar",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    },
    {
      id: "2",
      title: "Ecouri din Trecut",
      year: "2023",
      genre: "Scurtmetraj",
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    },
    {
      id: "3",
      title: "Povești Urbane",
      year: "2022",
      genre: "Documentar",
      poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    },
    {
      id: "4",
      title: "Orizonturi Noi",
      year: "2022",
      genre: "Experimental",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    },
    {
      id: "5",
      title: "Simetrie",
      year: "2021",
      genre: "Scurtmetraj",
      poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    },
  ];

  return (
    <section id="filme" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Catalog Filme <span className="text-cinema-orange">OWH</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descoperă colecția noastră de documentare, scurtmetraje și producții experimentale.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {films.map((film) => (
            <FilmCard key={film.id} {...film} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilmsSection;
