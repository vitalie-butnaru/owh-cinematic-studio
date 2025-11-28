import HeaderNew from "@/components/HeaderNew";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Film, Award, Users, ExternalLink } from "lucide-react";

const CronografPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cinema-orange/20 via-cinema-dark to-background" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba')] bg-cover bg-center opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-up">
          <div className="inline-block mb-6 px-6 py-2 bg-cinema-orange/20 rounded-full border border-cinema-orange/30">
            <span className="text-cinema-orange font-semibold">Festivalul Internațional de Film Documentar</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6">
            <span className="gradient-text">CRONOGRAF</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Cel mai important festival de film documentar din Moldova
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="hover-lift" asChild>
              <a href="https://cronograf.md/program" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5 mr-2" />
                Programul festivalului
              </a>
            </Button>
            <Button size="lg" variant="outline" className="hover-lift border-2 border-cinema-orange text-cinema-orange hover:bg-cinema-orange hover:text-white" asChild>
              <a href="https://cronograf.md/home.php?id=9" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                Vizitează cronograf.md
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Festival */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Despre <span className="text-cinema-orange">CRONOGRAF</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              CRONOGRAF este festivalul internațional de film documentar organizat anual de OWH Studio din anul 2001. 
              De-a lungul anilor, festivalul a devenit un eveniment cultural major în Moldova, aducând în atenția 
              publicului cele mai bune producții documentare din întreaga lume.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Festivalul promovează cinematografia documentară de calitate, oferă o platformă pentru regizori emergenti 
              și consacrați, și contribuie la dezvoltarea culturii cinematografice în Republica Moldova.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-lg bg-card hover-lift animate-fade-up">
              <div className="w-20 h-20 rounded-full bg-cinema-orange/10 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-cinema-orange" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">23 de ani</h3>
              <p className="text-muted-foreground">De tradiție și excelență</p>
            </div>

            <div className="text-center p-8 rounded-lg bg-card hover-lift animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-20 h-20 rounded-full bg-cinema-orange/10 flex items-center justify-center mx-auto mb-6">
                <Film className="w-10 h-10 text-cinema-orange" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">500+ filme</h3>
              <p className="text-muted-foreground">Documentare prezentate</p>
            </div>

            <div className="text-center p-8 rounded-lg bg-card hover-lift animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-20 h-20 rounded-full bg-cinema-orange/10 flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-cinema-orange" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Premii</h3>
              <p className="text-muted-foreground">Pentru cele mai bune filme</p>
            </div>

            <div className="text-center p-8 rounded-lg bg-card hover-lift animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-20 h-20 rounded-full bg-cinema-orange/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-cinema-orange" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">50+ țări</h3>
              <p className="text-muted-foreground">Participante din întreaga lume</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-center">
              Misiunea <span className="text-cinema-orange">Festivalului</span>
            </h2>
            
            <div className="space-y-8">
              <div className="p-6 rounded-lg bg-background border border-border hover-lift animate-fade-up">
                <h3 className="text-xl font-heading font-bold mb-3">Promovarea cinematografiei documentare</h3>
                <p className="text-muted-foreground">
                  Să aducă în atenția publicului din Moldova cele mai valoroase și interesante filme documentare 
                  din producția mondială și să contribuie la dezvoltarea culturii vizionării.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-background border border-border hover-lift animate-fade-up" style={{ animationDelay: "0.1s" }}>
                <h3 className="text-xl font-heading font-bold mb-3">Platformă pentru profesioniști</h3>
                <p className="text-muted-foreground">
                  Să ofere o platformă de promovare pentru documentariștii din Moldova și să faciliteze 
                  schimbul de experiență între profesioniștii din domeniu.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-background border border-border hover-lift animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-xl font-heading font-bold mb-3">Educație cinematografică</h3>
                <p className="text-muted-foreground">
                  Să contribuie la educația cinematografică a publicului larg și să stimuleze interesul 
                  pentru producțiile documentare de calitate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-cinema-orange/10 via-background to-cinema-dark/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Alătură-te comunității <span className="gradient-text">CRONOGRAF</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Rămâi la curent cu toate noutățile despre festival, filme și evenimente speciale
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="hover-lift">
                Newsletter
              </Button>
              <Button size="lg" variant="outline" className="hover-lift">
                Rețele sociale
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CronografPage;
