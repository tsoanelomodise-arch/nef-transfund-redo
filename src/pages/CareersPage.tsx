import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import { useCareersArchive } from "@/hooks/useCareers";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, CalendarClock } from "lucide-react";

const CareersPage = () => {
  useSEO({
    title: "Careers",
    description: "Explore career opportunities at the Transformation Fund. Find open positions and join our mission to drive economic transformation in South Africa.",
    path: "/careers",
  });

  const [page, setPage] = useState(1);
  const { data, isLoading } = useCareersArchive({ page, pageSize: 12 });
  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 12);

  return (
    <div className="min-h-screen pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />

      <section className="bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
          <span className="text-xs font-bold tracking-widest text-[#666666] uppercase">Opportunities</span>
          <div className="w-[60px] h-1 bg-black mb-4" />
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-[#222222] mt-2 mb-8">
            CAREERS
          </h1>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="w-full h-32 rounded" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="text-muted-foreground">No open positions available at the moment.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => {
                  const isExpired = item.closing_date && new Date(item.closing_date) < new Date();

                  return (
                    <article key={item.id} className="group border border-border rounded-lg p-6 hover:shadow-md transition-shadow bg-background">
                      <div className="flex flex-wrap gap-2 mb-3">
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
                      </div>

                      <h3 className="text-base font-extrabold uppercase tracking-tight text-[#222222] mb-2">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-[0.95rem] font-light text-[#666666] leading-relaxed line-clamp-3 mb-4">
                          {item.description}
                        </p>
                      )}

                      {item.closing_date && (
                        <div className={`flex items-center gap-1 text-xs font-bold tracking-wide mb-3 ${isExpired ? 'text-destructive' : 'text-[#999999]'}`}>
                          <CalendarClock className="h-3 w-3" />
                          {isExpired ? "Closed" : `Closes ${new Date(item.closing_date).toLocaleDateString()}`}
                        </div>
                      )}

                      <Link
                        to={`/careers/${item.id}`}
                        className="text-sm font-bold text-[#007847] hover:underline inline-block"
                      >
                        View details →
                      </Link>
                    </article>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
                  <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
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

export default CareersPage;
