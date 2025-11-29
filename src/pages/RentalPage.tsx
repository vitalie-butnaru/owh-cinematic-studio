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

interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string;
  daily_rate: number;
  image_url: string;
  is_available: boolean;
  currency?: string;
}

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

  const fallbackEquipment: Equipment[] = [
    { id: "bm-ursa-4k", name: "Blackmagic URSA 4K EF-Mount (body)", category: "cameras", description: "Cameră cinema 4K, montură EF", daily_rate: 50, image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sony-fs7-mk2", name: "Sony FS7 MkII + Metabones EF", category: "cameras", description: "Cameră profesionistă cu adaptor EF", daily_rate: 70, image_url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "bmpcc-4k-kit", name: "Blackmagic Pocket Cinema Camera 4K – kit", category: "cameras", description: "SmallRig cage, Metabones 0.64x EF–MFT, SSD T5 500GB", daily_rate: 50, image_url: "https://images.unsplash.com/photo-1519181245277-cffeb31da2d8?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "canon-r6-mk2", name: "Canon R6 Mk II (body)", category: "cameras", description: "Mirrorless full‑frame", daily_rate: 50, image_url: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "canon-5d-mk3", name: "Canon 5D Mk III (body)", category: "cameras", description: "DSLR full‑frame", daily_rate: 25, image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "bmpcc-6k-pro", name: "Blackmagic Pocket Cinema Camera 6K PRO – kit", category: "cameras", description: "SmallRig cage, SSD T5 1TB, baterie extra", daily_rate: 65, image_url: "https://images.unsplash.com/photo-1526178611251-3c7c2043cf2f?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sony-ex3", name: "Sony PMW‑EX3", category: "cameras", description: "Cameră ENG", daily_rate: 25, image_url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "gopro-hero9", name: "GoPro HERO9 Black 5K, 20MP – kit", category: "cameras", description: "microSD 128GB, stand", daily_rate: 20, image_url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "gopro-hero7", name: "GoPro HERO7 Black", category: "cameras", description: "Action cam", daily_rate: 15, image_url: "https://images.unsplash.com/photo-1516009082050-1c0fe1620e9b?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sony-fx3", name: "Sony FX3", category: "cameras", description: "Cameră cinema compactă", daily_rate: 85, image_url: "https://images.unsplash.com/photo-1518226203301-8aae3f798f95?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sony-a7iii", name: "Sony Alpha 7 III", category: "cameras", description: "Mirrorless full‑frame", daily_rate: 40, image_url: "https://images.unsplash.com/photo-1522512110072-62b0f7f2400a?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },

    { id: "sony-fe-50-1-8", name: "Sony FE 50mm 1.8", category: "lenses", description: "Prime pentru Sony FE", daily_rate: 15, image_url: "https://images.unsplash.com/photo-1504113888839-1c8dfe69b9bb?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "canon-extender-2x-iii", name: "Canon Extender EF 2x III", category: "lenses", description: "Multiplicator focal EF", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "canon-rf-24-70-2-8", name: "Canon RF 24–70mm f/2.8L IS USM", category: "lenses", description: "Zoom profesional RF", daily_rate: 50, image_url: "https://images.unsplash.com/photo-1482275548303-3561643b8c99?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "canon-rf-50-1-8", name: "Canon RF 50mm 1.8", category: "lenses", description: "Prime RF", daily_rate: 15, image_url: "https://images.unsplash.com/photo-1519183071298-a2962be96a49?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "rokinon-cine-set", name: "Rokinon/Samyang EF Cine Set 16/24/35/50/85", category: "lenses", description: "Set obiective cinema EF", daily_rate: 70, image_url: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sigma-150-600", name: "Sigma 150–600mm f/5–6.3 pentru Canon", category: "lenses", description: "Tele‑zoom", daily_rate: 30, image_url: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "canon-ef-70-200-2-8-ii", name: "Canon EF 70–200mm f/2.8 IS II L", category: "lenses", description: "Zoom tele EF", daily_rate: 30, image_url: "https://images.unsplash.com/photo-1485269217078-609cce3992aa?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "canon-135-2-0-l", name: "Canon 135mm f/2.0 L", category: "lenses", description: "Prime tele EF", daily_rate: 20, image_url: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "canon-ef-16-35-f4", name: "Canon EF 16–35mm f/4 L IS USM", category: "lenses", description: "Zoom wide EF", daily_rate: 20, image_url: "https://images.unsplash.com/photo-1484820544313-e28e9b1f0860?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "canon-ef-24-70-2-8", name: "Canon EF 24–70mm f/2.8 L", category: "lenses", description: "Zoom standard EF", daily_rate: 20, image_url: "https://images.unsplash.com/photo-1488900128323-215e75f8f3b4?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "canon-ef-24-105-f4", name: "Canon EF 24–105mm f/4 L IS", category: "lenses", description: "Zoom EF", daily_rate: 20, image_url: "https://images.unsplash.com/photo-1549921296-3b4a6b8ab760?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "canon-ef-80-200-2-8", name: "Canon EF 80–200mm f/2.8 L", category: "lenses", description: "Zoom tele EF", daily_rate: 20, image_url: "https://images.unsplash.com/photo-1495231919158-73f5e0938c7a?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sony-fe-24-70-2-8-gm", name: "Sony FE 24–70mm f/2.8 GM", category: "lenses", description: "Zoom premium", daily_rate: 40, image_url: "https://images.unsplash.com/photo-1494894194458-8a0b0d1e8a36?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sigma-18-35-1-8", name: "Sigma 18–35mm f/1.8 Art pentru Canon EF", category: "lenses", description: "Zoom luminos", daily_rate: 25, image_url: "https://images.unsplash.com/photo-1502444330042-d1a77ae87d1f?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sigma-105-macro", name: "Sigma 105mm f/2.8 Macro pentru Canon", category: "lenses", description: "Macro", daily_rate: 15, image_url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sony-fe-pz-28-135-f4", name: "Sony FE PZ 28–135mm f/4 G OSS", category: "lenses", description: "Zoom parfocal", daily_rate: 50, image_url: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sony-fe-70-200-f4", name: "Sony FE 70–200mm f/4 G OSS", category: "lenses", description: "Zoom tele", daily_rate: 30, image_url: "https://images.unsplash.com/photo-1549887533-8a4c9a05ffa0?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },

    { id: "nanlite-fs300-2kit", name: "NanLite FS‑300 2KIT LED Daylight + Softbox", category: "lighting", description: "Set două lumini + geantă + grid + stative", daily_rate: 50, image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "nanlite-fs300-bicolor", name: "NanLite FS‑300 Bicolor", category: "lighting", description: "Lumina LED bicolor", daily_rate: 25, image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "pavotube-ii-6c-kit2", name: "NanLite PavoTube II 6C – kit 2 buc", category: "lighting", description: "Tube RGB cu baterie internă", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "pavotube-15c", name: "NanLite PavoTube 15C RGB", category: "lighting", description: "Tube RGB", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "pavotube-30c-kit2", name: "NanLite PavoTube 30C – kit 2 buc", category: "lighting", description: "Tube RGB cu baterie", daily_rate: 30, image_url: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "neewer-660-pro-rgb", name: "Neewer 660 PRO RGB – kit 2", category: "lighting", description: "Panel RGB cu control prin app", daily_rate: 20, image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "arri-l7c", name: "ARRI L7‑C Color LED RGB Fresnel", category: "lighting", description: "Fresnel RGB", daily_rate: 40, image_url: "https://images.unsplash.com/photo-1537451215523-1b2d8d356ed8?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "arri-l7c-kit2", name: "ARRI L7‑C – kit 2 buc", category: "lighting", description: "Fresnel RGB, cap motorizat", daily_rate: 70, image_url: "https://images.unsplash.com/photo-1537451215523-1b2d8d356ed8?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "nanlite-forza-300", name: "NanLite Forza 300", category: "lighting", description: "LED monolight 5600K", daily_rate: 35, image_url: "https://images.unsplash.com/photo-1558470598-a5c277c7b5ea?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "nanlite-para-120", name: "NanLite Para 120 Softbox + grid", category: "lighting", description: "Softbox Bowens", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1558470598-a5c277c7b5ea?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "nanlite-fl-20g", name: "NanLite FL‑20G Bowens", category: "lighting", description: "Accesoriu Bowens", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1558470598-a5c277c7b5ea?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sirio-2500w", name: "Quartz Color Sirio 2 2500W HMI + balast", category: "lighting", description: "HMI 2.5kW", daily_rate: 50, image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "sirio-1200w", name: "Quartz Color Sirio 2 1200W HMI + balast", category: "lighting", description: "HMI 1.2kW", daily_rate: 35, image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "kinoflo-4ft-4bank", name: "KinoFlo 4ft 4Bank + C‑Stand", category: "lighting", description: "Tuburi 3200K/5600K", daily_rate: 25, image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "kinoflo-2ft-4bank", name: "KinoFlo 2ft 4Bank + C‑Stand", category: "lighting", description: "Tuburi 3200K/5600K", daily_rate: 20, image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },

    { id: "lark-150-duo", name: "Hollyland Wireless Microphone – Lark 150 Duo", category: "audio", description: "Sistem microfon wireless", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1510626176956-ffad13858b1a?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "rode-videomic-pro", name: "Rode VideoMic Pro", category: "audio", description: "Shotgun pentru cameră", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1478737270239-2c4f7b3f9a1f?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },

    { id: "teleprompter-tmp100", name: "Glide Gear TMP100 Teleprompter + Lenovo Tab M10", category: "accessories", description: "Teleprompter beam‑splitter 70/30", daily_rate: 20, image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "tilta-nucleus-nano", name: "Tilta Nucleus Nano Wireless Follow Focus", category: "accessories", description: "Follow focus wireless", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "easyrig-minimax", name: "Easyrig Minimax 2–7 kg", category: "grip", description: "Sistem de susținere", daily_rate: 25, image_url: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a008e?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "vinten-vision-8", name: "Vinten Vision 8", category: "grip", description: "Treppied profesional", daily_rate: 15, image_url: "https://images.unsplash.com/photo-1498931299472-6f37b5d3d7b3?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "vinten-pro-5", name: "Vinten Pro 5", category: "grip", description: "Treppied", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1498931299472-6f37b5d3d7b3?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "manfrotto-mvm500a", name: "Manfrotto MVM500A Monopod cu 500 Head", category: "grip", description: "Monopied fluid", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1498931299472-6f37b5d3d7b3?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "wieldy-dolly-track", name: "Wieldy 120 cm Dolly Track", category: "grip", description: "Șine dolly", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1543258103-0763c1b8f24c?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "konova-slider-1m", name: "Konova slider 1 m + Manfrotto Head 701", category: "grip", description: "Slider", daily_rate: 12, image_url: "https://images.unsplash.com/photo-1543258103-0763c1b8f24c?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "dji-rsc2", name: "DJI RSC 2", category: "grip", description: "Gimbal", daily_rate: 25, image_url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },

    { id: "mars-400s-pro", name: "Hollyland Mars 400S PRO SDI/HDMI – 2+1", category: "monitoring", description: "Sistem wireless video", daily_rate: 40, image_url: "https://images.unsplash.com/photo-1558470598-a5c277c7b5ea?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "mars-x", name: "Hollyland Mars X HDMI Transmitter", category: "monitoring", description: "Transmițător wireless", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1558470598-a5c277c7b5ea?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "runlee-22-monitor", name: 'Runlee 22" SDI/HDMI Director Monitor', category: "monitoring", description: 'Monitor regie 22"', daily_rate: 25, image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "bmd-video-assist-7", name: 'Blackmagic Video Assist 4K 7" HDMI/6G‑SDI', category: "monitoring", description: 'Recorder‑monitor 7"', daily_rate: 30, image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "feelworld-lut7-pro", name: 'FEELWORLD LUT7 PRO 7" Monitor', category: "monitoring", description: 'Monitor 7" touchscreen', daily_rate: 15, image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" },
    { id: "bmd-bidir-sdi-hdmi", name: "Blackmagic Bi‑Dir SDI‑HDMI 3G Micro Converter", category: "monitoring", description: "Converter bidirecțional", daily_rate: 10, image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=675&fit=crop", is_available: true, currency: "EUR" }
  ];


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
      const fallbackFiltered = selectedCategory === "all"
        ? fallbackEquipment
        : fallbackEquipment.filter((e) => e.category === selectedCategory);
      setEquipment((data && data.length) ? (data as unknown as Equipment[]) : fallbackFiltered);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      const fallbackFiltered = selectedCategory === "all"
        ? fallbackEquipment
        : fallbackEquipment.filter((e) => e.category === selectedCategory);
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
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Camera className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Rental</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              Închiriază <span className="gradient-text">Echipament</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pentru colegi, prieteni şi creatori de content oferim în chirie echipamente profesioniste pentru o gamă largă de producţii video.
            </p>
            <p className="text-lg text-primary mt-2">Tel./+373/-79-528-483</p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "all" ? "Toate" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>

          {/* Equipment Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
          ) : equipment.length === 0 ? (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">
                În curând vom adăuga echipamentele disponibile
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {equipment.map((item, index) => (
                <div
                  key={item.id}
                  className="glass-effect rounded-xl overflow-hidden hover-lift animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-heading font-bold mt-3 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          {item.daily_rate} {item.currency || "MDL"}
                        </span>
                        <span className="text-sm text-muted-foreground">/zi</span>
                      </div>
                      <Button
                        onClick={() => addToCart(item)}
                        className="shadow-glow"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adaugă
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
