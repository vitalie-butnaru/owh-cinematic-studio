import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Film, Video, Clapperboard, ShoppingCart, Mail, Users } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    films: 0,
    productions: 0,
    series: 0,
    equipment: 0,
    rentalRequests: 0,
    contactSubmissions: 0,
    teamMembers: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [films, productions, series, equipment, rentals, contacts, team] = await Promise.all([
        supabase.from("films").select("id", { count: "exact", head: true }),
        supabase.from("productions").select("id", { count: "exact", head: true }),
        supabase.from("series").select("id", { count: "exact", head: true }),
        supabase.from("rental_equipment").select("id", { count: "exact", head: true }),
        supabase.from("rental_requests").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("team_members").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        films: films.count || 0,
        productions: productions.count || 0,
        series: series.count || 0,
        equipment: equipment.count || 0,
        rentalRequests: rentals.count || 0,
        contactSubmissions: contacts.count || 0,
        teamMembers: team.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statCards = [
    { icon: Film, label: "Filme", value: stats.films, color: "text-blue-500" },
    { icon: Video, label: "Producții", value: stats.productions, color: "text-purple-500" },
    { icon: Clapperboard, label: "Emisiuni", value: stats.series, color: "text-green-500" },
    { icon: ShoppingCart, label: "Echipamente", value: stats.equipment, color: "text-orange-500" },
    { icon: ShoppingCart, label: "Cereri Rental", value: stats.rentalRequests, color: "text-yellow-500" },
    { icon: Mail, label: "Mesaje Contact", value: stats.contactSubmissions, color: "text-red-500" },
    { icon: Users, label: "Membri Echipă", value: stats.teamMembers, color: "text-indigo-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-card p-6 rounded-lg border border-border hover-lift animate-fade-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <h3 className="text-sm text-muted-foreground font-medium">{stat.label}</h3>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-card p-6 rounded-lg border border-border">
        <h2 className="text-xl font-heading font-bold mb-4">Bine ați venit în panoul admin!</h2>
        <p className="text-muted-foreground">
          Utilizați meniul din stânga pentru a gestiona conținutul site-ului OWH Studio.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
