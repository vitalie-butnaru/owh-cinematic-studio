import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Lightbulb, Mic, Settings } from "lucide-react";

const RentalSection = () => {
  const [activeCategory, setActiveCategory] = useState("toate");

  const categories = [
    { id: "toate", label: "Toate", icon: Settings },
    { id: "camere", label: "Camere", icon: Camera },
    { id: "obiective", label: "Obiective", icon: Camera },
    { id: "lumini", label: "Lumini", icon: Lightbulb },
    { id: "audio", label: "Audio", icon: Mic },
  ];

  const equipment = [
    {
      id: 1,
      name: "Blackmagic URSA 4K EF-Mount",
      category: "camere",
      price: "€50",
      description: "(body only)",
      image: "http://owh.md/diverse/arenda/Blackmagic%20URSA.jpeg",
    },
    {
      id: 2,
      name: "Sony FS7 MkII",
      category: "camere",
      price: "€70",
      description: "+ Metabones EF",
      image: "http://owh.md/diverse/arenda/Sony%20FS7%20MkII.jpeg",
    },
    {
      id: 3,
      name: "Blackmagic Pocket Cinema Camera 4K",
      category: "camere",
      price: "€50",
      description: "+ SmallRig cage + Metabones 0.64x + SSD Samsung T5 500GB",
      image: "http://owh.md/diverse/arenda/BMCC%204K.webp",
    },
    {
      id: 4,
      name: "Canon R6 Mk II",
      category: "camere",
      price: "€50",
      description: "(body only)",
      image: "http://owh.md/diverse/Canon%20R6%20MARK%20II.jpg",
    },
    {
      id: 5,
      name: "Sony FX3",
      category: "camere",
      price: "€85",
      description: "Cinema camera profesională",
      image: "http://owh.md/diverse/Sony-FX3-feat-image111.jpg",
    },
    {
      id: 6,
      name: "Sony Alpha 7 III",
      category: "camere",
      price: "€40",
      description: "Full frame mirrorless",
      image: "http://owh.md/diverse/sony%20alfa%207%20III%20camera.jpg",
    },
    {
      id: 7,
      name: "GoPRO HERO9 Black 5K",
      category: "camere",
      price: "€20",
      description: "+ microSD 128GB + stand",
      image: "http://owh.md/diverse/arenda/Go%20pro%209%20black.jpg",
    },
    {
      id: 8,
      name: "DJI Mavic Air 2S",
      category: "camere",
      price: "€50",
      description: "Fly More Combo",
      image: "http://owh.md/diverse/dji%20drona.jpg",
    },
    {
      id: 9,
      name: "Canon 5D Mk III",
      category: "camere",
      price: "€25",
      description: "(body only)",
      image: "http://owh.md/diverse/arenda/Canon%205D%20Mk%20III.jpeg",
    },
    {
      id: 10,
      name: "Blackmagic Pocket Cinema Camera 6K PRO",
      category: "camere",
      price: "€65",
      description: "+ SmallRig cage + SSD Samsung T5 1TB",
      image: "http://owh.md/diverse/arenda/BBCC%206K%20Pro.jpg",
    },
    {
      id: 11,
      name: "Sony PMW-EX3",
      category: "camere",
      price: "€25",
      description: "Camera video profesională",
      image: "http://owh.md/diverse/arenda/Sony%20EX%203.jpeg",
    },
    {
      id: 12,
      name: "Gopro Hero 7 Black",
      category: "camere",
      price: "€15",
      description: "Action camera",
      image: "http://owh.md/diverse/GoPro-Hero-7-Black.jpg",
    },
    {
      id: 13,
      name: "Canon RF 24-70mm f/2.8L IS USM",
      category: "obiective",
      price: "€50",
      description: "Obiectiv zoom profesional",
      image: "http://owh.md/diverse/Canon%2024-70%20es.jpg",
    },
    {
      id: 14,
      name: "Canon RF 50mm 1.8",
      category: "obiective",
      price: "€15",
      description: "Obiectiv fix luminoase",
      image: "http://owh.md/diverse/D3S_7846-1200.jpg",
    },
    {
      id: 15,
      name: "Sony FE 50mm 1.8",
      category: "obiective",
      price: "€15",
      description: "Obiectiv fix pentru Sony E-mount",
      image: "http://owh.md/diverse/810_1167-oblique.jpg",
    },
    {
      id: 16,
      name: "Set Obiective Cinema Samyang EF",
      category: "obiective",
      price: "€70",
      description: "16mm, 24mm, 35mm, 50mm, 85mm",
      image: "http://owh.md/diverse/arenda/Set%20Obiective%20Cinema%20Samyang%20EF.jpeg",
    },
    {
      id: 17,
      name: "Canon Extender EF 2xIII",
      category: "obiective",
      price: "€10",
      description: "Extender pentru obiective Canon",
      image: "http://owh.md/diverse/arenda/Extender_EF_2X_III_-1-1.jpg",
    },
    {
      id: 18,
      name: "Canon EF 70-200 F2.8 IS II L",
      category: "obiective",
      price: "€30",
      description: "Obiectiv zoom telephoto",
      image: "http://owh.md/diverse/arenda/Canon%20EF%2070-200%20F2.8%20IS%20II.jpeg",
    },
    {
      id: 19,
      name: "Canon 135mm f 2.0 L",
      category: "obiective",
      price: "€20",
      description: "Obiectiv fix telephoto",
      image: "http://owh.md/diverse/arenda/Canon%20135mm%20f%202.0.jpeg",
    },
    {
      id: 20,
      name: "Canon EF 16-35mm f/4 L IS USM",
      category: "obiective",
      price: "€20",
      description: "Obiectiv wide angle",
      image: "http://owh.md/diverse/s-l1600.jpg",
    },
    {
      id: 21,
      name: "Canon EF 24-70mm F 2.8 L",
      category: "obiective",
      price: "€20",
      description: "Obiectiv zoom standard",
      image: "http://owh.md/diverse/arenda/Canon%2024%20-%2070%20mm%20F%202.8.jpeg",
    },
    {
      id: 22,
      name: "Canon EF 24-105 IS F4.0 L",
      category: "obiective",
      price: "€20",
      description: "Obiectiv zoom versatil",
      image: "http://owh.md/diverse/arenda/Canon%20EF%2024%20-%20105%20F4.jpeg",
    },
    {
      id: 23,
      name: "Canon 50mm F 1.4",
      category: "obiective",
      price: "€15",
      description: "Obiectiv fix standard",
      image: "http://owh.md/diverse/arenda/Canon%2050mm%20F%201.4.jpeg",
    },
    {
      id: 24,
      name: "Sony FE 24-70mm F2.8 GM",
      category: "obiective",
      price: "€40",
      description: "Obiectiv zoom G Master",
      image: "http://owh.md/diverse/Sony%2024%2070.jpg",
    },
    {
      id: 25,
      name: "Sony FE PZ 28-135mm f.4 G OSS",
      category: "obiective",
      price: "€50",
      description: "Obiectiv zoom cu Power Zoom",
      image: "http://owh.md/diverse/Sony%2028-135.jpg",
    },
    {
      id: 26,
      name: "Sony FE 70-200mm f.4 G OSS",
      category: "obiective",
      price: "€30",
      description: "Obiectiv telephoto",
      image: "http://owh.md/diverse/Sony%2070-200.jpg",
    },
    {
      id: 27,
      name: "Sony FE 24-105mm f/4 G OSS",
      category: "obiective",
      price: "€25",
      description: "Obiectiv zoom versatil",
      image: "http://owh.md/diverse/obiectiv%20%20fe%2024-105.jpg",
    },
    {
      id: 28,
      name: "Sigma 18-35mm f/1.8 DC HSM Art",
      category: "obiective",
      price: "€25",
      description: "Pentru Canon EF",
      image: "http://owh.md/diverse/arenda/Sigma%2018-35.jpg",
    },
    {
      id: 29,
      name: "Sigma 105 F 2.8 EX DG Macro",
      category: "obiective",
      price: "€15",
      description: "Pentru Canon",
      image: "http://owh.md/diverse/arenda/Sigma%20105%20F%202.8%20EX%20DG%20Macro%20pentru%20Canon.jpeg",
    },
    {
      id: 30,
      name: "Sigma 150-600mm f/5-6.3",
      category: "obiective",
      price: "€30",
      description: "Pentru Canon",
      image: "http://owh.md/diverse/DSC_0055_69cb1a44-e566-436e-9005-d2dc1061ff8c.webp",
    },
    {
      id: 31,
      name: "Godox V1 Pro",
      category: "lumini",
      price: "€15",
      description: "Flash pentru Canon + accesorii",
      image: "http://owh.md/diverse/godox%20v1%20pro.jpg",
    },
    {
      id: 32,
      name: "Godox V1 Flash for Sony",
      category: "lumini",
      price: "€10",
      description: "Blitz profesional TTL",
      image: "http://owh.md/diverse/godoxv1sony.jpg",
    },
    {
      id: 33,
      name: "Aputure Light Storm LS C120d II",
      category: "lumini",
      price: "€40",
      description: "LED COB 180W daylight",
      image: "http://owh.md/diverse/arenda/Aputure-LS-C120d-II-V-mount%20BatteryPl.jpg",
    },
    {
      id: 34,
      name: "Kino Flo Diva Lite 400",
      category: "lumini",
      price: "€18",
      description: "Tungsten 3200K & Daylight 5600K Tubes",
      image: "http://owh.md/diverse/images45654.jpg",
    },
    {
      id: 35,
      name: "SoftPanels LED lights 1×2",
      category: "lumini",
      price: "€25",
      description: "2700K to 7200K",
      image: "http://owh.md/diverse/DSC08498-600x401.jpg",
    },
    {
      id: 36,
      name: "NanLite FS-300 2KIT LED",
      category: "lumini",
      price: "€50",
      description: "Daylight Spot Light + Bag + Softboxes + Grid + Stands",
      image: "http://owh.md/diverse/arenda/stand_1.jpg",
    },
    {
      id: 37,
      name: "Nanlite FS-300 Bicolor",
      category: "lumini",
      price: "€25",
      description: "LED Spot Light",
      image: "http://owh.md/diverse/hbjg9wois3drabbpybmn__19741.jpg",
    },
    {
      id: 38,
      name: "NanLite PavoTube II 6C 10in RGB LED",
      category: "lumini",
      price: "€10",
      description: "Tube cu baterie internă (kit 2 bucăți)",
      image: "http://owh.md/diverse/arenda/Nanlight%206C.png",
    },
    {
      id: 39,
      name: "NanLite PavoTube 15C RGB LED",
      category: "lumini",
      price: "€10",
      description: "Tube cu baterie internă",
      image: "http://owh.md/diverse/arenda/PavoTube%2015C%201KIt-800x800.jpg",
    },
    {
      id: 40,
      name: "NanLite PavoTube 30C RGB LED (2 buc)",
      category: "lumini",
      price: "€30",
      description: "Tube cu baterie internă (kit 2 bucăți)",
      image: "http://owh.md/diverse/arenda/PavoTube%2030C%202Kit-800x800.jpg",
    },
    {
      id: 41,
      name: "Neewer 2 Packs 660 PRO RGB LED",
      category: "lumini",
      price: "€20",
      description: "Video Light cu App Control Stand Kit",
      image: "http://owh.md/diverse/arenda/newer%20rgb2kit_.jpg",
    },
    {
      id: 42,
      name: "ARRI L7-C Color LED RGB Fresnel",
      category: "lumini",
      price: "€40",
      description: "Blue/Silver, Pole Operated + Stand",
      image: "http://owh.md/diverse/arenda/image.jpg",
    },
    {
      id: 43,
      name: "ARRI L7-C Color LED RGB Fresnel (2 buc)",
      category: "lumini",
      price: "€70",
      description: "Blue/Silver + Stand (kit 2 bucăți)",
      image: "http://owh.md/diverse/arenda/image2kit.jpg",
    },
    {
      id: 44,
      name: "Nanlite Forza 300",
      category: "lumini",
      price: "€35",
      description: "5600K LED monolight",
      image: "http://owh.md/diverse/nnforza300.jpg",
    },
    {
      id: 45,
      name: "Sennheiser AVX-ME2 SET",
      category: "audio",
      price: "€35",
      description: "Sistem wireless lavalieră",
      image: "http://owh.md/diverse/arenda/Sennheiser-AVX-ME2.jpg",
    },
    {
      id: 46,
      name: "Zoom H6 Handy Recorder",
      category: "audio",
      price: "€25",
      description: "Recorder portabil 6 canale",
      image: "http://owh.md/diverse/arenda/zoom%20h6.jpeg",
    },
    {
      id: 47,
      name: "Hollyland Wireless Microphone - Lark 150 Duo",
      category: "audio",
      price: "€10",
      description: "Microfon wireless",
      image: "http://owh.md/diverse/lark150c_2048x2048.jpg",
    },
    {
      id: 48,
      name: "Rode Video Mic Pro",
      category: "audio",
      price: "€10",
      description: "Microfon shotgun",
      image: "http://owh.md/diverse/rode_stereo_videomic_pro_with_1250505.jpg",
    },
    {
      id: 49,
      name: "Zoom Recorder H4n",
      category: "audio",
      price: "€10",
      description: "Recorder portabil",
      image: "http://owh.md/diverse/zoom.jpg",
    },
  ];

  const filteredEquipment =
    activeCategory === "toate"
      ? equipment
      : equipment.filter((item) => item.category === activeCategory);

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
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop";
                  }}
                />
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-cinema-orange text-white px-2 py-1 md:px-3 md:py-1 rounded-full font-heading font-bold text-sm md:text-base">
                  {item.price}
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
