import { useState, useEffect } from "react";
import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  price: string;
  category: string;
  status: "available" | "sold-out" | "upcoming";
}

const BiletePage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Placeholder events - Replace with WordPress API integration
  const placeholderEvents: Event[] = [
    {
      id: "1",
      title: "CRONOGRAF 2025 - Festival Internațional de Film Documentar",
      slug: "cronograf-2025",
      date: "2025-03-15",
      time: "18:00",
      location: "Cinema Patria, Chișinău",
      description: "Ediția a 20-a a Festivalului Internațional de Film Documentar CRONOGRAF. O selecție excepțională de documentare din întreaga lume.",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
      price: "150 MDL",
      category: "Festival",
      status: "available"
    },
    {
      id: "2",
      title: "Premiera: Documentar Special - Basarabia de Azi",
      slug: "basarabia-de-azi-premiere",
      date: "2025-02-20",
      time: "19:00",
      location: "Cinema Odeon, Chișinău",
      description: "Premiera documentarului despre Moldova contemporană, realizat de echipa OWH Studio.",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
      price: "100 MDL",
      category: "Premieră",
      status: "available"
    },
    {
      id: "3",
      title: "Atelier de Film Documentar pentru Tineri",
      slug: "atelier-documentar-tineri",
      date: "2025-04-10",
      time: "14:00",
      location: "OWH Studio, Str. 31 August 1989, 93",
      description: "Workshop intensiv de 5 zile dedicat tinerilor cineaști interesați de filmul documentar.",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
      price: "500 MDL",
      category: "Workshop",
      status: "upcoming"
    }
  ];

  useEffect(() => {
    // Simulate API call - Replace with actual WordPress API integration
    setTimeout(() => {
      setEvents(placeholderEvents);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status: Event["status"]) => {
    const statusConfig = {
      available: { label: "Bilete Disponibile", variant: "default" as const },
      "sold-out": { label: "Sold Out", variant: "destructive" as const },
      upcoming: { label: "În curând", variant: "secondary" as const }
    };
    return statusConfig[status];
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-cinema-dark to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 animate-fade-up">
            Bilete pentru <span className="text-cinema-orange">Evenimente</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Participă la evenimente cinematografice, premiere și ateliere organizate de OWH Studio
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Se încarcă evenimentele...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <Ticket className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground mb-2">Nu sunt evenimente disponibile momentan</p>
              <p className="text-sm text-muted-foreground">Verifică mai târziu pentru actualizări</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {events.map((event, index) => {
                const statusBadge = getStatusBadge(event.status);
                return (
                  <Card 
                    key={event.id} 
                    className="overflow-hidden hover-lift animate-fade-up group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge 
                        variant={statusBadge.variant}
                        className="absolute top-4 right-4"
                      >
                        {statusBadge.label}
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-cinema-orange transition-colors">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-cinema-orange" />
                        <span>{new Date(event.date).toLocaleDateString('ro-RO', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-cinema-orange" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-cinema-orange" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      
                      <div className="pt-4 flex items-center justify-between border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Preț</p>
                          <p className="text-xl font-bold text-cinema-orange">{event.price}</p>
                        </div>
                        <Button 
                          disabled={event.status === "sold-out"}
                          className="hover-glow"
                        >
                          {event.status === "sold-out" ? "Sold Out" : 
                           event.status === "upcoming" ? "În curând" : "Cumpără Bilet"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* WordPress Integration Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Integrare cu <span className="text-cinema-orange">WordPress</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Această pagină este pregătită pentru integrare cu WordPress folosind REST API. 
            Evenimentele vor fi gestionate prin WordPress + WooCommerce pentru bilete.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/contacte">Contactează-ne pentru Integrare</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BiletePage;
