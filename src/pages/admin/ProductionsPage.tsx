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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Production {
  id: string;
  title: string;
  slug: string;
  description: string;
  gif_preview_url: string;
  video_url: string | null;
  category: string;
  client: string | null;
  year: number | null;
}

const categories = [
  { value: "publicitate", label: "Publicitate" },
  { value: "spoturi_sociale", label: "Spoturi Sociale" },
  { value: "filme_institutionale", label: "Filme Instituționale" },
  { value: "animatii", label: "Animații" },
  { value: "emisiuni", label: "Emisiuni" },
];

const ProductionsPage = () => {
  const [productions, setProductions] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduction, setEditingProduction] = useState<Production | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    gif_preview_url: "",
    video_url: "",
    category: "publicitate",
    client: "",
    year: "",
  });

  useEffect(() => {
    fetchProductions();
  }, []);

  const fetchProductions = async () => {
    try {
      const { data, error } = await supabase
        .from("productions")
        .select("*")
        .order("year", { ascending: false });

      if (error) throw error;
      setProductions(data || []);
    } catch (error) {
      console.error("Error fetching productions:", error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca producțiile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const productionData = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
        description: formData.description,
        gif_preview_url: formData.gif_preview_url,
        video_url: formData.video_url || null,
        category: formData.category as any,
        client: formData.client || null,
        year: formData.year ? parseInt(formData.year) : null,
      };

      if (editingProduction) {
        const { error } = await supabase
          .from("productions")
          .update(productionData)
          .eq("id", editingProduction.id);

        if (error) throw error;
        toast({ title: "Producție actualizată cu succes!" });
      } else {
        const { error } = await supabase.from("productions").insert([productionData]);
        if (error) throw error;
        toast({ title: "Producție adăugată cu succes!" });
      }

      setDialogOpen(false);
      resetForm();
      fetchProductions();
    } catch (error) {
      console.error("Error saving production:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva producția",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (production: Production) => {
    setEditingProduction(production);
    setFormData({
      title: production.title,
      slug: production.slug,
      description: production.description,
      gif_preview_url: production.gif_preview_url,
      video_url: production.video_url || "",
      category: production.category,
      client: production.client || "",
      year: production.year?.toString() || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur doriți să ștergeți această producție?")) return;

    try {
      const { error } = await supabase.from("productions").delete().eq("id", id);
      if (error) throw error;
      
      toast({ title: "Producție ștearsă cu succes!" });
      fetchProductions();
    } catch (error) {
      console.error("Error deleting production:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge producția",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingProduction(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      gif_preview_url: "",
      video_url: "",
      category: "publicitate",
      client: "",
      year: "",
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
        <h1 className="text-3xl font-heading font-bold">Gestionare Producții</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adaugă Producție
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduction ? "Editează Producție" : "Adaugă Producție Nouă"}
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
                <label className="text-sm font-medium">Categorie *</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <label className="text-sm font-medium">URL GIF Preview *</label>
                <Input
                  required
                  value={formData.gif_preview_url}
                  onChange={(e) => setFormData({ ...formData, gif_preview_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL Video (YouTube/Vimeo)</label>
                <Input
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Client</label>
                  <Input
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">An</label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingProduction ? "Actualizează" : "Adaugă"}
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
        {productions.map((production) => (
          <div
            key={production.id}
            className="bg-card border border-border rounded-lg p-4 flex items-center gap-4"
          >
            <img
              src={production.gif_preview_url}
              alt={production.title}
              className="w-32 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg">{production.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {production.description}
              </p>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span className="capitalize">{production.category.replace(/_/g, " ")}</span>
                {production.client && <span>Client: {production.client}</span>}
                {production.year && <span>{production.year}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(production)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(production.id)}
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

export default ProductionsPage;
