import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Play, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Series {
  id: string;
  title: string;
  description: string;
  poster_url: string | null;
}

interface Episode {
  id: string;
  title: string;
  description: string | null;
  episode_number: number;
  video_url: string;
  thumbnail_url: string | null;
  duration: number | null;
  release_date: string | null;
}

const SeriesDetailPage = () => {
  const { slug } = useParams();
  const [series, setSeries] = useState<Series | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    fetchSeriesDetails();
  }, [slug]);

  const fetchSeriesDetails = async () => {
    try {
      const { data: seriesData, error: seriesError } = await supabase
        .from("series")
        .select("*")
        .eq("slug", slug)
        .single();

      if (seriesError) throw seriesError;
      setSeries(seriesData);

      const { data: episodesData, error: episodesError } = await supabase
        .from("episodes")
        .select("*")
        .eq("series_id", seriesData.id)
        .order("episode_number");

      if (episodesError) throw episodesError;
      setEpisodes(episodesData || []);
      if (episodesData && episodesData.length > 0) {
        setSelectedEpisode(episodesData[0]);
      }
    } catch (error) {
      console.error("Error fetching series details:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-cinema-orange" />
      </div>
    );
  }

  if (!series) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNew />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Seria nu a fost găsită</h1>
          <Link to="/emisiuni">
            <Button>Înapoi la Emisiuni</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cinema-dark via-background to-cinema-dark opacity-95" />
        {series.poster_url && (
          <div className="absolute inset-0 opacity-20">
            <img src={series.poster_url} alt={series.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            <span className="gradient-text">{series.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{series.description}</p>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {episodes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Nu există episoade disponibile</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Video Player */}
              <div className="lg:col-span-2">
                {selectedEpisode && (
                  <div className="space-y-6 animate-fade-up">
                    <div className="aspect-video bg-cinema-dark rounded-lg overflow-hidden">
                      {extractVideoId(selectedEpisode.video_url) ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${extractVideoId(selectedEpisode.video_url)}`}
                          title={selectedEpisode.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-muted-foreground">Video indisponibil</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h2 className="text-3xl font-heading font-bold mb-4">
                        Episodul {selectedEpisode.episode_number}: {selectedEpisode.title}
                      </h2>

                      <div className="flex flex-wrap gap-4 mb-4">
                        {selectedEpisode.duration && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{selectedEpisode.duration} min</span>
                          </div>
                        )}
                        {selectedEpisode.release_date && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(selectedEpisode.release_date).toLocaleDateString("ro-RO")}</span>
                          </div>
                        )}
                      </div>

                      {selectedEpisode.description && (
                        <p className="text-muted-foreground leading-relaxed">{selectedEpisode.description}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Episodes List */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-heading font-bold mb-6">Episoade</h3>
                <div className="space-y-4">
                  {episodes.map((episode) => (
                    <button
                      key={episode.id}
                      onClick={() => setSelectedEpisode(episode)}
                      className={`w-full text-left p-4 rounded-lg border transition-all hover-lift ${
                        selectedEpisode?.id === episode.id
                          ? "bg-cinema-orange/10 border-cinema-orange"
                          : "bg-card border-border hover:border-cinema-orange/50"
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="relative w-32 h-20 flex-shrink-0 rounded overflow-hidden bg-cinema-dark/30">
                          {episode.thumbnail_url ? (
                            <img
                              src={episode.thumbnail_url}
                              alt={episode.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Play className="w-8 h-8 text-cinema-orange opacity-50" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-cinema-orange font-semibold mb-1">
                            Episodul {episode.episode_number}
                          </div>
                          <h4 className="font-semibold line-clamp-2 mb-2">{episode.title}</h4>
                          {episode.duration && (
                            <div className="text-sm text-muted-foreground">{episode.duration} min</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SeriesDetailPage;
