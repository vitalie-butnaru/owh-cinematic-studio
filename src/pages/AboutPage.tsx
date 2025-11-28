import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { useTeam } from "@/hooks/wordpress";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";

const AboutPage = () => {
  const { data: team, isLoading } = useTeam();

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cinema-dark via-background to-cinema-dark opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728')] bg-cover bg-center opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Despre Noi</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            <span className="gradient-text">OWH Studio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Peste 25 de ani de experiență în producția cinematografică și documentară
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Povestea <span className="gradient-text">Noastră</span>
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Înființat în 1995, OWH Studio a devenit unul dintre cele mai respectate
                studiouri de producție cinematografică din Moldova. Cu peste 200 de
                proiecte realizate și 50+ de premii internaționale, continuăm să
                transformăm viziuni în realitate cinematografică.
              </p>
              <p>
                De la documentare sociale la producții comerciale, fiecare proiect
                reprezintă angajamentul nostru față de excelență și autenticitate.
                Echipa noastră de profesioniști pasionați lucrează cu cele mai moderne
                tehnologii pentru a aduce la viață povești care inspiră și transformă.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Echipa <span className="gradient-text">Noastră</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Profesioniști dedicați care transformă viziuni în realitate
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : team && team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={member.id}
                  className="glass-effect rounded-xl overflow-hidden hover-lift animate-fade-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square overflow-hidden">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.full_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Users className="w-16 h-16 text-muted-foreground/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                      {member.full_name}
                    </h3>
                    <p className="text-cinema-orange mb-3">{member.role}</p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">
                Informații despre echipă vor fi disponibile în curând
              </p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
