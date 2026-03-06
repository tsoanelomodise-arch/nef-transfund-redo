import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Users, Clock, MessageSquare, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Submission {
  id: string;
  tester_name: string;
  test_case_id: string;
  category_id: string;
  status: string;
  notes: string;
  submitted_at: string;
}

interface TestCaseDef {
  id: string;
  description: string;
}

interface CategoryDef {
  id: string;
  title: string;
  cases: TestCaseDef[];
}

const TEST_CASES: CategoryDef[] = [
  {
    id: "navigation", title: "Navigation", cases: [
      { id: "nav-1", description: "Click each top-level navbar link" },
      { id: "nav-2", description: "Open mobile hamburger menu and click each link" },
      { id: "nav-3", description: "Test dropdown menus (Eligibility, About, Investors)" },
      { id: "nav-4", description: "Click 'Eligibility & Document Checklist' anchor link" },
      { id: "nav-5", description: "Click logo to return to home page" },
    ],
  },
  {
    id: "pages", title: "Pages Load", cases: [
      { id: "pg-1", description: "Load Home page (/)" },
      { id: "pg-2", description: "Load Eligibility (/eligibility)" },
      { id: "pg-3", description: "Load Products (/eligibility/products)" },
      { id: "pg-4", description: "Load Market Segments (/eligibility/market-segments)" },
      { id: "pg-5", description: "Load Funding Process (/eligibility/process)" },
      { id: "pg-6", description: "Load About (/about)" },
      { id: "pg-7", description: "Load Fund Purpose (/about/why)" },
      { id: "pg-8", description: "Load Contacts (/contacts)" },
      { id: "pg-9", description: "Load Investors (/investors)" },
      { id: "pg-10", description: "Load FAQ (/faq)" },
      { id: "pg-11", description: "Load Resources (/resources)" },
      { id: "pg-12", description: "Load News & Media (/news-media)" },
    ],
  },
  {
    id: "contact", title: "Contact Form", cases: [
      { id: "ct-1", description: "Submit form with all fields empty" },
      { id: "ct-2", description: "Enter invalid email format" },
      { id: "ct-3", description: "Enter invalid phone number (letters)" },
      { id: "ct-4", description: "Fill all fields correctly and submit" },
    ],
  },
  {
    id: "pdfs", title: "PDF Downloads", cases: [
      { id: "pdf-1", description: "Click TF Framework Document download link" },
      { id: "pdf-2", description: "Click Executive Summary download link" },
    ],
  },
  {
    id: "eligibility", title: "Eligibility & Document Checker", cases: [
      { id: "el-1", description: "Open Eligibility Checker modal" },
      { id: "el-2", description: "Complete eligibility quiz with eligible answers" },
      { id: "el-3", description: "Complete eligibility quiz with ineligible answers" },
      { id: "el-4", description: "Open Document Checklist modal" },
      { id: "el-5", description: "Watch eligibility checker video (if present)" },
    ],
  },
  {
    id: "responsive", title: "Responsive Design", cases: [
      { id: "rsp-1", description: "View Home page on mobile (< 768px)" },
      { id: "rsp-2", description: "View Eligibility page on tablet (768px–1024px)" },
      { id: "rsp-3", description: "View Contacts page on mobile" },
      { id: "rsp-4", description: "Check hero sections on all breakpoints" },
      { id: "rsp-5", description: "View Fund Purpose (/about/why) on mobile" },
      { id: "rsp-6", description: "View Fund Policy (/about/why/policy-choice) on mobile" },
    ],
  },
  {
    id: "footer", title: "Footer & Social Links", cases: [
      { id: "ft-1", description: "Click each footer navigation link" },
      { id: "ft-2", description: "Click social media icons (LinkedIn, YouTube, etc.)" },
      { id: "ft-3", description: "Scan QR code image (if applicable)" },
    ],
  },
];

const TOTAL_TESTS = TEST_CASES.reduce((sum, cat) => sum + cat.cases.length, 0);

