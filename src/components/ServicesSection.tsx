import { Film, Video, Tv, Megaphone, Package, Users } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Film,
      title: "Documentar cinematografic/TV",
      description: "Producții documentare de înaltă calitate pentru cinematografe și televiziune",
    },
    {
      icon: Video,
      title: "Scurt/lungmetraje de ficțiune",
      description: "Filme de ficțiune creative și captivante",
    },
    {
      icon: Tv,
      title: "Emisiuni TV",
      description: "Concepte și producție de emisiuni televizate",
    },
    {
      icon: Megaphone,
      title: "Campanii publicitare & Spoturi",
      description: "Spoturi publicitare video și audio de impact",
    },
    {
      icon: Video,
      title: "Videoclipuri",
      description: "Producție videoclipuri muzicale și de prezentare",
    },
    {
      icon: Package,
      title: "Distribuție & Multiplicare",
      description: "Plasare la posturi TV/radio, multiplicare și distribuire produse",
    },
  ];

  const additionalServices = [
    "Organizarea proiecțiilor de film și a evenimentelor publice",
    "Ateliere și master-class-uri cu tematică cinematografică",
    "Distribuția de film",
    "Chirie echipament profesional",
  ];

  return (
    <section id="servicii" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            <span className="text-cinema-orange">Servicii</span> Profesionale
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            E cert că la OWH Studio veți găsi profesionalism, pasiune și standarde înalte în ceea ce privește calitatea produselor. Flexibili și atenți la cererile clientului, încercăm să avem o abordare originală și creativă.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-card rounded-lg p-8 hover-lift animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-cinema-orange/10 flex items-center justify-center mb-6 group-hover:bg-cinema-orange/20 transition-colors">
                  <Icon className="w-8 h-8 text-cinema-orange" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="max-w-3xl mx-auto bg-secondary rounded-lg p-8 animate-fade-up">
          <h3 className="text-2xl font-heading font-bold mb-6 text-center">
            De asemenea ne ocupăm de:
          </h3>
          <ul className="space-y-4">
            {additionalServices.map((service) => (
              <li key={service} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cinema-orange mt-2 flex-shrink-0" />
                <span className="text-lg text-foreground/90">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
