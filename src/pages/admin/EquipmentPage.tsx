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

interface Equipment {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  daily_rate: number;
  is_available: boolean;
}

const EquipmentPage = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    image_url: "",
    daily_rate: "",
    is_available: true,
  });

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from("rental_equipment")
        .select("*")
        .order("category, name");

      if (error) throw error;
      setEquipment(data || []);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca echipamentele",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const equipmentData = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
        category: formData.category,
        description: formData.description,
        image_url: formData.image_url,
        daily_rate: parseFloat(formData.daily_rate),
        is_available: formData.is_available,
      };

      if (editingEquipment) {
        const { error } = await supabase
          .from("rental_equipment")
          .update(equipmentData)
          .eq("id", editingEquipment.id);

        if (error) throw error;
        toast({ title: "Echipament actualizat cu succes!" });
      } else {
        const { error } = await supabase.from("rental_equipment").insert([equipmentData]);
        if (error) throw error;
        toast({ title: "Echipament adăugat cu succes!" });
      }

      setDialogOpen(false);
      resetForm();
      fetchEquipment();
    } catch (error) {
      console.error("Error saving equipment:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva echipamentul",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: Equipment) => {
    setEditingEquipment(item);
    setFormData({
      name: item.name,
      slug: item.slug,
      category: item.category,
      description: item.description,
      image_url: item.image_url,
      daily_rate: item.daily_rate.toString(),
      is_available: item.is_available,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur doriți să ștergeți acest echipament?")) return;

    try {
      const { error } = await supabase.from("rental_equipment").delete().eq("id", id);
      if (error) throw error;
      
      toast({ title: "Echipament șters cu succes!" });
      fetchEquipment();
    } catch (error) {
      console.error("Error deleting equipment:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge echipamentul",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingEquipment(null);
    setFormData({
      name: "",
      slug: "",
      category: "",
      description: "",
      image_url: "",
      daily_rate: "",
      is_available: true,
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
        <h1 className="text-3xl font-heading font-bold">Gestionare Echipamente</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adaugă Echipament
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEquipment ? "Editează Echipament" : "Adaugă Echipament Nou"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nume *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Categorie *</label>
                <Input
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Camere, Lumini, Audio, etc."
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
                <label className="text-sm font-medium">URL Imagine *</label>
                <Input
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Preț/Zi (MDL) *</label>
                <Input
                  required
                  type="number"
                  step="0.01"
                  value={formData.daily_rate}
                  onChange={(e) => setFormData({ ...formData, daily_rate: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={formData.is_available}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_available: checked as boolean })
                  }
                />
                <label
                  htmlFor="available"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Disponibil pentru închiriere
                </label>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingEquipment ? "Actualizează" : "Adaugă"}
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
        {equipment.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-lg p-4 flex items-center gap-4"
          >
            <img
              src={item.image_url}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg">{item.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>{item.category}</span>
                <span className="font-bold text-cinema-orange">
                  {item.daily_rate} MDL/zi
                </span>
                <span className={item.is_available ? "text-green-500" : "text-red-500"}>
                  {item.is_available ? "Disponibil" : "Indisponibil"}
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

export default EquipmentPage;
