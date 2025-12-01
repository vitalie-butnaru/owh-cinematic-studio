/**
 * Centralized equipment data for rental
 * Used by both RentalPage and RentalSection components
 */

export interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string;
  daily_rate: number;
  image_url: string;
  is_available: boolean;
  currency?: string;
}

export const equipmentData: Equipment[] = [
  // CAMERAS
  { 
    id: "bm-ursa-4k", 
    name: "Blackmagic URSA 4K EF-Mount", 
    category: "cameras", 
    description: "Cameră cinema 4K, montură EF (body)", 
    daily_rate: 50, 
    image_url: "/produse/camere/blackmagic-ursa-4k.jpeg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sony-fs7-mk2", 
    name: "Sony FS7 MkII + Metabones EF", 
    category: "cameras", 
    description: "Cameră profesionistă cu adaptor EF", 
    daily_rate: 70, 
    image_url: "/produse/camere/sony-fs7-mkii.jpeg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "bmpcc-4k-kit", 
    name: "Blackmagic Pocket Cinema Camera 4K – kit", 
    category: "cameras", 
    description: "SmallRig cage, Metabones 0.64x EF–MFT, SSD T5 500GB", 
    daily_rate: 50, 
    image_url: "/produse/camere/bmpcc-4k.webp", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "canon-r6-mk2", 
    name: "Canon R6 Mk II (body)", 
    category: "cameras", 
    description: "Mirrorless full‑frame", 
    daily_rate: 50, 
    image_url: "/produse/camere/canon-r6-mk2.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sony-fx3", 
    name: "Sony FX3", 
    category: "cameras", 
    description: "Cinema camera profesională", 
    daily_rate: 85, 
    image_url: "/produse/camere/sony-fx3.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sony-a7iii", 
    name: "Sony Alpha 7 III", 
    category: "cameras", 
    description: "Full frame mirrorless", 
    daily_rate: 40, 
    image_url: "/produse/camere/sony-a7iii.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "gopro-hero9", 
    name: "GoPro HERO9 Black 5K, 20MP – kit", 
    category: "cameras", 
    description: "microSD 128GB, stand", 
    daily_rate: 20, 
    image_url: "/produse/camere/gopro-hero9.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "dji-mavic-air-2s", 
    name: "DJI Mavic Air 2S", 
    category: "cameras", 
    description: "Fly More Combo", 
    daily_rate: 50, 
    image_url: "/produse/camere/dji-mavic-air-2s.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "canon-5d-mk3", 
    name: "Canon 5D Mk III (body)", 
    category: "cameras", 
    description: "DSLR full‑frame", 
    daily_rate: 25, 
    image_url: "/produse/camere/canon-5d-mk3.jpeg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "bmpcc-6k-pro", 
    name: "Blackmagic Pocket Cinema Camera 6K PRO – kit", 
    category: "cameras", 
    description: "SmallRig cage, SSD T5 1TB, baterie extra", 
    daily_rate: 65, 
    image_url: "/produse/camere/bmpcc-6k-pro.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sony-ex3", 
    name: "Sony PMW‑EX3", 
    category: "cameras", 
    description: "Cameră ENG", 
    daily_rate: 25, 
    image_url: "/produse/camere/sony-pmw-ex3.jpeg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "gopro-hero7", 
    name: "GoPro HERO7 Black", 
    category: "cameras", 
    description: "Action camera", 
    daily_rate: 15, 
    image_url: "/produse/camere/gopro-hero7.jpg", 
    is_available: true, 
    currency: "EUR" 
  },

  // LENSES
  { 
    id: "canon-rf-24-70-2-8", 
    name: "Canon RF 24–70mm f/2.8L IS USM", 
    category: "lenses", 
    description: "Zoom profesional RF", 
    daily_rate: 50, 
    image_url: "/produse/obiective/canon-rf-24-70.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "canon-rf-50-1-8", 
    name: "Canon RF 50mm 1.8", 
    category: "lenses", 
    description: "Prime RF", 
    daily_rate: 15, 
    image_url: "/produse/obiective/canon-rf-50.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sony-fe-50-1-8", 
    name: "Sony FE 50mm 1.8", 
    category: "lenses", 
    description: "Prime pentru Sony FE", 
    daily_rate: 15, 
    image_url: "/produse/obiective/sony-fe-50.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "rokinon-cine-set", 
    name: "Rokinon/Samyang EF Cine Set 16/24/35/50/85", 
    category: "lenses", 
    description: "Set obiective cinema EF", 
    daily_rate: 70, 
    image_url: "/produse/obiective/samyang-cine-set.jpeg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "canon-extender-2x-iii", 
    name: "Canon Extender EF 2x III", 
    category: "lenses", 
    description: "Multiplicator focal EF", 
    daily_rate: 10, 
    image_url: "/produse/obiective/canon-extender-2x.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "canon-ef-70-200-2-8-ii", 
    name: "Canon EF 70–200mm f/2.8 IS II L", 
    category: "lenses", 
    description: "Zoom tele EF", 
    daily_rate: 30, 
    image_url: "/produse/obiective/canon-70-200.jpeg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "canon-135-2-0-l", 
    name: "Canon 135mm f/2.0 L", 
    category: "lenses", 
    description: "Prime tele EF", 
    daily_rate: 20, 
    image_url: "/produse/obiective/canon-135.jpeg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "canon-ef-16-35-f4", 
    name: "Canon EF 16–35mm f/4 L IS USM", 
    category: "lenses", 
    description: "Zoom wide EF", 
    daily_rate: 20, 
    image_url: "/produse/obiective/canon-16-35.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "canon-ef-24-70-2-8", 
    name: "Canon EF 24–70mm f/2.8 L", 
    category: "lenses", 
    description: "Zoom standard EF", 
    daily_rate: 20, 
    image_url: "/produse/obiective/canon-24-70-ef.jpeg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "canon-ef-24-105-f4", 
    name: "Canon EF 24–105mm f/4 L IS", 
    category: "lenses", 
    description: "Zoom EF", 
    daily_rate: 20, 
    image_url: "/produse/obiective/canon-24-105.jpeg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "canon-ef-50-1-4", 
    name: "Canon 50mm F 1.4", 
    category: "lenses", 
    description: "Obiectiv fix standard", 
    daily_rate: 15, 
    image_url: "/produse/obiective/canon-50-1-4.jpeg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sony-fe-24-70-2-8-gm", 
    name: "Sony FE 24–70mm f/2.8 GM", 
    category: "lenses", 
    description: "Zoom premium", 
    daily_rate: 40, 
    image_url: "/produse/obiective/sony-24-70-gm.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sony-fe-pz-28-135-f4", 
    name: "Sony FE PZ 28–135mm f/4 G OSS", 
    category: "lenses", 
    description: "Zoom parfocal", 
    daily_rate: 50, 
    image_url: "/produse/obiective/sony-28-135.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sony-fe-70-200-f4", 
    name: "Sony FE 70–200mm f/4 G OSS", 
    category: "lenses", 
    description: "Zoom tele", 
    daily_rate: 30, 
    image_url: "/produse/obiective/sony-70-200.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sony-fe-24-105", 
    name: "Sony FE 24-105mm f/4 G OSS", 
    category: "lenses", 
    description: "Obiectiv zoom versatil", 
    daily_rate: 25, 
    image_url: "/produse/obiective/sony-24-105.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sigma-18-35-1-8", 
    name: "Sigma 18–35mm f/1.8 Art pentru Canon EF", 
    category: "lenses", 
    description: "Zoom luminos", 
    daily_rate: 25, 
    image_url: "/produse/obiective/sigma-18-35.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sigma-105-macro", 
    name: "Sigma 105mm f/2.8 Macro pentru Canon", 
    category: "lenses", 
    description: "Macro", 
    daily_rate: 15, 
    image_url: "/produse/obiective/sigma-105-macro.jpeg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "sigma-150-600", 
    name: "Sigma 150–600mm f/5–6.3 pentru Canon", 
    category: "lenses", 
    description: "Tele‑zoom", 
    daily_rate: 30, 
    image_url: "/produse/obiective/sigma-150-600.webp", 
    is_available: true, 
    currency: "EUR" 
  },

  // LIGHTING
  { 
    id: "godox-v1-pro", 
    name: "Godox V1 Pro", 
    category: "lighting", 
    description: "Flash pentru Canon + accesorii", 
    daily_rate: 15, 
    image_url: "/produse/lumini/godox-v1-pro.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "godox-v1-sony", 
    name: "Godox V1 Flash for Sony", 
    category: "lighting", 
    description: "Blitz profesional TTL", 
    daily_rate: 10, 
    image_url: "/produse/lumini/godox-v1-sony.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "kinoflo-diva-400", 
    name: "Kino Flo Diva Lite 400", 
    category: "lighting", 
    description: "Tungsten 3200K & Daylight 5600K Tubes", 
    daily_rate: 18, 
    image_url: "/produse/lumini/kinoflo-diva-400.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "softpanels-led", 
    name: "SoftPanels LED lights 1×2", 
    category: "lighting", 
    description: "2700K to 7200K", 
    daily_rate: 25, 
    image_url: "/produse/lumini/softpanels-led.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "nanlite-fs300-2kit", 
    name: "NanLite FS‑300 2KIT LED Daylight + Softbox", 
    category: "lighting", 
    description: "Set două lumini + geantă + grid + stative", 
    daily_rate: 50, 
    image_url: "/produse/lumini/nanlite-fs300-2kit.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "nanlite-fs300-bicolor", 
    name: "NanLite FS‑300 Bicolor", 
    category: "lighting", 
    description: "Lumina LED bicolor", 
    daily_rate: 25, 
    image_url: "/produse/lumini/nanlite-fs300-bicolor.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "pavotube-ii-6c-kit2", 
    name: "NanLite PavoTube II 6C – kit 2 buc", 
    category: "lighting", 
    description: "Tube RGB cu baterie internă", 
    daily_rate: 10, 
    image_url: "/produse/lumini/pavotube-6c.png", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "pavotube-15c", 
    name: "NanLite PavoTube 15C RGB", 
    category: "lighting", 
    description: "Tube RGB", 
    daily_rate: 10, 
    image_url: "/produse/lumini/pavotube-15c.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "pavotube-30c-kit2", 
    name: "NanLite PavoTube 30C – kit 2 buc", 
    category: "lighting", 
    description: "Tube RGB cu baterie", 
    daily_rate: 30, 
    image_url: "/produse/lumini/pavotube-30c.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "neewer-660-pro-rgb", 
    name: "Neewer 660 PRO RGB – kit 2", 
    category: "lighting", 
    description: "Panel RGB cu control prin app", 
    daily_rate: 20, 
    image_url: "/produse/lumini/neewer-660-rgb.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "arri-l7c", 
    name: "ARRI L7‑C Color LED RGB Fresnel", 
    category: "lighting", 
    description: "Fresnel RGB", 
    daily_rate: 40, 
    image_url: "/produse/lumini/arri-l7c.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "arri-l7c-kit2", 
    name: "ARRI L7‑C – kit 2 buc", 
    category: "lighting", 
    description: "Fresnel RGB, cap motorizat", 
    daily_rate: 70, 
    image_url: "/produse/lumini/arri-l7c-2kit.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "nanlite-forza-300", 
    name: "NanLite Forza 300", 
    category: "lighting", 
    description: "LED monolight 5600K", 
    daily_rate: 35, 
    image_url: "/produse/lumini/nanlite-forza-300.jpg", 
    is_available: true, 
    currency: "EUR" 
  },

  // AUDIO
  { 
    id: "lark-150-duo", 
    name: "Hollyland Wireless Microphone – Lark 150 Duo", 
    category: "audio", 
    description: "Sistem microfon wireless", 
    daily_rate: 10, 
    image_url: "/produse/audio/hollyland-lark-150.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "rode-videomic-pro", 
    name: "Rode VideoMic Pro", 
    category: "audio", 
    description: "Shotgun pentru cameră", 
    daily_rate: 10, 
    image_url: "/produse/audio/rode-videomic-pro.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
  { 
    id: "zoom-h4n", 
    name: "Zoom Recorder H4n", 
    category: "audio", 
    description: "Recorder portabil", 
    daily_rate: 10, 
    image_url: "/produse/audio/zoom-h4n.jpg", 
    is_available: true, 
    currency: "EUR" 
  },
];

// Category mappings
export const categoryLabels: Record<string, string> = {
  all: "Toate",
  cameras: "Camere",
  lenses: "Obiective",
  lighting: "Lumini",
  audio: "Audio",
  grip: "Grip",
  monitoring: "Monitoring",
  accessories: "Accesorii",
};
