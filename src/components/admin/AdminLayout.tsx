import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useNewsMedia";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { data: auth, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!auth?.user || !auth?.isAdmin)) {
      navigate("/admin/login");
    }
  }, [isLoading, auth, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!auth?.isAdmin) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Site
          </Link>
          <nav className="flex items-center gap-4 flex-wrap">
            <Link to="/admin/pages" className="text-sm font-bold text-foreground hover:text-primary">
              Pages
            </Link>
            <Link to="/admin/navigation" className="text-sm font-bold text-foreground hover:text-primary">
              Navigation
            </Link>
            <Link to="/admin/documents" className="text-sm font-bold text-foreground hover:text-primary">
              Documents
            </Link>
            <Link to="/admin/news-media" className="text-sm font-bold text-foreground hover:text-primary">
              News & Media
            </Link>
            <Link to="/admin/careers" className="text-sm font-bold text-foreground hover:text-primary">
              Careers
            </Link>
            <Link to="/admin/guide" className="text-sm font-bold text-foreground hover:text-primary">
              Help
            </Link>
          </nav>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </header>
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
