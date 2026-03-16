import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import { useNewsMediaArchive, useSiteSettings } from "@/hooks/useNewsMedia";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";

function getYoutubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function getYoutubeThumbnail(url: string): string | null {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

const NewsMediaPage = () => {
  useSEO({
    title: "News & Media",
    description: "Latest news, updates, and media from the Transformation Fund. Stay informed about funding opportunities, success stories, and economic transformation in South Africa.",
    path: "/news-media",
  });
  const [contentType, setContentType] = useState("all");
  const [page, setPage] = useState(1);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const { data: settings } = useSiteSettings();

  const { data, isLoading } = useNewsMediaArchive({ contentType, page, pageSize: 12 });
  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 12);

  return (
    <div className="min-h-screen pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />

      <section className="bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
          <span className="text-xs font-bold tracking-widest text-[#666666] uppercase">Archive</span>
          <div className="w-[60px] h-1 bg-black mb-4" />
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-[#222222] mt-2 mb-8">
            NEWS & MEDIA
          </h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Select value={contentType} onValueChange={(v) => { setContentType(v); setPage(1); }}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Content Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="story">Stories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="w-full h-48 rounded" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="text-muted-foreground">No content available yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => {
                  const embedUrl = item.video_url ? getYoutubeEmbedUrl(item.video_url) : null;
                  const isPlaying = playingVideo === item.id;

                  const thumbnail =
                    item.featured_image_url ||
                    item.story_thumbnail_url ||
                    (item.video_url ? getYoutubeThumbnail(item.video_url) : null) ||
                    (item.content_type === "story" ? settings?.system_logo_url : null) ||
                    "/images/logo-transformation-fund.jpg";

                  return (
                    <article key={item.id} className="group">
                      <div className="relative overflow-hidden rounded bg-[#f5f5f5]">
                        {isPlaying && embedUrl ? (
                          <iframe
                            src={`${embedUrl}?autoplay=1`}
                            className="w-full h-48"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title={item.title}
                          />
                        ) : (
                          <>
                            <img
                              src={thumbnail}
                              alt={item.title}
                              className="w-full h-48 object-contain"
                              loading="lazy"
                            />
                            {item.video_url && embedUrl && (
                              <button
                                onClick={() => setPlayingVideo(item.id)}
                                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <div className="bg-white/90 rounded-full p-3">
                                  <Play className="h-6 w-6 text-[#222222] fill-[#222222]" />
                                </div>
                              </button>
                            )}
                          </>
                        )}
                      </div>

                      <div className="mt-4">
                        <span className="text-xs font-bold tracking-widest text-[#999999] uppercase">
                          {item.content_type} • {new Date(item.publish_date).toLocaleDateString()}
                        </span>
                        <h3 className="text-base font-extrabold uppercase tracking-tight text-[#222222] mt-1 mb-2">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="text-[0.95rem] font-light text-[#666666] leading-relaxed line-clamp-3">
                            {item.excerpt}
                          </p>
                        )}
                        {item.source_url ? (
                          <a
                            href={item.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-[#007847] hover:underline mt-2 inline-block"
                          >
                            Read more →
                          </a>
                        ) : (
                          <Link
                            to={`/news-media/${item.id}`}
                            className="text-sm font-bold text-[#007847] hover:underline mt-2 inline-block"
                          >
                            Read more →
                          </Link>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsMediaPage;
