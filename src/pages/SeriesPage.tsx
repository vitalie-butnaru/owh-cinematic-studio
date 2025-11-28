import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Play } from "lucide-react";

interface Series {
  id: string;
  title: string;
  slug: string;
  description: string;
  poster_url: string | null;
  is_active: boolean;
}

const SeriesPage = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      const { data, error } = await supabase
        .from("series")
        .select("*")
        .eq("is_active", true)
        .order("title");

      if (error) throw error;
      setSeries(data || []);
    } catch (error) {
      console.error("Error fetching series:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cinema-dark via-background to-cinema-dark opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37')] bg-cover bg-center opacity-20" />

        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            <span className="gradient-text">Emisiuni</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Programe TV și seria de documentare produse de OWH Studio
          </p>
        </div>
      </section>

      {/* Series Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="w-12 h-12 animate-spin text-cinema-orange" />
            </div>
          ) : series.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                În curând vom adăuga emisiuni noi
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {series.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/emisiuni/${item.slug}`}
                  className="group animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-video bg-card">
                    {item.poster_url ? (
                      <img
                        src={item.poster_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-cinema-dark/30">
                        <Play className="w-16 h-16 text-cinema-orange opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="w-12 h-12 rounded-full bg-cinema-orange flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-cinema-orange transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SeriesPage;
