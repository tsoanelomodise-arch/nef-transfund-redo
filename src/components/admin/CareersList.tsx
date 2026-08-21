import { useState } from "react";
import { useCareersAdmin, useUpdateCareer, useDeleteCareer } from "@/hooks/useCareers";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash2, Check, Archive, ArrowUp, ArrowDown } from "lucide-react";
import type { CareerItem } from "@/types/careers";
import CareersForm from "./CareersForm";

const statusColor: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  published: "bg-black text-white",
  archived: "bg-gray-900/80 text-white",
};

const CareersList = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingItem, setEditingItem] = useState<CareerItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: items = [], isLoading } = useCareersAdmin({ status: statusFilter });
  const updateMutation = useUpdateCareer();
  const deleteMutation = useDeleteCareer();

  const handlePublish = (item: CareerItem) => {
    updateMutation.mutate(
      { id: item.id, status: "published" },
      {
        onSuccess: () => toast({ title: "Published" }),
        onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  const handleArchive = (item: CareerItem) => {
    updateMutation.mutate(
      { id: item.id, status: "archived" },
      {
        onSuccess: () => toast({ title: "Archived" }),
        onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this job advert?")) return;
    deleteMutation.mutate(id, {
      onSuccess: () => toast({ title: "Deleted" }),
      onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
    });
  };

  if (showForm || editingItem) {
    return (
      <CareersForm
        item={editingItem}
        onClose={() => { setShowForm(false); setEditingItem(null); }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={() => setShowForm(true)}>+ New Job</Button>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No job adverts found.</p>
      ) : (
        <div className="admin-card bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{item.title}</TableCell>
                  <TableCell className="text-sm">{item.department ?? "—"}</TableCell>
                  <TableCell className="text-sm">{item.location ?? "—"}</TableCell>
                  <TableCell>
                    <Badge className={statusColor[item.status] ?? ""} variant="secondary">{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="w-6 text-center font-medium">{item.priority}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" disabled={item.priority >= 10}
                        onClick={() => updateMutation.mutate({ id: item.id, priority: Math.min(10, item.priority + 1) })} title="Move up">
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6" disabled={item.priority <= 1}
                        onClick={() => updateMutation.mutate({ id: item.id, priority: Math.max(1, item.priority - 1) })} title="Move down">
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(item.publish_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      {item.status !== "published" && (
                        <Button variant="ghost" size="icon" onClick={() => handlePublish(item)} title="Publish">
                          <Check className="h-4 w-4 text-primary" />
                        </Button>
                      )}
                      {item.status !== "archived" && (
                        <Button variant="ghost" size="icon" onClick={() => handleArchive(item)} title="Archive">
                          <Archive className="h-4 w-4 text-gray-500" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => setEditingItem(item)} title="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} title="Delete">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CareersList;
