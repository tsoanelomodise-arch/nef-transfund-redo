import { useParams, Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import { useNewsMediaItem } from "@/hooks/useNewsMedia";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TfArrowLeft, TfExternal } from "@/components/icons";

function getYoutubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

const NewsMediaDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: item, isLoading, error } = useNewsMediaItem(id ?? "");

  useSEO({
    title: item?.title ?? "News & Media",
    description: item?.excerpt ?? "Read the latest from the Transformation Fund.",
    path: `/news-media/${id ?? ""}`,
    image: item?.featured_image_url ?? undefined,
    type: "article",
  });

  return (
    <div className="min-h-screen pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />

      <section className="bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
          <Link
            to="/news-media"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#007847] hover:underline mb-8"
          >
            <TfArrowLeft className="h-4 w-4" />
            Back to News & Media
          </Link>

          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="w-full h-[400px] rounded" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : error || !item ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-extrabold uppercase text-[#222222] mb-4">
                Content Not Found
              </h2>
              <p className="text-[#666666] mb-8">
                This item may have been removed or is not yet published.
              </p>
              <Link
                to="/news-media"
                className="text-sm font-bold text-[#007847] hover:underline"
              >
                Browse all News & Media →
              </Link>
            </div>
          ) : (
            <article>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    variant="outline"
                    className="text-xs font-bold uppercase tracking-widest"
                  >
                    {item.content_type}
                  </Badge>
                  <span className="text-xs font-bold tracking-widest text-[#999999]">
                    {new Date(item.publish_date).toLocaleDateString("en-ZA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="w-[60px] h-1 bg-black mb-4" />
                <h1 className="text-3xl font-extrabold uppercase tracking-tight text-[#222222]">
                  {item.title}
                </h1>
              </div>

              {/* Featured image */}
              {item.featured_image_url && (
                <img loading="lazy" decoding="async"
                  src={item.featured_image_url}
                  alt={item.title}
                  className="w-full max-h-[500px] object-contain rounded mb-10"
                />
              )}

              {/* Video embed */}
              {item.video_url && (() => {
                const embedUrl = getYoutubeEmbedUrl(item.video_url!);
                return embedUrl ? (
                  <div className="aspect-video mb-10 rounded overflow-hidden">
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={item.title}
                    />
                  </div>
                ) : null;
              })()}

              {/* Content */}
              <div className="max-w-3xl">
                <p className="text-[1rem] font-light text-[#444444] leading-relaxed whitespace-pre-line">
                  {item.full_content || item.excerpt || ""}
                </p>
              </div>

              {/* Source link */}
              {item.source_url && (
                <a
                  href={item.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#007847] hover:underline mt-8"
                >
                  <TfExternal className="h-4 w-4" />
                  View original source
                </a>
              )}
            </article>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsMediaDetailPage;
