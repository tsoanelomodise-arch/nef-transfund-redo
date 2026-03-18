import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useCreateCareer, useUpdateCareer } from "@/hooks/useCareers";
import type { CareerItem } from "@/types/careers";

interface CareersFormProps {
  item?: CareerItem | null;
  onClose: () => void;
}

const CareersForm = ({ item, onClose }: CareersFormProps) => {
  const isEditing = !!item;
  const createMutation = useCreateCareer();
  const updateMutation = useUpdateCareer();

  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [location, setLocation] = useState(item?.location ?? "");
  const [employmentType, setEmploymentType] = useState(item?.employment_type ?? "full-time");
  const [closingDate, setClosingDate] = useState(item?.closing_date ? item.closing_date.slice(0, 10) : "");
  const [priority, setPriority] = useState(item?.priority ?? 5);
  const [showOnArchive, setShowOnArchive] = useState(item?.show_on_archive ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      location: location.trim() || null,
      employment_type: employmentType,
      closing_date: closingDate ? new Date(closingDate).toISOString() : null,
      priority,
      show_on_archive: showOnArchive,
    };

    if (isEditing) {
      updateMutation.mutate(
        { id: item.id, ...payload },
        {
          onSuccess: () => { toast({ title: "Updated" }); onClose(); },
          onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => { toast({ title: "Created" }); onClose(); },
        onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-background p-6 rounded-lg border border-border">
      <h2 className="text-lg font-extrabold uppercase tracking-tight">{isEditing ? "Edit Job Posting" : "New Job Posting"}</h2>

      <div>
        <label className="text-sm font-bold block mb-1">Title *</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Description</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Location</label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Johannesburg, Remote" />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Employment Type</label>
        <Select value={employmentType} onValueChange={setEmploymentType}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Closing Date</label>
        <Input type="date" value={closingDate} onChange={(e) => setClosingDate(e.target.value)} />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Display Order (1 = lowest, 10 = highest)</label>
        <Input type="number" min={1} max={10} value={priority} onChange={(e) => setPriority(Number(e.target.value))} />
        <p className="text-xs text-muted-foreground mt-1">Higher values appear first on the careers page.</p>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="showOnArchive" checked={showOnArchive} onCheckedChange={(v) => setShowOnArchive(!!v)} />
        <label htmlFor="showOnArchive" className="text-sm">Show on Careers Page</label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : isEditing ? "Update" : "Create"}</Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
};

export default CareersForm;
