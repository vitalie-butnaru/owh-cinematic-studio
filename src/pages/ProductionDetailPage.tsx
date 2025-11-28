import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar, Briefcase, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Production {
  id: string;
  title: string;
  description: string;
  category: string;
  client: string | null;
  year: number | null;
  gif_preview_url: string;
  video_url: string | null;
}

const ProductionDetailPage = () => {
  const { slug } = useParams();
  const [production, setProduction] = useState<Production | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduction();
  }, [slug]);

  const fetchProduction = async () => {
    try {
      const { data, error } = await supabase
        .from("productions")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      setProduction(data);
    } catch (error) {
      console.error("Error fetching production:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      publicitate: "Publicitate",
      spoturi_sociale: "Spoturi Sociale",
      filme_institutionale: "Filme Instituționale",
      animatii: "Animații",
      emisiuni: "Emisiuni",
    };
    return categories[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-cinema-orange" />
      </div>
    );
  }

  if (!production) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNew />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Producția nu a fost găsită</h1>
          <Link to="/productie">
            <Button>Înapoi la Producție</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Link to="/productie">
            <Button variant="ghost" className="mb-8 hover-lift">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi la Producție
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Media */}
            <div className="space-y-6 animate-fade-up">
              {production.video_url && extractVideoId(production.video_url) ? (
                <div className="aspect-video bg-cinema-dark rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractVideoId(production.video_url)}`}
                    title={production.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-cinema-dark rounded-lg overflow-hidden">
                  <img
                    src={production.gif_preview_url}
                    alt={production.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div>
                <div className="inline-block px-4 py-2 bg-cinema-orange/10 text-cinema-orange rounded-full text-sm font-semibold mb-4">
                  {getCategoryName(production.category)}
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{production.title}</h1>
              </div>

              <div className="flex flex-wrap gap-6">
                {production.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cinema-orange" />
                    <div>
                      <div className="text-sm text-muted-foreground">An</div>
                      <div className="font-semibold">{production.year}</div>
                    </div>
                  </div>
                )}
                {production.client && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-cinema-orange" />
                    <div>
                      <div className="text-sm text-muted-foreground">Client</div>
                      <div className="font-semibold">{production.client}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-2xl font-heading font-bold mb-4">Despre proiect</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {production.description}
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-xl font-heading font-bold mb-4">Servicii oferite</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cinema-orange" />
                    <span className="text-muted-foreground">Concept și scenariu</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cinema-orange" />
                    <span className="text-muted-foreground">Producție video</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cinema-orange" />
                    <span className="text-muted-foreground">Post-producție și editare</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cinema-orange" />
                    <span className="text-muted-foreground">Sound design</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <Link to="/contacte">
                  <Button size="lg" className="w-full hover-lift">
                    Discută proiectul tău
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductionDetailPage;