const TestResults = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSubmissions = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      const { data, error } = await supabase
        .from("test_submissions")
        .select("*")
        .order("submitted_at", { ascending: false });
      if (error) {
        console.error("Failed to fetch submissions:", error);
      } else if (data) {
        setSubmissions(data as Submission[]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    const channel = supabase
      .channel("test-results-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "test_submissions" }, () => fetchSubmissions())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  // Deduplicate: keep latest submission per tester+test_case_id
  const latestMap = new Map<string, Submission>();
  submissions.forEach((s) => {
    const key = `${s.tester_name}::${s.test_case_id}`;
    const existing = latestMap.get(key);
    if (!existing || s.submitted_at > existing.submitted_at) {
      latestMap.set(key, s);
    }
  });

  // Build lookup: testCaseId -> testerName -> Submission
  const lookup = new Map<string, Map<string, Submission>>();
  const testerSet = new Set<string>();
  latestMap.forEach((s) => {
    testerSet.add(s.tester_name);
    if (!lookup.has(s.test_case_id)) lookup.set(s.test_case_id, new Map());
    lookup.get(s.test_case_id)!.set(s.tester_name, s);
  });

  const testerNames = Array.from(testerSet).sort();

  // Stats
  const allSubs = Array.from(latestMap.values());
  const overallPassed = allSubs.filter((s) => s.status === "pass").length;
  const overallFailed = allSubs.filter((s) => s.status === "fail").length;
  const overallCompleted = overallPassed + overallFailed;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading results...</p>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background">
        <div className="max-w-[95vw] mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground mb-2">Test Results Dashboard</h1>
              <Button variant="outline" size="sm" onClick={() => { setSubmissions([]); setLoading(true); fetchSubmissions(); }} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
            <p className="text-muted-foreground">Cross-tester comparison — hover icons for notes</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Live updates</span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">{testerNames.length}</p>
                <p className="text-xs text-muted-foreground">Testers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold text-foreground">{overallCompleted}</p>
                <p className="text-xs text-muted-foreground">Total Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-600">{overallPassed}</p>
                <p className="text-xs text-muted-foreground">Passed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <XCircle className="h-6 w-6 mx-auto mb-2 text-red-600" />
                <p className="text-2xl font-bold text-red-600">{overallFailed}</p>
                <p className="text-xs text-muted-foreground">Failed</p>
              </CardContent>
            </Card>
          </div>

          {testerNames.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">No test submissions yet. Results will appear here in real-time as testers complete the checklist.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <ScrollArea className="w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="sticky left-0 z-10 bg-background min-w-[280px] border-r border-border">
                          Test Case
                        </TableHead>
                        {testerNames.map((name) => (
                          <TableHead key={name} className="text-center min-w-[100px] whitespace-nowrap">
                            {name}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TEST_CASES.map((category) => (
                        <>
                          {/* Category header row */}
                          <TableRow key={`cat-${category.id}`} className="bg-muted/50 hover:bg-muted/50">
                            <TableCell
                              colSpan={testerNames.length + 1}
                              className="sticky left-0 z-10 font-semibold text-foreground text-sm py-2"
                            >
                              {category.title}
                            </TableCell>
                          </TableRow>
                          {/* Test case rows */}
                          {category.cases.map((tc) => {
                            const testerSubs = lookup.get(tc.id);
                            return (
                              <TableRow key={tc.id}>
                                <TableCell className="sticky left-0 z-10 bg-background border-r border-border">
                                  <div className="flex items-start gap-2">
                                    <Badge variant="outline" className="shrink-0 text-[10px] font-mono px-1.5">
                                      {tc.id}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground leading-tight">
                                      {tc.description}
                                    </span>
                                  </div>
                                </TableCell>
                                {testerNames.map((testerName) => {
                                  const sub = testerSubs?.get(testerName);
                                  if (!sub) {
                                    return (
                                      <TableCell key={testerName} className="text-center">
                                        <span className="text-muted-foreground/40">—</span>
                                      </TableCell>
                                    );
                                  }
                                  const isPassed = sub.status === "pass";
                                  const icon = isPassed ? (
                                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                                  );

                                  if (sub.notes) {
                                    return (
                                      <TableCell key={testerName} className="text-center">
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <div className="inline-flex items-center gap-0.5 cursor-help">
                                              {icon}
                                              <MessageSquare className="h-2.5 w-2.5 text-muted-foreground" />
                                            </div>
                                          </TooltipTrigger>
                                          <TooltipContent side="top" className="max-w-[250px]">
                                            <p className="text-xs">{sub.notes}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TableCell>
                                    );
                                  }

                                  return (
                                    <TableCell key={testerName} className="text-center">
                                      {icon}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TestResults;
