import { memo } from "react";
import { Link } from "react-router-dom";
import { useNewsHighlights } from "@/hooks/useNewsMedia";
import { Skeleton } from "@/components/ui/skeleton";

const NewsHighlightsSection = memo(() => {
  const { data: newsItems = [], isLoading } = useNewsHighlights();

  return (
    <section className="bg-white">
      <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr]">
        {/* Left image */}
        <img
          src="/images/test-home/wrench-lady.jpg"
          alt="News Highlights"
          className="w-full h-full min-h-[400px] object-contain object-top bg-[#f5f5f5]"
          loading="lazy"
        />

        {/* News content */}
        <div className="p-8 lg:p-10 bg-white">
          <span className="text-xs font-bold tracking-widest text-[#666666] uppercase">
            LATEST UPDATES
          </span>
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#222222] mt-2 mb-8">
            NEWS HIGHLIGHTS & STORIES
          </h2>

          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : newsItems.length === 0 ? (
            <p className="text-[0.95rem] font-light text-[#666666]">No news available yet.</p>
          ) : (
            newsItems.map((item, index) => (
              <div key={item.id} className={`flex gap-4 ${index < newsItems.length - 1 ? "mb-8" : ""}`}>
                {item.source_url ? (
                  <a href={item.source_url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.featured_image_url || "/images/logo-transformation-fund.jpg"}
                      alt={item.title}
                      className="w-20 h-20 rounded object-contain bg-[#f5f5f5] flex-shrink-0 mt-1 cursor-pointer hover:opacity-80 transition-opacity"
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <Link to={`/news-media/${item.id}`}>
                    <img
                      src={item.featured_image_url || "/images/logo-transformation-fund.jpg"}
                      alt={item.title}
                      className="w-20 h-20 rounded object-contain bg-[#f5f5f5] flex-shrink-0 mt-1 cursor-pointer hover:opacity-80 transition-opacity"
                      loading="lazy"
                    />
                  </Link>
                )}
                <div>
                  <h4 className="text-base font-extrabold uppercase tracking-tight text-[#222222] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[0.95rem] font-light text-[#666666] leading-relaxed">
                    {item.excerpt || ""}
                  </p>
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
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
});

NewsHighlightsSection.displayName = "NewsHighlightsSection";

export default NewsHighlightsSection;
