import { useState } from "react";
import { useCareersAdmin, useUpdateCareer, useDeleteCareer } from "@/hooks/useCareers";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash2, Check, X, ArrowUp, ArrowDown } from "lucide-react";
import type { CareerItem } from "@/types/careers";
import CareersForm from "./CareersForm";

const statusColor: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  approved: "bg-primary/10 text-primary",
  rejected: "bg-destructive/10 text-destructive",
};

const CareersList = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingItem, setEditingItem] = useState<CareerItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: items = [], isLoading } = useCareersAdmin({ status: statusFilter });
  const updateMutation = useUpdateCareer();
  const deleteMutation = useDeleteCareer();

  const handleApprove = (item: CareerItem) => {
    updateMutation.mutate(
      { id: item.id, status: "approved" },
      {
        onSuccess: () => toast({ title: "Approved" }),
        onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  const handleReject = (item: CareerItem) => {
    updateMutation.mutate(
      { id: item.id, status: "rejected" },
      {
        onSuccess: () => toast({ title: "Rejected" }),
        onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this job posting?")) return;
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
        <Button onClick={() => setShowForm(true)}>+ New Job Posting</Button>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground">No job postings found.</p>
      ) : (
        <div className="bg-background rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Closing Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-[250px] truncate">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{item.employment_type ?? "—"}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.location ?? "—"}</TableCell>
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
                  <TableCell className="text-sm text-muted-foreground">
                    {item.closing_date ? new Date(item.closing_date).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      {item.status !== "approved" && (
                        <Button variant="ghost" size="icon" onClick={() => handleApprove(item)} title="Approve">
                          <Check className="h-4 w-4 text-primary" />
                        </Button>
                      )}
                      {item.status !== "rejected" && (
                        <Button variant="ghost" size="icon" onClick={() => handleReject(item)} title="Reject">
                          <X className="h-4 w-4 text-destructive" />
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
