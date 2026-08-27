import { useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { SITE_ROUTES } from "@/lib/site-routes";
import { usePageVisibility, useSetPageHidden } from "@/hooks/usePageVisibility";

/** Lets an admin hide any built-in site page from visitors and the menu. */
const PageVisibilityManager = () => {
  const { data: rows, isLoading } = usePageVisibility();
  const setHidden = useSetPageHidden();

  const hiddenByRoute = useMemo(() => {
    const map: Record<string, boolean> = {};
    (rows ?? []).forEach((r) => { map[r.route] = r.hidden; });
    return map;
  }, [rows]);

  const groups = useMemo(() => {
    const g: Record<string, typeof SITE_ROUTES> = {};
    SITE_ROUTES.forEach((r) => { (g[r.group] ||= []).push(r); });
    return Object.entries(g);
  }, []);

  const toggle = (route: string, label: string, visible: boolean) => {
    setHidden.mutate(
      { route, label, hidden: !visible },
      {
        onSuccess: () => toast({ title: visible ? `“${label}” is visible` : `“${label}” is hidden` }),
        onError: (e: any) =>
          toast({ title: "Could not update the page", description: e.message, variant: "destructive" }),
      }
    );
  };

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-black tracking-tight text-black mb-1">Hide pages</h2>
      <p className="text-black/70 mb-5 max-w-2xl">
        Switch a page off to take it down: visitors see a “Not found” page and the link disappears from the menu.
        Switch it back on at any time.
      </p>

      {isLoading ? (
        <p className="text-gray-500">Loading pages...</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {groups.map(([group, routes]) => (
            <div key={group} className="admin-card bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-black/50 mb-3">{group}</p>
              <div className="divide-y divide-gray-100">
                {routes.map((r) => {
                  const visible = !hiddenByRoute[r.route];
                  return (
                    <div key={r.route} className="py-3 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate">{r.label}</p>
                        <p className="text-sm text-gray-500 truncate">{r.route}</p>
                      </div>
                      <span className={`text-xs font-bold uppercase ${visible ? "text-black" : "text-gray-400"}`}>
                        {visible ? "Visible" : "Hidden"}
                      </span>
                      <Switch
                        checked={visible}
                        onCheckedChange={(v) => toggle(r.route, r.label, v)}
                        aria-label={`Show ${r.label}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PageVisibilityManager;
