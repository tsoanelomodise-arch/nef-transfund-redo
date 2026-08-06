import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useNavItems, useSaveNavItem, useDeleteNavItem, useDocuments } from "@/hooks/useCms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import type { NavItem } from "@/types/cms";

const NavigationAdmin = () => {
  const { data: items, isLoading } = useNavItems();
  const { data: documents } = useDocuments(false);
  const save = useSaveNavItem();
  const remove = useDeleteNavItem();
  const [newLabel, setNewLabel] = useState("");
  const [newHref, setNewHref] = useState("");
  const [newParent, setNewParent] = useState("none");

  const all = items ?? [];
  const topLevel = all.filter((i) => !i.parent_id).sort((a, b) => a.position - b.position);
  const childrenOf = (id: string) => all.filter((i) => i.parent_id === id).sort((a, b) => a.position - b.position);

  const add = () => {
    if (!newLabel.trim()) return toast({ title: "Enter a menu label", variant: "destructive" });
    const parent_id = newParent === "none" ? null : newParent;
    const siblings = parent_id ? childrenOf(parent_id) : topLevel;
    save.mutate(
      { label: newLabel.trim(), href: newHref.trim() || null, parent_id, position: siblings.length, visible: true },
      { onSuccess: () => { setNewLabel(""); setNewHref(""); toast({ title: "Menu item added" }); } }
    );
  };

  const swap = (list: NavItem[], index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= list.length) return;
    save.mutate({ id: list[index].id, position: list[target].position });
    save.mutate({ id: list[target].id, position: list[index].position });
  };

  const Row = ({ item, list, index, nested }: { item: NavItem; list: NavItem[]; index: number; nested?: boolean }) => (
    <div className={`p-4 flex flex-wrap items-center gap-3 ${nested ? "pl-10 bg-muted/30" : ""}`}>
      <Input
        className="w-[200px]"
        defaultValue={item.label}
        onBlur={(e) => e.target.value !== item.label && save.mutate({ id: item.id, label: e.target.value })}
      />
      <Input
        className="flex-1 min-w-[200px]"
        placeholder="/page-address or https://..."
        defaultValue={item.href ?? ""}
        onBlur={(e) => (e.target.value || null) !== item.href && save.mutate({ id: item.id, href: e.target.value || null })}
      />
      <Select
        value={item.document_id ?? "none"}
        onValueChange={(v) => save.mutate({ id: item.id, document_id: v === "none" ? null : v })}
      >
        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Link a document" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No document</SelectItem>
          {(documents ?? []).map((d) => <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>)}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <Switch checked={item.visible} onCheckedChange={(v) => save.mutate({ id: item.id, visible: v })} />
        <span className="text-xs text-muted-foreground">Visible</span>
      </div>
      <Button variant="ghost" size="sm" onClick={() => swap(list, index, -1)} disabled={index === 0}><ArrowUp className="h-4 w-4" /></Button>
      <Button variant="ghost" size="sm" onClick={() => swap(list, index, 1)} disabled={index === list.length - 1}><ArrowDown className="h-4 w-4" /></Button>
      <Button variant="ghost" size="sm" onClick={() => { if (confirm(`Remove "${item.label}"?`)) remove.mutate(item.id); }}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-2">Navigation</h1>
      <p className="text-sm text-muted-foreground mb-6">Menu items shown in the website header. Sub-items appear in the dropdown of their parent.</p>

      <div className="bg-background border border-border rounded-md p-4 mb-8 flex flex-col md:flex-row gap-3 md:items-end">
        <div className="flex-1">
          <label className="text-sm font-bold block mb-1">Label</label>
          <Input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="e.g. Our Impact" />
        </div>
        <div className="flex-1">
          <label className="text-sm font-bold block mb-1">Link</label>
          <Input value={newHref} onChange={(e) => setNewHref(e.target.value)} placeholder="/our-impact" />
        </div>
        <div>
          <label className="text-sm font-bold block mb-1">Sits under</label>
          <Select value={newParent} onValueChange={setNewParent}>
            <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Top level</SelectItem>
              {topLevel.map((t) => <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={add} disabled={save.isPending}><Plus className="h-4 w-4 mr-1" /> Add</Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading menu...</p>
      ) : !topLevel.length ? (
        <p className="text-muted-foreground">No menu items yet.</p>
      ) : (
        <div className="bg-background border border-border rounded-md divide-y divide-border">
          {topLevel.map((item, i) => (
            <div key={item.id}>
              <Row item={item} list={topLevel} index={i} />
              {childrenOf(item.id).map((child, ci, arr) => (
                <Row key={child.id} item={child} list={arr} index={ci} nested />
              ))}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default NavigationAdmin;
