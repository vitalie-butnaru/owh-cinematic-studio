import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Film {
  id: string;
  title: string;
  slug: string;
  description: string;
  poster_url: string;
  trailer_url: string | null;
  release_year: number | null;
  duration: number | null;
  genre: string | null;
  director: string | null;
}

const FilmsPage = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFilm, setEditingFilm] = useState<Film | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    poster_url: "",
    trailer_url: "",
    release_year: "",
    duration: "",
    genre: "",
    director: "",
  });

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const { data, error } = await supabase
        .from("films")
        .select("*")
        .order("release_year", { ascending: false });

      if (error) throw error;
      setFilms(data || []);
    } catch (error) {
      console.error("Error fetching films:", error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca filmele",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const filmData = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
        description: formData.description,
        poster_url: formData.poster_url,
        trailer_url: formData.trailer_url || null,
        release_year: formData.release_year ? parseInt(formData.release_year) : null,
        duration: formData.duration ? parseInt(formData.duration) : null,
        genre: formData.genre || null,
        director: formData.director || null,
      };

      if (editingFilm) {
        const { error } = await supabase
          .from("films")
          .update(filmData)
          .eq("id", editingFilm.id);

        if (error) throw error;
        toast({ title: "Film actualizat cu succes!" });
      } else {
        const { error } = await supabase.from("films").insert([filmData]);
        if (error) throw error;
        toast({ title: "Film adăugat cu succes!" });
      }

      setDialogOpen(false);
      resetForm();
      fetchFilms();
    } catch (error) {
      console.error("Error saving film:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva filmul",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (film: Film) => {
    setEditingFilm(film);
    setFormData({
      title: film.title,
      slug: film.slug,
      description: film.description,
      poster_url: film.poster_url,
      trailer_url: film.trailer_url || "",
      release_year: film.release_year?.toString() || "",
      duration: film.duration?.toString() || "",
      genre: film.genre || "",
      director: film.director || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur doriți să ștergeți acest film?")) return;

    try {
      const { error } = await supabase.from("films").delete().eq("id", id);
      if (error) throw error;
      
      toast({ title: "Film șters cu succes!" });
      fetchFilms();
    } catch (error) {
      console.error("Error deleting film:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge filmul",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingFilm(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      poster_url: "",
      trailer_url: "",
      release_year: "",
      duration: "",
      genre: "",
      director: "",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-cinema-orange" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading font-bold">Gestionare Filme</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adaugă Film
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingFilm ? "Editează Film" : "Adaugă Film Nou"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Titlu *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generat din titlu"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Descriere *</label>
                <Textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL Poster *</label>
                <Input
                  required
                  value={formData.poster_url}
                  onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL Trailer (YouTube)</label>
                <Input
                  value={formData.trailer_url}
                  onChange={(e) => setFormData({ ...formData, trailer_url: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">An lansare</label>
                  <Input
                    type="number"
                    value={formData.release_year}
                    onChange={(e) => setFormData({ ...formData, release_year: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Durată (min)</label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Gen</label>
                <Input
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  placeholder="Documentar, Ficțiune, etc."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Regizor</label>
                <Input
                  value={formData.director}
                  onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingFilm ? "Actualizează" : "Adaugă"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Anulează
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {films.map((film) => (
          <div
            key={film.id}
            className="bg-card border border-border rounded-lg p-4 flex items-center gap-4"
          >
            <img
              src={film.poster_url}
              alt={film.title}
              className="w-24 h-36 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg">{film.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {film.description}
              </p>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                {film.release_year && <span>{film.release_year}</span>}
                {film.duration && <span>{film.duration} min</span>}
                {film.genre && <span>{film.genre}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(film)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(film.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmsPage;
