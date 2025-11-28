import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user has admin role
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .single();

      if (!roleData) {
        await supabase.auth.signOut();
        throw new Error("Nu aveți permisiunea de a accesa panoul admin");
      }

      toast({
        title: "Autentificare reușită",
        description: "Bine ați revenit!",
      });

      navigate("/admin");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Eroare",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cinema-dark via-background to-cinema-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-up">
          <Link to="/">
            <img 
              src="/src/assets/owh-logo.png" 
              alt="OWH Studio" 
              className="h-16 mx-auto mb-6"
            />
          </Link>
          <h1 className="text-3xl font-heading font-bold mb-2">
            <span className="gradient-text">Panou Admin</span>
          </h1>
          <p className="text-muted-foreground">Autentificați-vă pentru a continua</p>
        </div>

        <div className="bg-card p-8 rounded-lg border border-border animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@owh.md"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Parolă</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Se autentifică...
                </>
              ) : (
                "Autentificare"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-cinema-orange transition-colors">
              Înapoi la pagina principală
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
