import { memo } from "react";
import { Link } from "react-router-dom";
import { useHighlightedStories, useSiteSettings } from "@/hooks/useNewsMedia";
import { Skeleton } from "@/components/ui/skeleton";
import { TfPlay } from "@/components/icons";

function getYoutubeThumbnail(url: string): string | null {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

const HighlightedStoriesSection = memo(() => {
  const { data: stories = [], isLoading } = useHighlightedStories();
  const { data: settings } = useSiteSettings();

  if (isLoading) {
    return (
      <section className="bg-white py-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
          <span className="text-xs font-bold tracking-widest text-[#666666] uppercase">Featured</span>
        <div className="w-[60px] h-1 bg-black mb-4" />
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#222222] mt-2 mb-6">
            HIGHLIGHTED STORIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full h-48 rounded" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (stories.length === 0) return null;

  return (
    <section className="bg-white py-10">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        <span className="text-xs font-bold tracking-widest text-[#666666] uppercase">Featured</span>
        <div className="w-[60px] h-1 bg-black mb-4" />
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#222222] mt-2 mb-6">
          HIGHLIGHTED STORIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => {
            const thumbnail =
              story.story_thumbnail_url ||
              (story.video_url ? getYoutubeThumbnail(story.video_url) : null) ||
              settings?.system_logo_url ||
              "/images/logo-transformation-fund.jpg";

            return (
              <div key={story.id} className="group">
                <div className="relative overflow-hidden rounded bg-[#f5f5f5]">
                  <img
                    src={thumbnail}
                    alt={story.title}
                    className="w-full h-48 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  {story.video_url && (
                    <a
                      href={story.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="bg-white/90 rounded-full p-3">
                        <TfPlay className="h-6 w-6 text-[#222222] fill-[#222222]" />
                      </div>
                    </a>
                  )}
                </div>
                <h4 className="text-base font-extrabold uppercase tracking-tight text-[#222222] mt-4 mb-2">
                  {story.title}
                </h4>
                {story.excerpt && (
                  <p className="text-[0.95rem] font-light text-[#666666] leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                )}
                {story.source_url ? (
                  <a
                    href={story.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[#007847] hover:underline mt-2 inline-block"
                  >
                    Read more →
                  </a>
                ) : (
                  <Link
                    to={`/news-media/${story.id}`}
                    className="text-sm font-bold text-[#007847] hover:underline mt-2 inline-block"
                  >
                    Read more →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

HighlightedStoriesSection.displayName = "HighlightedStoriesSection";

export default HighlightedStoriesSection;
