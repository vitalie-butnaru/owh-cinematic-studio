import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Film, 
  Video, 
  Clapperboard,
  ShoppingCart, 
  Mail, 
  Users, 
  LogOut,
  Menu,
  X,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/admin/login");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (!roleData) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        toast({
          title: "Acces interzis",
          description: "Nu aveți permisiunea de a accesa panoul admin",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
    toast({
      title: "Deconectare reușită",
      description: "La revedere!",
    });
  };

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/blog", icon: FileText, label: "Blog" },
    { path: "/admin/films", icon: Film, label: "Filme" },
    { path: "/admin/productions", icon: Video, label: "Producții" },
    { path: "/admin/series", icon: Clapperboard, label: "Emisiuni" },
    { path: "/admin/equipment", icon: ShoppingCart, label: "Echipamente" },
    { path: "/admin/rentals", icon: ShoppingCart, label: "Solicitări Rental" },
    { path: "/admin/contacts", icon: Mail, label: "Mesaje Contact" },
    { path: "/admin/team", icon: Users, label: "Echipă" },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cinema-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-card border-r border-border flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/">
            <img src="/src/assets/owh-logo.png" alt="OWH Studio" className="h-12" />
          </Link>
          <p className="text-sm text-muted-foreground mt-2">Panou Admin</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Deconectare
          </Button>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <img src="/src/assets/owh-logo.png" alt="OWH Studio" className="h-10" />
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>

            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Deconectare
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar - Mobile */}
        <header className="lg:hidden bg-card border-b border-border p-4 flex justify-between items-center">
          <img src="/src/assets/owh-logo.png" alt="OWH Studio" className="h-10" />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { AdminLayout };
export default AdminLayout;
