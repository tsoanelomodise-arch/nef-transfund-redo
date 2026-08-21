import { useState } from "react";
import { useNewsMediaAdmin, useUpdateNewsMedia, useDeleteNewsMedia } from "@/hooks/useNewsMedia";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash2, Check, X, ArrowUp, ArrowDown } from "lucide-react";
import type { NewsMediaItem } from "@/types/news-media";
import NewsMediaForm from "./NewsMediaForm";

const statusColor: Record<string, string> = {
  draft: "bg-muted text-gray-500",
  approved: "bg-primary/10 text-primary",
  rejected: "bg-destructive/10 text-destructive",
};

const NewsMediaList = () => {
  const [contentTypeFilter, setContentTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingItem, setEditingItem] = useState<NewsMediaItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: items = [], isLoading } = useNewsMediaAdmin({
    contentType: contentTypeFilter,
    status: statusFilter,
  });

  const updateMutation = useUpdateNewsMedia();
  const deleteMutation = useDeleteNewsMedia();

  const handleApprove = (item: NewsMediaItem) => {
    updateMutation.mutate(
      { id: item.id, status: "approved" },
      {
        onSuccess: () => toast({ title: "Approved" }),
        onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  const handleReject = (item: NewsMediaItem) => {
    updateMutation.mutate(
      { id: item.id, status: "rejected" },
      {
        onSuccess: () => toast({ title: "Rejected" }),
        onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this item?")) return;
    deleteMutation.mutate(id, {
      onSuccess: () => toast({ title: "Deleted" }),
      onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
    });
  };

  if (showForm || editingItem) {
    return (
      <NewsMediaForm
        item={editingItem}
        onClose={() => { setShowForm(false); setEditingItem(null); }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={() => setShowForm(true)}>+ New Item</Button>
        <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="story">Story</SelectItem>
          </SelectContent>
        </Select>
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
        <p className="text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No items found.</p>
      ) : (
        <div className="admin-card bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Home</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-[250px] truncate">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{item.content_type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColor[item.status] ?? ""} variant="secondary">{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="w-6 text-center font-medium">{item.priority}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        disabled={item.priority >= 10}
                        onClick={() => updateMutation.mutate({ id: item.id, priority: Math.min(10, item.priority + 1) })}
                        title="Move up"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        disabled={item.priority <= 1}
                        onClick={() => updateMutation.mutate({ id: item.id, priority: Math.max(1, item.priority - 1) })}
                        title="Move down"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.content_type === "news" && item.show_on_home && <Badge className="bg-primary/10 text-primary">Home</Badge>}
                    {item.content_type === "story" && item.highlight_on_home && <Badge className="bg-primary/10 text-primary">Highlight</Badge>}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(item.publish_date).toLocaleDateString()}
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

export default NewsMediaList;
