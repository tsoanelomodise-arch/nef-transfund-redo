import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useCareersListing } from "@/hooks/useCareers";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TfPin, TfBriefcase, TfCalendar, TfSearch } from "@/components/icons";

const CareersPage = () => {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useSEO({
    title: "Careers",
    description: "Explore career opportunities at the Transformation Fund. Join our mission to support inclusive economic transformation in South Africa.",
    path: "/careers",
  });

  const { data: jobs = [], isLoading } = useCareersListing({
    search: search || undefined,
    location: locationFilter !== "all" ? locationFilter : undefined,
    department: departmentFilter !== "all" ? departmentFilter : undefined,
    employmentType: typeFilter !== "all" ? typeFilter : undefined,
  });

  // Extract unique filter values
  const { locations, departments, types } = useMemo(() => {
    const locs = new Set<string>();
    const depts = new Set<string>();
    const types = new Set<string>();
    jobs.forEach((j) => {
      if (j.location) locs.add(j.location);
      if (j.department) depts.add(j.department);
      if (j.employment_type) types.add(j.employment_type);
    });
    return {
      locations: Array.from(locs).sort(),
      departments: Array.from(depts).sort(),
      types: Array.from(types).sort(),
    };
  }, [jobs]);

  return (
    <div className="min-h-screen pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Career Opportunities</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join the Transformation Fund and help build an inclusive economy for South Africa.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <TfSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="TfSearch jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Location" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Job Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {isLoading ? (
          <p className="text-muted-foreground text-center py-12">Loading opportunities...</p>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl font-semibold text-foreground mb-2">No open positions found</p>
            <p className="text-muted-foreground">Check back soon for new opportunities.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <Link key={job.id} to={`/careers/${job.slug}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <CardTitle className="text-lg text-foreground">{job.title}</CardTitle>
                      <div className="flex gap-2 flex-wrap">
                        {job.employment_type && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <TfBriefcase className="h-3 w-3" />
                            {job.employment_type}
                          </Badge>
                        )}
                        {job.location && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <TfPin className="h-3 w-3" />
                            {job.location}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {job.department && (
                      <p className="text-sm text-muted-foreground mb-1">{job.department}</p>
                    )}
                    {job.summary && (
                      <p className="text-sm text-foreground line-clamp-2">{job.summary}</p>
                    )}
                    <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                      <TfCalendar className="h-3 w-3" />
                      Posted {new Date(job.publish_date).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
