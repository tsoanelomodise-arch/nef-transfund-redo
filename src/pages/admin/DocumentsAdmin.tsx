import { useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useDocuments, useSaveDocument, useDeleteDocument, signedDocumentUrl } from "@/hooks/useCms";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Upload, Trash2, FileText } from "lucide-react";

const MAX_SIZE = 25 * 1024 * 1024;

const DocumentsAdmin = () => {
  const { data: documents, isLoading } = useDocuments(false);
  const save = useSaveDocument();
  const remove = useDeleteDocument();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (file.size > MAX_SIZE) {
      toast({ title: "File too large", description: "Maximum size is 25 MB.", variant: "destructive" });
      return;
    }
    setUploading(true);
    setProgress(30);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${Date.now()}-${safeName}`;
    const { error } = await supabase.storage.from("site-documents").upload(path, file, { contentType: file.type });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false); setProgress(0);
      return;
    }
    setProgress(80);
    save.mutate(
      {
        title: file.name.replace(/\.[^.]+$/, ""),
        storage_path: path,
        file_type: file.type,
        file_size: file.size,
        visible: true,
        position: documents?.length ?? 0,
      },
      {
        onSuccess: () => { toast({ title: "Document uploaded" }); setUploading(false); setProgress(0); },
        onError: (e: any) => { toast({ title: "Error", description: e.message, variant: "destructive" }); setUploading(false); setProgress(0); },
      }
    );
  };

  const openDocument = async (path: string) => {
    const url = await signedDocumentUrl(path);
    if (url) window.open(url, "_blank", "noopener");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-2">Documents</h1>
      <p className="text-sm text-muted-foreground mb-6">Upload PDFs and other files, then link them from pages or menu items.</p>

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 rounded-md p-8 text-center cursor-pointer mb-8 bg-background"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) upload(f); }}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Drag & drop a file here, or <span className="text-primary underline">browse</span></p>
        <p className="text-xs text-muted-foreground mt-1">PDF, Word, Excel, PowerPoint — max 25 MB</p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }}
        />
        {uploading && <Progress value={progress} className="mt-3 h-2" />}
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading documents...</p>
      ) : !documents?.length ? (
        <p className="text-muted-foreground">No documents yet.</p>
      ) : (
        <div className="bg-background border border-border rounded-md divide-y divide-border">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 flex flex-wrap items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <Input
                className="flex-1 min-w-[220px]"
                defaultValue={doc.title}
                onBlur={(e) => e.target.value !== doc.title && save.mutate({ id: doc.id, title: e.target.value })}
              />
              <div className="flex items-center gap-2">
                <Switch checked={doc.visible} onCheckedChange={(v) => save.mutate({ id: doc.id, visible: v })} />
                <span className="text-xs text-muted-foreground">Visible</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => openDocument(doc.storage_path)}>Open</Button>
              <Button variant="ghost" size="sm" onClick={() => { if (confirm(`Delete "${doc.title}"?`)) remove.mutate(doc); }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default DocumentsAdmin;
