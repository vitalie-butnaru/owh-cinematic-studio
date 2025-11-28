import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSheetsFilm } from "@/hooks/sheets/useFilm";
import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, ArrowLeft, Play, ShoppingCart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Film {
  id: string;
  title: string;
  poster_url?: string;
  trailer_url?: string | null;
  description?: string;
  release_year?: number | null;
  duration?: number | null;
  genre?: string | null;
  director?: string | null;
  purchase_link?: string | null;
  credits?: Array<{ role: string; name: string }>;
}

const FilmDetailPage = () => {
  const { slug } = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: sheetFilm, isLoading } = useSheetsFilm(slug || "");
  const [shareUrl, setShareUrl] = useState<string>("");

  useEffect(() => {
    if (sheetFilm) {
      setFilm(sheetFilm as Film);
      setLoading(false);
    }
  }, [sheetFilm]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNew />
        <div className="container mx-auto px-4 pt-32">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-muted rounded-xl" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-32 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNew />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Film not found</h1>
          <Link to="/filme">
            <Button>Back to Films</Button>
          </Link>
        </div>
      </div>
    );
  }

  const extractVideoId = (url: string) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
      return null;
    } catch {
      return null;
    }
  };

  const posterSrc = (() => {
    if (!film) return "/placeholder.svg";
    if (film.poster_url) return film.poster_url;
    if (film.trailer_url) {
      const id = extractVideoId(film.trailer_url);
      if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
    return "/placeholder.svg";
  })();

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      
      <main className="pt-24">
        {/* Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={posterSrc}
            alt={film.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
            <Link to="/filme" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Înapoi la filme
            </Link>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4">
              {film.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm">
              {film.release_year && (
                <span className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-primary" />
                  {film.release_year}
                </span>
              )}
              {film.duration && (
                <span className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-primary" />
                  {film.duration} minute
                </span>
              )}
              {film.director && (
                <span className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                  <User className="w-4 h-4 text-primary" />
                  {film.director}
                </span>
              )}
              {film.genre && (
                <span className="bg-primary text-white px-4 py-2 rounded-lg font-medium">
                  {film.genre}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div className="animate-fade-up">
                <h2 className="text-3xl font-heading font-bold mb-4">Despre film</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {film.description}
                </p>
              </div>

              {/* Trailer */}
              {film.trailer_url && extractVideoId(film.trailer_url) && (
                <div className="animate-fade-up">
                  <h2 className="text-3xl font-heading font-bold mb-6">Trailer</h2>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-card">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${extractVideoId(film.trailer_url)}`}
                      title={`${film.title} Trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Gallery */}
              
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {film?.credits && film.credits.length > 0 && (
                <div className="glass-effect p-6 rounded-xl animate-fade-up">
                  <h3 className="text-xl font-heading font-bold mb-4">Echipă</h3>
                  <div className="space-y-2">
                    {film.credits.map((c, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <User className="w-4 h-4 text-primary" />
                        <span className="font-medium">{c.role}:</span>
                        <span className="text-muted-foreground">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {film.purchase_link && (
                <div className="glass-effect p-6 rounded-xl animate-fade-up">
                  <h3 className="text-xl font-heading font-bold mb-4">
                    Achiziționează filmul
                  </h3>
                  <a href={film.purchase_link} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full shadow-glow">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Cumpără acum
                    </Button>
                  </a>
                </div>
              )}
              <div className="glass-effect p-6 rounded-xl animate-fade-up">
                <h3 className="text-xl font-heading font-bold mb-4">Distribuie filmul</h3>
                <p className="text-muted-foreground mb-4">Împărtășește această producție cu prietenii tăi</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: film?.title || "OWH Studio", url: shareUrl }).catch(() => {});
                    } else {
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
                    }
                  }}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Distribuie
                  </Button>
                  <Button variant="outline" onClick={() => {
                    navigator.clipboard?.writeText(shareUrl);
                  }}>
                    Link
                  </Button>
                  <Button variant="secondary" onClick={() => {
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(film?.title || '')}`, '_blank');
                  }}>
                    Twitter
                  </Button>
                  <Button variant="secondary" onClick={() => {
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent((film?.title || '') + ' ' + shareUrl)}`, '_blank');
                  }}>
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FilmDetailPage;
