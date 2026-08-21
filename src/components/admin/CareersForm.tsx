import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useCreateCareer, useUpdateCareer } from "@/hooks/useCareers";
import { careersSchema } from "@/lib/validation/admin-forms";
import CareerAttachments from "@/components/admin/CareerAttachments";
import type { CareerItem } from "@/types/careers";

interface CareersFormProps {
  item?: CareerItem | null;
  onClose: () => void;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const CareersForm = ({ item, onClose }: CareersFormProps) => {
  const isEditing = !!item;
  const createMutation = useCreateCareer();
  const updateMutation = useUpdateCareer();

  const [title, setTitle] = useState(item?.title ?? "");
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [department, setDepartment] = useState(item?.department ?? "");
  const [location, setLocation] = useState(item?.location ?? "");
  const [employmentType, setEmploymentType] = useState(item?.employment_type ?? "Full-time");
  const [summary, setSummary] = useState(item?.summary ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [responsibilities, setResponsibilities] = useState(item?.responsibilities ?? "");
  const [requirements, setRequirements] = useState(item?.requirements ?? "");
  const [salaryRange, setSalaryRange] = useState(item?.salary_range ?? "");
  const [applyUrl, setApplyUrl] = useState(item?.apply_url ?? "");
  const [priority, setPriority] = useState(item?.priority ?? 5);
  const [closingDate, setClosingDate] = useState(item?.closing_date?.split("T")[0] ?? "");
  const [showOnArchive, setShowOnArchive] = useState(item?.show_on_archive ?? true);
  const [autoSlug, setAutoSlug] = useState(!isEditing);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) setSlug(generateSlug(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const raw = {
      title: title.trim(),
      slug: slug.trim(),
      department: department.trim() || null,
      location: location.trim() || null,
      employment_type: employmentType || null,
      summary: summary.trim() || null,
      description: description.trim() || null,
      responsibilities: responsibilities.trim() || null,
      requirements: requirements.trim() || null,
      salary_range: salaryRange.trim() || null,
      apply_url: applyUrl.trim() || null,
      closing_date: closingDate || null,
      priority,
      show_on_archive: showOnArchive,
    };

    const result = careersSchema.safeParse(raw);
    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Validation failed";
      toast({ title: "Validation Error", description: firstError, variant: "destructive" });
      return;
    }

    const payload = result.data as typeof raw;

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
    <form onSubmit={handleSubmit} className="admin-card bg-white space-y-4 p-6 md:p-8">
      <h2 className="text-lg font-extrabold uppercase tracking-tight">{isEditing ? "Edit Job" : "New Job Advert"}</h2>

      <div>
        <label className="text-sm font-bold block mb-1">Job Title *</label>
        <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} required />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">URL Slug *</label>
        <Input value={slug} onChange={(e) => { setAutoSlug(false); setSlug(e.target.value); }} required />
        <p className="text-xs text-gray-500 mt-1">/careers/{slug || "..."}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-bold block mb-1">Department</label>
          <Input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Finance" />
        </div>
        <div>
          <label className="text-sm font-bold block mb-1">Location</label>
          <Select value={location || "placeholder"} onValueChange={(v) => setLocation(v === "placeholder" ? "" : v)}>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="placeholder" disabled>Select...</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="On-site">On-site</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-bold block mb-1">Employment Type</label>
          <Select value={employmentType} onValueChange={setEmploymentType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Summary (listing preview)</label>
        <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Full Description</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Responsibilities</label>
        <Textarea value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} rows={4} />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Requirements</label>
        <Textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={4} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-bold block mb-1">Salary Range</label>
          <Input value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} placeholder="e.g. R30k - R50k" />
        </div>
        <div>
          <label className="text-sm font-bold block mb-1">Closing Date</label>
          <Input type="date" value={closingDate} onChange={(e) => setClosingDate(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-bold block mb-1">Display Order (1-10)</label>
          <Input type="number" min={1} max={10} value={priority} onChange={(e) => setPriority(Number(e.target.value))} />
        </div>
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">External Apply URL</label>
        <Input value={applyUrl} onChange={(e) => setApplyUrl(e.target.value)} placeholder="https://..." />
        <p className="text-xs text-gray-500 mt-1">Leave empty to show "Contact Us" instead.</p>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="showOnArchive" checked={showOnArchive} onCheckedChange={(v) => setShowOnArchive(!!v)} />
        <label htmlFor="showOnArchive" className="text-sm">Show on Careers page</label>
      </div>

      {isEditing && item?.id && (
        <CareerAttachments careerId={item.id} />
      )}
      {!isEditing && (
        <p className="text-xs text-gray-500 italic">Save the job first, then you can add file attachments.</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : isEditing ? "Update" : "Create"}</Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
};

export default CareersForm;
