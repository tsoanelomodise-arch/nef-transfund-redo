import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminPages, useCreatePage, useDeletePage, useUnpublishPage } from "@/hooks/useCms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, ExternalLink } from "lucide-react";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const PagesAdmin = () => {
  const { data: pages, isLoading } = useAdminPages();
  const createPage = useCreatePage();
  const deletePage = useDeletePage();
  const unpublish = useUnpublishPage();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const handleCreate = () => {
    if (!title.trim()) return toast({ title: "Enter a page title", variant: "destructive" });
    createPage.mutate(
      { title: title.trim(), slug: slugify(slug || title) },
      {
        onSuccess: () => { setTitle(""); setSlug(""); toast({ title: "Page created as a draft" }); },
        onError: (e: any) => toast({ title: "Could not create page", description: e.message, variant: "destructive" }),
      }
    );
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Pages</h1>

      <div className="bg-background border border-border rounded-md p-4 mb-8 flex flex-col md:flex-row gap-3 md:items-end">
        <div className="flex-1">
          <label className="text-sm font-bold block mb-1">Page title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Our Impact" />
        </div>
        <div className="flex-1">
          <label className="text-sm font-bold block mb-1">Web address</label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder={slugify(title) || "our-impact"} />
        </div>
        <Button onClick={handleCreate} disabled={createPage.isPending}>
          <Plus className="h-4 w-4 mr-1" /> New page
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading pages...</p>
      ) : !pages?.length ? (
        <p className="text-muted-foreground">No pages yet. Create your first one above.</p>
      ) : (
        <div className="bg-background border border-border rounded-md divide-y divide-border">
          {pages.map((page) => (
            <div key={page.id} className="p-4 flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px]">
                <p className="font-bold">{page.title}</p>
                <p className="text-sm text-muted-foreground">/{page.slug}</p>
              </div>
              <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${page.status === "published" ? "bg-[#00703C] text-white" : "bg-muted text-muted-foreground"}`}>
                {page.status}
              </span>
              <Button asChild variant="outline" size="sm"><Link to={`/admin/pages/${page.id}`}>Edit</Link></Button>
              {page.status === "published" && (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => unpublish.mutate(page.id)}>Unpublish</Button>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { if (confirm(`Delete "${page.title}"? This cannot be undone.`)) deletePage.mutate(page.id); }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default PagesAdmin;
