import { useParams, Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useCareerBySlug, useCareerAttachmentsBySlug } from "@/hooks/useCareers";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Briefcase, Calendar, ExternalLink, DollarSign, FileText, Download } from "lucide-react";

const CareerDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: job, isLoading, error } = useCareerBySlug(slug ?? "");

  useSEO({
    title: job?.title ?? "Career Details",
    description: job?.summary ?? "View career opportunity details at the Transformation Fund.",
    path: `/careers/${slug}`,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-[180px] lg:pt-[210px]">
        <PhakamaniNavbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen pt-[180px] lg:pt-[210px]">
        <PhakamaniNavbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Position Not Found</h1>
          <p className="text-muted-foreground mb-6">This job posting may no longer be available.</p>
          <Link to="/careers">
            <Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Careers</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <Link to="/careers" className="inline-flex items-center gap-1 text-sm opacity-80 hover:opacity-100 mb-4">
            <ArrowLeft className="h-4 w-4" /> All Careers
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-3 mt-4">
            {job.department && <Badge className="bg-primary-foreground/20 text-primary-foreground">{job.department}</Badge>}
            {job.location && (
              <Badge className="bg-primary-foreground/20 text-primary-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {job.location}
              </Badge>
            )}
            {job.employment_type && (
              <Badge className="bg-primary-foreground/20 text-primary-foreground flex items-center gap-1">
                <Briefcase className="h-3 w-3" /> {job.employment_type}
              </Badge>
            )}
            <Badge className="bg-primary-foreground/20 text-primary-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Posted {new Date(job.publish_date).toLocaleDateString()}
            </Badge>
            {job.salary_range && (
              <Badge className="bg-primary-foreground/20 text-primary-foreground flex items-center gap-1">
                <DollarSign className="h-3 w-3" /> {job.salary_range}
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-10 max-w-4xl">
        {job.description && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-3">About the Role</h2>
            <div className="text-foreground/80 whitespace-pre-wrap leading-relaxed">{job.description}</div>
          </div>
        )}

        {job.responsibilities && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-3">Responsibilities</h2>
            <div className="text-foreground/80 whitespace-pre-wrap leading-relaxed">{job.responsibilities}</div>
          </div>
        )}

        {job.requirements && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-3">Requirements</h2>
            <div className="text-foreground/80 whitespace-pre-wrap leading-relaxed">{job.requirements}</div>
          </div>
        )}

        {job.closing_date && (
          <p className="text-sm text-muted-foreground mb-6">
            Closing date: {new Date(job.closing_date).toLocaleDateString()}
          </p>
        )}

        {/* CTA */}
        <div className="mt-10 flex gap-4">
          {job.apply_url ? (
            <a href={job.apply_url} target="_blank" rel="noopener noreferrer">
              <Button variant="cta" size="lg">
                Apply Now <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </a>
          ) : (
            <Link to="/contacts">
              <Button variant="cta" size="lg">Contact Us to Apply</Button>
            </Link>
          )}
          <Link to="/careers">
            <Button variant="outline" size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Careers
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerDetailPage;
