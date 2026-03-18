import { useParams, Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import { useCareerItem } from "@/hooks/useCareers";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Briefcase, CalendarClock } from "lucide-react";

const CareerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: item, isLoading, error } = useCareerItem(id ?? "");

  useSEO({
    title: item?.title ?? "Careers",
    description: item?.description?.slice(0, 160) ?? "View this career opportunity at the Transformation Fund.",
    path: `/careers/${id ?? ""}`,
  });

  const isExpired = item?.closing_date && new Date(item.closing_date) < new Date();

  return (
    <div className="min-h-screen pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />

      <section className="bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#007847] hover:underline mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Careers
          </Link>

          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : error || !item ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-extrabold uppercase text-[#222222] mb-4">
                Position Not Found
              </h2>
              <p className="text-[#666666] mb-8">
                This position may have been removed or is not yet published.
              </p>
              <Link to="/careers" className="text-sm font-bold text-[#007847] hover:underline">
                Browse all Careers →
              </Link>
            </div>
          ) : (
            <article>
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {item.employment_type && (
                    <Badge variant="outline" className="capitalize flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {item.employment_type}
                    </Badge>
                  )}
                  {item.location && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </Badge>
                  )}
                  {item.closing_date && (
                    <Badge variant={isExpired ? "destructive" : "outline"} className="flex items-center gap-1">
                      <CalendarClock className="h-3 w-3" />
                      {isExpired ? "Closed" : `Closes ${new Date(item.closing_date).toLocaleDateString()}`}
                    </Badge>
                  )}
                </div>
                <div className="w-[60px] h-1 bg-black mb-4" />
                <h1 className="text-3xl font-extrabold uppercase tracking-tight text-[#222222]">
                  {item.title}
                </h1>
              </div>

              <div className="max-w-3xl">
                <p className="text-[1rem] font-light text-[#444444] leading-relaxed whitespace-pre-line">
                  {item.description || "No description provided."}
                </p>
              </div>
            </article>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerDetailPage;
