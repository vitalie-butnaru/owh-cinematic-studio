import { useState } from "react";
import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert([formData]);

      if (error) throw error;

      toast({
        title: "Mesaj trimis cu succes!",
        description: "Vă vom răspunde în cel mai scurt timp.",
      });

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare. Vă rugăm încercați din nou.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cinema-dark via-background to-cinema-dark opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a')] bg-cover bg-center opacity-20" />

        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            <span className="gradient-text">Contacte</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Suntem aici pentru a vă ajuta cu orice proiect
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 animate-fade-up">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">
                  Să discutăm despre <span className="text-cinema-orange">proiectul dvs.</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Contactați-ne pentru consultanță gratuită sau pentru a solicita o ofertă personalizată.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card hover-lift">
                  <div className="w-12 h-12 rounded-full bg-cinema-orange/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-cinema-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <a href="tel:+37322232771" className="text-cinema-orange hover:underline block">
                      +373 22 232771
                    </a>
                    <p className="text-sm text-muted-foreground">Fax: +373 22 225409</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-card hover-lift">
                  <div className="w-12 h-12 rounded-full bg-cinema-orange/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-cinema-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:owh@owh.md" className="text-cinema-orange hover:underline block">
                      owh@owh.md
                    </a>
                    <a href="mailto:idff.cronograf@gmail.com" className="text-sm text-muted-foreground hover:text-cinema-orange block">
                      idff.cronograf@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-card hover-lift">
                  <div className="w-12 h-12 rounded-full bg-cinema-orange/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-cinema-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresă</h3>
                    <p className="text-muted-foreground">
                      MD-2012, Chișinău<br />
                      Str. 31 August 1989, 93
                      Chișinău, MD-2012<br />
                      Republica Moldova
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg border border-border animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nume complet</label>
                  <Input
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Numele dvs."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@exemplu.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+373 69 123 456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subiect</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Despre ce doriți să discutați?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mesaj</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descrieți proiectul dvs. sau întrebarea..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Se trimite..." : "Trimite mesaj"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
