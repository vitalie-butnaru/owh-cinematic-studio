import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { Camera, ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { equipmentData, categoryLabels, type Equipment } from "@/data/equipment";

interface CartItem extends Equipment {
  quantity: number;
}

const RentalPage = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [message, setMessage] = useState("");

  const { toast } = useToast();

  const categories = ["all", "cameras", "lenses", "lighting", "audio", "grip", "monitoring", "accessories"];

  const fetchEquipment = useCallback(async () => {
    try {
      let query = supabase
        .from("rental_equipment")
        .select("*")
        .eq("is_available", true)
        .order("category");

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Use local equipment data as fallback
      const fallbackFiltered = selectedCategory === "all"
        ? equipmentData
        : equipmentData.filter((e) => e.category === selectedCategory);
      
      setEquipment((data && data.length) ? (data as unknown as Equipment[]) : fallbackFiltered);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      // Use local data as fallback
      const fallbackFiltered = selectedCategory === "all"
        ? equipmentData
        : equipmentData.filter((e) => e.category === selectedCategory);
      setEquipment(fallbackFiltered);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  const addToCart = (item: Equipment) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => 
        c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast({
      title: "Adăugat în coș",
      description: `${item.name} a fost adăugat în coșul tău.`,
    });
  };

  const removeFromCart = (id: string) => {
    const existing = cart.find(c => c.id === id);
    if (existing && existing.quantity > 1) {
      setCart(cart.map(c =>
        c.id === id ? { ...c, quantity: c.quantity - 1 } : c
      ));
    } else {
      setCart(cart.filter(c => c.id !== id));
    }
  };

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return cart.reduce((sum, item) => sum + (item.daily_rate * item.quantity * days), 0);
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = async () => {
    if (!fullName || !email || !phone || !startDate || !endDate || cart.length === 0) {
      toast({
        title: "Eroare",
        description: "Te rugăm să completezi toate câmpurile obligatorii.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Calculate totals
      const days = calculateDays();
      const total = calculateTotal();
      const deposit = Math.round(total * 0.3); // 30% deposit

      const { error } = await supabase.from("rental_requests").insert({
        full_name: fullName,
        email: email,
        phone: phone,
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
        equipment_items: cart.map(item => ({
          equipment_id: item.id,
          name: item.name,
          quantity: item.quantity,
          daily_rate: item.daily_rate,
          subtotal: item.daily_rate * item.quantity * days,
        })),
        total_amount: total,
        message: message,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "✓ Solicitare trimisă cu succes!",
        description: `Vă vom contacta în curând pentru confirmare. Depozit necesar: ${deposit} MDL`,
      });

      // Reset form
      setCart([]);
      setFullName("");
      setEmail("");
      setPhone("");
      setStartDate(undefined);
      setEndDate(undefined);
      setMessage("");
    } catch (error) {
      console.error("Error submitting rental request:", error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare. Te rugăm să încerci din nou.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-12 md:mb-16 animate-fade-up px-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 md:px-4 py-2 rounded-full mb-4">
              <Camera className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-primary font-medium text-sm md:text-base">Rental</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-4 md:mb-6">
              Închiriază <span className="gradient-text">Echipament</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Pentru colegi, prieteni şi creatori de content oferim în chirie echipamente profesioniste pentru o gamă largă de producţii video.
            </p>
            <p className="text-base md:text-lg text-primary mt-2">Tel./+373/-79-528-483</p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full text-xs sm:text-sm md:text-base px-3 md:px-4 py-2"
                size="sm"
              >
                {categoryLabels[cat] || cat}
              </Button>
            ))}
          </div>

          {/* Equipment Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
          ) : equipment.length === 0 ? (
            <div className="text-center py-12 md:py-20 px-4">
              <Camera className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-base md:text-xl text-muted-foreground">
                În curând vom adăuga echipamentele disponibile
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {equipment.map((item, index) => (
                <div
                  key={item.id}
                  className="glass-effect rounded-xl overflow-hidden hover-lift animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <span className="text-[10px] sm:text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                      {categoryLabels[item.category] || item.category}
                    </span>
                    <h3 className="text-base md:text-lg lg:text-xl font-heading font-bold mt-2 md:mt-3 mb-1 md:mb-2 line-clamp-2 min-h-[3rem]">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
                          {item.daily_rate} {item.currency || "MDL"}
                        </span>
                        <span className="text-xs md:text-sm text-muted-foreground">/zi</span>
                      </div>
                      <Button
                        onClick={() => addToCart(item)}
                        className="shadow-glow text-sm"
                        size="sm"
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        <span className="hidden sm:inline">Adaugă</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Cart Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-8 right-8 shadow-glow rounded-full h-16 w-16 md:w-auto md:rounded-lg z-40"
          >
            <ShoppingCart className="w-6 h-6 md:mr-2" />
            <span className="hidden md:inline">
              Coș ({cart.length})
            </span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Coșul tău de închiriere</SheetTitle>
            <SheetDescription>
              Completează detaliile pentru a trimite solicitarea
            </SheetDescription>
          </SheetHeader>

          <div className="mt-8 space-y-6">
            {/* Cart Items */}
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Coșul tău este gol
              </p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-muted rounded-lg">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.daily_rate} {item.currency || "MDL"}/zi
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <>
                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nume complet *</Label>
                    <Input
                      id="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ion Popescu"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ion@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+373 69 123 456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Data începerii *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            {startDate ? format(startDate, "PP", { locale: ro }) : "Selectează"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label>Data încheierii *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            {endDate ? format(endDate, "PP", { locale: ro }) : "Selectează"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            disabled={(date) => !startDate || date < startDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Mesaj (opțional)</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Detalii suplimentare despre închiriere..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Total Breakdown */}
                {startDate && endDate && (
                  <div className="glass-effect p-6 rounded-lg space-y-3">
                    <h3 className="font-semibold text-lg mb-2">Sumar Comandă</h3>
                    <div className="space-y-2 border-b border-border pb-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.name} x{item.quantity} ({calculateDays()} zile)
                          </span>
                          <span className="font-medium">
                            {item.daily_rate * item.quantity * calculateDays()} MDL
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Perioada închiriere:</span>
                      <span className="font-semibold">{calculateDays()} zile</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Depozit (30%):</span>
                      <span className="font-semibold">{Math.round(calculateTotal() * 0.3)} MDL</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold border-t border-border pt-3">
                      <span>Total:</span>
                      <span className="text-primary">{calculateTotal()} MDL</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      * Depozitul se va restitui după returnarea echipamentului în stare bună
                    </p>
                  </div>
                )}

                {/* Submit */}
                <Button
                  size="lg"
                  className="w-full shadow-glow"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? "Se trimite..." : "Trimite solicitarea"}
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default RentalPage;
