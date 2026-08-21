import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Upload, ImageIcon, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helpText?: string;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const ImageUploadField = ({ label, value, onChange, placeholder, helpText }: ImageUploadFieldProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast({ title: "Invalid file type", description: "Only JPG, PNG, WebP and GIF are allowed.", variant: "destructive" });
      return;
    }
    if (file.size > MAX_SIZE) {
      toast({ title: "File too large", description: "Maximum size is 5 MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    setProgress(20);

    const ext = file.name.split(".").pop() ?? "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    setProgress(50);

    const { error } = await supabase.storage
      .from("news-media-images")
      .upload(fileName, file, { contentType: file.type, upsert: false });

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      setProgress(0);
      return;
    }

    setProgress(90);

    const { data: urlData } = supabase.storage
      .from("news-media-images")
      .getPublicUrl(fileName);

    onChange(urlData.publicUrl);
    setProgress(100);
    setTimeout(() => { setUploading(false); setProgress(0); }, 400);
    toast({ title: "Image uploaded" });
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  }, [uploadFile]);

  return (
    <div>
      <label className="text-sm font-bold block mb-1">{label}</label>
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="upload" className="flex-1 gap-1"><Upload className="h-3.5 w-3.5" /> Upload</TabsTrigger>
          <TabsTrigger value="url" className="flex-1 gap-1"><ImageIcon className="h-3.5 w-3.5" /> URL</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
              dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50"
            }`}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-500" />
            <p className="text-sm text-gray-500">
              Drag & drop an image here, or <span className="text-primary underline">browse</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP, GIF — max 5 MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            className="hidden"
            onChange={handleFileSelect}
          />
          {uploading && <Progress value={progress} className="mt-2 h-2" />}
        </TabsContent>

        <TabsContent value="url">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder ?? "https://..."}
          />
          {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
        </TabsContent>
      </Tabs>

      {value && (
        <div className="mt-2 relative inline-block">
          <img loading="lazy" decoding="async"
            src={value}
            alt="Preview"
            className="h-20 w-20 object-cover rounded-xl border border-gray-200"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
