import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Lightbulb, Mic, Settings } from "lucide-react";
import { equipmentData, categoryLabels } from "@/data/equipment";

const RentalSection = () => {
  const [activeCategory, setActiveCategory] = useState("toate");

  const categories = [
    { id: "toate", label: "Toate", icon: Settings },
    { id: "cameras", label: categoryLabels.cameras, icon: Camera },
    { id: "lenses", label: categoryLabels.lenses, icon: Camera },
    { id: "lighting", label: categoryLabels.lighting, icon: Lightbulb },
    { id: "audio", label: categoryLabels.audio, icon: Mic },
  ];

  const filteredEquipment =
    activeCategory === "toate"
      ? equipmentData
      : equipmentData.filter((item) => item.category === activeCategory);

  return (
    <section id="rental" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Închiriere <span className="text-cinema-orange">Echipament</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 px-4">
            Pentru colegi, prieteni şi creatori de content oferim în chirie echipamente
            profesioniste pentru o gamă largă de producţii video.
          </p>
          <div className="flex items-center justify-center gap-2 text-cinema-orange flex-wrap">
            <span className="font-heading font-bold text-lg md:text-xl">Tel:</span>
            <a
              href="tel:+37379528483"
              className="text-lg md:text-xl font-medium hover:underline"
            >
              +373 79 528 483
            </a>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.id)}
                className="rounded-full text-sm md:text-base"
                size="sm"
              >
                <Icon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                {cat.label}
              </Button>
            );
          })}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredEquipment.map((item, index) => (
            <div
              key={item.id}
              className="group bg-card rounded-lg overflow-hidden hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative aspect-square bg-muted hover-zoom">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-cinema-orange text-white px-2 py-1 md:px-3 md:py-1 rounded-full font-heading font-bold text-sm md:text-base">
                  €{item.daily_rate}
                </div>
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-base md:text-lg font-heading font-bold mb-2 line-clamp-2 min-h-[3rem]">
                  {item.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12 animate-fade-up px-4">
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            Vrei să închiriezi echipament? Contactează-ne!
          </p>
          <Button size="lg" asChild className="w-full sm:w-auto">
            <a href="#contact">Solicită Închiriere</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RentalSection;
