import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import BlockEditor from "@/components/admin/cms/BlockEditor";
import { useAdminPage, useSaveBlocks, usePublishPage, useUpdatePage, NEW_BLOCK } from "@/hooks/useCms";
import { BLOCK_LABELS, DEFAULT_BLOCK_DATA, type BlockType, type CmsBlock } from "@/types/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowUp, ArrowDown, Trash2, Eye, Save, Send } from "lucide-react";

const PageEditor = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const { data, isLoading } = useAdminPage(pageId);
  const saveBlocks = useSaveBlocks();
  const publish = usePublishPage();
  const updatePage = useUpdatePage();

  const [blocks, setBlocks] = useState<CmsBlock[]>([]);
  const [meta, setMeta] = useState({ title: "", slug: "", seo_title: "", seo_description: "" });
  const [addType, setAddType] = useState<BlockType>("richtext");

  useEffect(() => {
    if (data) {
      setBlocks(data.blocks);
      setMeta({
        title: data.page.title,
        slug: data.page.slug,
        seo_title: data.page.seo_title ?? "",
        seo_description: data.page.seo_description ?? "",
      });
    }
  }, [data]);

  if (isLoading || !data) {
    return <AdminLayout><p className="text-muted-foreground">Loading page...</p></AdminLayout>;
  }

  const move = (index: number, dir: -1 | 1) => {
    const next = [...blocks];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setBlocks(next);
  };

  const saveDraft = async () => {
    await updatePage.mutateAsync({ id: data.page.id, ...meta, seo_title: meta.seo_title || null, seo_description: meta.seo_description || null });
    await saveBlocks.mutateAsync({ versionId: data.version.id, blocks });
    toast({ title: "Draft saved" });
  };

  const publishNow = async () => {
    await saveDraft();
    await publish.mutateAsync({ pageId: data.page.id, draftVersionId: data.version.id });
    toast({ title: "Page published", description: `Live at /${meta.slug}` });
  };

  const busy = saveBlocks.isPending || publish.isPending || updatePage.isPending;

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <Link to="/admin/pages" className="text-sm text-muted-foreground hover:text-foreground">← All pages</Link>
          <h1 className="text-2xl font-bold">{meta.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <a href={`/admin/preview/${data.page.id}`} target="_blank" rel="noopener noreferrer"><Eye className="h-4 w-4 mr-1" /> Preview</a>
          </Button>
          <Button variant="outline" size="sm" onClick={saveDraft} disabled={busy}><Save className="h-4 w-4 mr-1" /> Save draft</Button>
          <Button size="sm" onClick={publishNow} disabled={busy}><Send className="h-4 w-4 mr-1" /> Publish</Button>
        </div>
      </div>

      <div className="bg-background border border-border rounded-md p-4 mb-8 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-bold block mb-1">Page title</label>
          <Input value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-bold block mb-1">Web address</label>
          <Input value={meta.slug} onChange={(e) => setMeta({ ...meta, slug: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-bold block mb-1">Search engine title</label>
          <Input value={meta.seo_title} onChange={(e) => setMeta({ ...meta, seo_title: e.target.value })} maxLength={60} />
        </div>
        <div>
          <label className="text-sm font-bold block mb-1">Search engine description</label>
          <Textarea rows={2} value={meta.seo_description} onChange={(e) => setMeta({ ...meta, seo_description: e.target.value })} maxLength={160} />
        </div>
      </div>

      <div className="space-y-4">
        {blocks.map((block, i) => (
          <div key={block.id} className="bg-background border border-border rounded-md">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
              <span className="font-bold text-sm">{BLOCK_LABELS[block.type] ?? block.type}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => move(i, 1)} disabled={i === blocks.length - 1}><ArrowDown className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => setBlocks(blocks.filter((_, x) => x !== i))}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
            <div className="p-4">
              <BlockEditor
                type={block.type}
                data={block.data ?? {}}
                onChange={(d) => setBlocks(blocks.map((b, x) => (x === i ? { ...b, data: d } : b)))}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Select value={addType} onValueChange={(v) => setAddType(v as BlockType)}>
          <SelectTrigger className="w-[240px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {Object.entries(BLOCK_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setBlocks([...blocks, NEW_BLOCK(addType, JSON.parse(JSON.stringify(DEFAULT_BLOCK_DATA[addType])))])}
        >
          Add section
        </Button>
      </div>
    </AdminLayout>
  );
};

export default PageEditor;
