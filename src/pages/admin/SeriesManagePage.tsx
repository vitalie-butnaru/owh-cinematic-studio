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
import { Checkbox } from "@/components/ui/checkbox";

interface Series {
  id: string;
  title: string;
  slug: string;
  description: string;
  poster_url: string | null;
  is_active: boolean;
}

const SeriesManagePage = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSeries, setEditingSeries] = useState<Series | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    poster_url: "",
    is_active: true,
  });

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      const { data, error } = await supabase
        .from("series")
        .select("*")
        .order("title");

      if (error) throw error;
      setSeries(data || []);
    } catch (error) {
      console.error("Error fetching series:", error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca emisiunile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const seriesData = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
        description: formData.description,
        poster_url: formData.poster_url || null,
        is_active: formData.is_active,
      };

      if (editingSeries) {
        const { error } = await supabase
          .from("series")
          .update(seriesData)
          .eq("id", editingSeries.id);

        if (error) throw error;
        toast({ title: "Emisiune actualizată cu succes!" });
      } else {
        const { error } = await supabase.from("series").insert([seriesData]);
        if (error) throw error;
        toast({ title: "Emisiune adăugată cu succes!" });
      }

      setDialogOpen(false);
      resetForm();
      fetchSeries();
    } catch (error) {
      console.error("Error saving series:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva emisiunea",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: Series) => {
    setEditingSeries(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      description: item.description,
      poster_url: item.poster_url || "",
      is_active: item.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur doriți să ștergeți această emisiune?")) return;

    try {
      const { error } = await supabase.from("series").delete().eq("id", id);
      if (error) throw error;
      
      toast({ title: "Emisiune ștearsă cu succes!" });
      fetchSeries();
    } catch (error) {
      console.error("Error deleting series:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge emisiunea",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingSeries(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      poster_url: "",
      is_active: true,
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
        <h1 className="text-3xl font-heading font-bold">Gestionare Emisiuni</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adaugă Emisiune
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSeries ? "Editează Emisiune" : "Adaugă Emisiune Nouă"}
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
                <label className="text-sm font-medium">Descriere *</label>
                <Textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL Poster</label>
                <Input
                  value={formData.poster_url}
                  onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked as boolean })
                  }
                />
                <label
                  htmlFor="active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Activă (vizibilă pe site)
                </label>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingSeries ? "Actualizează" : "Adaugă"}
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
        {series.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-lg p-4 flex items-center gap-4"
          >
            {item.poster_url && (
              <img
                src={item.poster_url}
                alt={item.title}
                className="w-32 h-20 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <div className="mt-2 text-xs">
                <span className={item.is_active ? "text-green-500" : "text-red-500"}>
                  {item.is_active ? "Activă" : "Inactivă"}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(item.id)}
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

export default SeriesManagePage;
