import { useState, useEffect } from "react";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useNewsMedia";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const NewsMediaSettings = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    if (settings) {
      setYoutubeUrl(settings.youtube_channel_url);
      setLogoUrl(settings.system_logo_url);
    }
  }, [settings]);

  const handleSave = () => {
    updateSettings.mutate(
      { youtube_channel_url: youtubeUrl, system_logo_url: logoUrl },
      {
        onSuccess: () => toast({ title: "Settings saved" }),
        onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
      }
    );
  };

  if (isLoading) return <p className="text-gray-500">Loading settings...</p>;

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <label className="text-sm font-bold text-foreground block mb-1">YouTube Channel URL</label>
        <Input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://www.youtube.com/@yourchannel" />
        <p className="text-xs text-gray-500 mt-1">Only videos from this channel will be allowed.</p>
      </div>
      <div>
        <label className="text-sm font-bold text-foreground block mb-1">System Logo URL (Story Fallback)</label>
        <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://example.com/logo.png" />
        {logoUrl && (
          <img loading="lazy" decoding="async" src={logoUrl} alt="Preview" className="mt-2 h-16 w-auto object-contain rounded-xl border border-gray-200" />
        )}
      </div>
      <Button onClick={handleSave} disabled={updateSettings.isPending}>
        {updateSettings.isPending ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
};

export default NewsMediaSettings;
