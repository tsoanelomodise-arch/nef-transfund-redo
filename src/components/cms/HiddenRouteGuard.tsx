import { Suspense, lazy, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useHiddenRoutes } from "@/hooks/usePageVisibility";
import { matchesRoute } from "@/lib/site-routes";

const NotFound = lazy(() => import("@/pages/NotFound"));

/**
 * Renders "Not found" for any page an admin has hidden. Admin routes are
 * always reachable so the setting can be undone.
 */
const HiddenRouteGuard = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const { hiddenRoutes, isLoading } = useHiddenRoutes();

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return <>{children}</>;
  if (isLoading) return <div className="min-h-screen" />;

  if (hiddenRoutes.some((r) => matchesRoute(pathname, r))) {
    return (
      <Suspense fallback={<div className="min-h-screen" />}>
        <NotFound />
      </Suspense>
    );
  }

  return <>{children}</>;
};

export default HiddenRouteGuard;
