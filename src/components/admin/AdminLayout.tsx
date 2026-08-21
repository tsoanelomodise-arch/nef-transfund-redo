import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useNewsMedia";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const NAV = [
  { to: "/admin/pages", label: "Pages" },
  { to: "/admin/navigation", label: "Navigation" },
  { to: "/admin/documents", label: "Documents" },
  { to: "/admin/news-media", label: "News & Media" },
  { to: "/admin/careers", label: "Careers" },
  { to: "/admin/guide", label: "Help" },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { data: auth, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLoading && (!auth?.user || !auth?.isAdmin)) {
      navigate("/admin/login");
    }
  }, [isLoading, auth, navigate]);

  if (isLoading) {
    return (
      <div className="admin-shell min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!auth?.isAdmin) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell min-h-screen bg-gray-50 text-gray-900">
      <div className="px-4 md:px-6 pt-4 md:pt-6">
        <header className="bg-white rounded-3xl shadow-sm px-5 md:px-7 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-wrap">
            <Link
              to="/"
              className="text-sm font-normal text-gray-500 hover:text-black transition-colors"
            >
              ← Back to Site
            </Link>
            <nav className="flex items-center gap-1.5 flex-wrap">
              {NAV.map((item) => {
                const active = pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`text-sm font-bold rounded-full px-4 py-2 transition-colors ${
                      active
                        ? "bg-black text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="rounded-full font-bold text-gray-600 hover:text-black hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </header>
      </div>
      <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
