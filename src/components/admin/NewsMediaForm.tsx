import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useCreateNewsMedia, useUpdateNewsMedia, useHomeNewsCount, useHomeStoriesCount } from "@/hooks/useNewsMedia";
import { newsMediaSchema } from "@/lib/validation/admin-forms";
import type { NewsMediaItem } from "@/types/news-media";

interface NewsMediaFormProps {
  item?: NewsMediaItem | null;
  onClose: () => void;
}

const NewsMediaForm = ({ item, onClose }: NewsMediaFormProps) => {
  const isEditing = !!item;
  const createMutation = useCreateNewsMedia();
  const updateMutation = useUpdateNewsMedia();
  const { data: homeNewsCount = 0 } = useHomeNewsCount();
  const { data: homeStoriesCount = 0 } = useHomeStoriesCount();

  const [contentType, setContentType] = useState<'news' | 'story'>(item?.content_type ?? 'news');
  const [title, setTitle] = useState(item?.title ?? '');
  const [excerpt, setExcerpt] = useState(item?.excerpt ?? '');
  const [fullContent, setFullContent] = useState(item?.full_content ?? '');
  const [featuredImageUrl, setFeaturedImageUrl] = useState(item?.featured_image_url ?? '');
  const [videoUrl, setVideoUrl] = useState(item?.video_url ?? '');
  const [sourceUrl, setSourceUrl] = useState(item?.source_url ?? '');
  const [storyThumbnailUrl, setStoryThumbnailUrl] = useState(item?.story_thumbnail_url ?? '');
  const [priority, setPriority] = useState(item?.priority ?? 5);
  const [showOnHome, setShowOnHome] = useState(item?.show_on_home ?? false);
  const [highlightOnHome, setHighlightOnHome] = useState(item?.highlight_on_home ?? false);
  const [showOnArchive, setShowOnArchive] = useState(item?.show_on_archive ?? true);

  const isNews = contentType === 'news';

  // Check if we can enable home display
  const canShowOnHome = isNews
    ? showOnHome || homeNewsCount < 3
    : true; // not applicable for stories
  const canHighlightOnHome = !isNews
    ? highlightOnHome || homeStoriesCount < 3
    : true;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const raw = {
      content_type: contentType,
      title: title.trim(),
      excerpt: excerpt.trim() || null,
      full_content: fullContent.trim() || null,
      featured_image_url: isNews ? (featuredImageUrl.trim() || null) : null,
      video_url: videoUrl.trim() || null,
      source_url: sourceUrl.trim() || null,
      story_thumbnail_url: !isNews ? (storyThumbnailUrl.trim() || null) : null,
      priority,
      show_on_home: isNews ? showOnHome : false,
      highlight_on_home: !isNews ? highlightOnHome : false,
      show_on_archive: showOnArchive,
    };

    const result = newsMediaSchema.safeParse(raw);
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
    <form onSubmit={handleSubmit} className="space-y-4 bg-background p-6 rounded-lg border border-border">
      <h2 className="text-lg font-extrabold uppercase tracking-tight">{isEditing ? "Edit Item" : "New Item"}</h2>

      <div>
        <label className="text-sm font-bold block mb-1">Content Type</label>
        <Select value={contentType} onValueChange={(v) => setContentType(v as 'news' | 'story')} disabled={isEditing}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="story">Story</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Title *</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Excerpt</label>
        <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Full Content (Markdown)</label>
        <Textarea value={fullContent} onChange={(e) => setFullContent(e.target.value)} rows={5} />
      </div>

      {isNews && (
        <ImageUploadField
          label="Featured Image"
          value={featuredImageUrl}
          onChange={setFeaturedImageUrl}
          placeholder="https://..."
        />
      )}

      <div>
        <label className="text-sm font-bold block mb-1">Source / Reference URL</label>
        <Input value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="https://example.com/article" />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">YouTube Video URL</label>
        <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
      </div>

      {!isNews && (
        <ImageUploadField
          label="Story Thumbnail"
          value={storyThumbnailUrl}
          onChange={setStoryThumbnailUrl}
          placeholder="https://..."
          helpText="Falls back to system logo if empty."
        />
      )}

      <div>
        <label className="text-sm font-bold block mb-1">Display Order (1 = lowest, 10 = highest)</label>
        <Input type="number" min={1} max={10} value={priority} onChange={(e) => setPriority(Number(e.target.value))} />
        <p className="text-xs text-muted-foreground mt-1">Higher values appear first on both the home and archive pages.</p>
      </div>

      <div className="flex flex-wrap gap-6">
        {isNews && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="showOnHome"
              checked={showOnHome}
              onCheckedChange={(v) => setShowOnHome(!!v)}
              disabled={!canShowOnHome && !showOnHome}
            />
            <label htmlFor="showOnHome" className="text-sm">
              Show on Home {!canShowOnHome && !showOnHome && "(max 3 reached)"}
            </label>
          </div>
        )}
        {!isNews && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="highlightOnHome"
              checked={highlightOnHome}
              onCheckedChange={(v) => setHighlightOnHome(!!v)}
              disabled={!canHighlightOnHome && !highlightOnHome}
            />
            <label htmlFor="highlightOnHome" className="text-sm">
              Highlight on Home {!canHighlightOnHome && !highlightOnHome && "(max 3 reached)"}
            </label>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Checkbox id="showOnArchive" checked={showOnArchive} onCheckedChange={(v) => setShowOnArchive(!!v)} />
          <label htmlFor="showOnArchive" className="text-sm">Show on Archive</label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : isEditing ? "Update" : "Create"}</Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
};

export default NewsMediaForm;
