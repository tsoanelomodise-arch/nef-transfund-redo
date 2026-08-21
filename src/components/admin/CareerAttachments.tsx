import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useCareerAttachments, useDeleteCareerAttachment } from "@/hooks/useCareers";

interface CareerAttachmentsProps {
  careerId: string;
}

const CareerAttachments = ({ careerId }: CareerAttachmentsProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: attachments = [], refetch } = useCareerAttachments(careerId);
  const deleteMutation = useDeleteCareerAttachment();

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setUploading(true);
    try {
      for (const file of fileArray) {
        const ext = file.name.split(".").pop();
        const path = `${careerId}/${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("career-attachments")
          .upload(path, file);

        if (uploadError) throw uploadError;

        const { error: insertError } = await supabase
          .from("career_attachments" as any)
          .insert({
            career_id: careerId,
            file_name: file.name,
            file_url: path,
            file_size: file.size,
            file_type: file.type || ext || "unknown",
          });

        if (insertError) throw insertError;
      }

      toast({ title: `${fileArray.length} file(s) uploaded` });
      refetch();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  }, [careerId, refetch]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    uploadFiles(e.dataTransfer.files);
  }, [uploadFiles]);

  const handleDelete = (id: string, fileUrl: string) => {
    // Extract storage path from URL
    const pathMatch = fileUrl.split("/career-attachments/").pop();
    if (pathMatch) {
      supabase.storage.from("career-attachments").remove([pathMatch]);
    }
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast({ title: "File removed" });
        refetch();
      },
    });
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-bold block">Attachments</label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50"
        }`}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Uploading...
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <Upload className="h-6 w-6" />
            <span className="text-sm">Drag & drop files here, or click to browse</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && uploadFiles(e.target.files)}
      />

      {/* File list */}
      {attachments.length > 0 && (
        <ul className="space-y-2">
          {attachments.map((att: any) => (
            <li key={att.id} className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2 text-sm">
              <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <a
                href={att.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 truncate text-foreground hover:underline"
              >
                {att.file_name}
              </a>
              <span className="text-gray-500 text-xs whitespace-nowrap">{formatSize(att.file_size)}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => handleDelete(att.id, att.file_url)}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CareerAttachments;
