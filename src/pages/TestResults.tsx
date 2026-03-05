import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Users, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Submission {
  id: string;
  tester_name: string;
  test_case_id: string;
  category_id: string;
  status: string;
  notes: string;
  submitted_at: string;
}

const TOTAL_TESTS = 35; // Must match initialCategories total in TestingChecklist

const CATEGORY_LABELS: Record<string, string> = {
  navigation: "Navigation",
  pages: "Pages Load",
  contact: "Contact Form",
  pdfs: "PDF Downloads",
  eligibility: "Eligibility & Document Checker",
  responsive: "Responsive Design",
  footer: "Footer & Social Links",
};

const TestResults = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    const { data } = await supabase
      .from("test_submissions")
      .select("*")
      .order("submitted_at", { ascending: false });
    if (data) setSubmissions(data as Submission[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();

    const channel = supabase
      .channel("test-results-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "test_submissions" },
        () => fetchSubmissions()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Group by tester
  const testerMap = new Map<string, Submission[]>();
  submissions.forEach((s) => {
    const existing = testerMap.get(s.tester_name) || [];
    // Keep only latest per test_case_id
    const idx = existing.findIndex((e) => e.test_case_id === s.test_case_id);
    if (idx >= 0) {
      if (s.submitted_at > existing[idx].submitted_at) existing[idx] = s;
    } else {
      existing.push(s);
    }
    testerMap.set(s.tester_name, existing);
  });

  const testers = Array.from(testerMap.entries()).map(([name, subs]) => {
    const passed = subs.filter((s) => s.status === "pass").length;
    const failed = subs.filter((s) => s.status === "fail").length;
    const completed = passed + failed;
    const lastActivity = subs.reduce((latest, s) =>
      s.submitted_at > latest ? s.submitted_at : latest, subs[0]?.submitted_at || "");
    return { name, subs, passed, failed, completed, lastActivity };
  });

  testers.sort((a, b) => b.lastActivity.localeCompare(a.lastActivity));

  const totalTesters = testers.length;
  const overallCompleted = testers.reduce((sum, t) => sum + t.completed, 0);
  const overallPassed = testers.reduce((sum, t) => sum + t.passed, 0);
  const overallFailed = testers.reduce((sum, t) => sum + t.failed, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Test Results Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time view of UAT testing progress across all testers
          </p>
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
              <p className="text-2xl font-bold text-foreground">{totalTesters}</p>
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

        {totalTesters === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground">No test submissions yet. Results will appear here in real-time as testers complete the checklist.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Per-tester breakdown */}
            {testers.map((tester) => {
              const categoryGroups = new Map<string, Submission[]>();
              tester.subs.forEach((s) => {
                const arr = categoryGroups.get(s.category_id) || [];
                arr.push(s);
                categoryGroups.set(s.category_id, arr);
              });

              return (
                <Card key={tester.name} className="mb-4">
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle className="text-lg">{tester.name}</CardTitle>
                      <div className="flex gap-2 items-center">
                        <Badge variant="default" className="bg-green-600 hover:bg-green-600">{tester.passed} passed</Badge>
                        <Badge variant="destructive">{tester.failed} failed</Badge>
                        <span className="text-xs text-muted-foreground">
                          {tester.completed}/{TOTAL_TESTS}
                        </span>
                      </div>
                    </div>
                    <Progress value={(tester.completed / TOTAL_TESTS) * 100} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Last activity: {new Date(tester.lastActivity).toLocaleString("en-ZA")}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Array.from(categoryGroups.entries()).map(([catId, catSubs]) => {
                        const catPassed = catSubs.filter((s) => s.status === "pass").length;
                        const catFailed = catSubs.filter((s) => s.status === "fail").length;
                        const failures = catSubs.filter((s) => s.status === "fail" && s.notes);

                        return (
                          <div key={catId} className="border border-border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-foreground">
                                {CATEGORY_LABELS[catId] || catId}
                              </span>
                              <div className="flex gap-2 text-xs">
                                <span className="text-green-600">{catPassed} ✓</span>
                                {catFailed > 0 && <span className="text-red-600">{catFailed} ✗</span>}
                              </div>
                            </div>
                            <div className="space-y-1">
                              {catSubs.map((s) => (
                                <div
                                  key={s.id}
                                  className={`text-xs rounded p-2 flex items-start gap-2 ${
                                    s.status === "pass"
                                      ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900"
                                      : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900"
                                  }`}
                                >
                                  {s.status === "pass" ? (
                                    <CheckCircle className="h-3.5 w-3.5 text-green-600 shrink-0 mt-0.5" />
                                  ) : (
                                    <XCircle className="h-3.5 w-3.5 text-red-600 shrink-0 mt-0.5" />
                                  )}
                                  <div className="min-w-0">
                                    <span className={`font-medium ${s.status === "pass" ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                                      {s.test_case_id}
                                    </span>
                                    {s.notes && (
                                      <p className={`mt-0.5 ${s.status === "pass" ? "text-green-600 dark:text-green-300" : "text-red-600 dark:text-red-300"}`}>
                                        {s.notes}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default TestResults;
