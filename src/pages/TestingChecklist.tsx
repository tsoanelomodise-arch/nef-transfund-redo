import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Printer, RotateCcw, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type TestStatus = "pass" | "fail" | "pending";

interface TestCase {
  id: string;
  description: string;
  expected: string;
  status: TestStatus;
  notes: string;
}

interface TestCategory {
  id: string;
  title: string;
  cases: TestCase[];
  collapsed: boolean;
}

const STORAGE_KEY = "tf-testing-checklist";

const initialCategories: TestCategory[] = [
  {
    id: "navigation",
    title: "Navigation",
    collapsed: false,
    cases: [
      { id: "nav-1", description: "Click each top-level navbar link", expected: "Navigates to correct page without errors", status: "pending", notes: "" },
      { id: "nav-2", description: "Open mobile hamburger menu and click each link", expected: "Menu opens, links navigate correctly, menu closes", status: "pending", notes: "" },
      { id: "nav-3", description: "Test dropdown menus (Eligibility, About, Investors)", expected: "Dropdowns open on hover/click, sub-links work", status: "pending", notes: "" },
      { id: "nav-4", description: "Click 'Eligibility & Document Checklist' anchor link", expected: "Scrolls to section with full heading visible (not hidden by navbar)", status: "pending", notes: "" },
      { id: "nav-5", description: "Click logo to return to home page", expected: "Navigates to home page", status: "pending", notes: "" },
    ],
  },
  {
    id: "pages",
    title: "Pages Load",
    collapsed: false,
    cases: [
      { id: "pg-1", description: "Load Home page (/)", expected: "Page loads with hero, products, news sections", status: "pending", notes: "" },
      { id: "pg-2", description: "Load Eligibility (/eligibility)", expected: "Page loads with all sections visible", status: "pending", notes: "" },
      { id: "pg-3", description: "Load Products (/eligibility/products)", expected: "Products page loads with fund cards", status: "pending", notes: "" },
      { id: "pg-4", description: "Load Market Segments (/eligibility/market-segments)", expected: "Market segments page loads with sector icons", status: "pending", notes: "" },
      { id: "pg-5", description: "Load Funding Process (/eligibility/process)", expected: "Process page loads with steps", status: "pending", notes: "" },
      { id: "pg-6", description: "Load About (/about)", expected: "About page loads correctly", status: "pending", notes: "" },
      { id: "pg-7", description: "Load Fund Purpose (/about/why)", expected: "Page loads with pillars, mobile-optimized hero", status: "pending", notes: "" },
      { id: "pg-8", description: "Load Contacts (/contacts)", expected: "Contact form and details display", status: "pending", notes: "" },
      { id: "pg-9", description: "Load Investors (/investors)", expected: "Investors page loads", status: "pending", notes: "" },
      { id: "pg-10", description: "Load FAQ (/faq)", expected: "FAQ accordions display", status: "pending", notes: "" },
      { id: "pg-11", description: "Load Resources (/resources)", expected: "Resources page with download links", status: "pending", notes: "" },
      { id: "pg-12", description: "Load News & Media (/news-media)", expected: "News listing page loads", status: "pending", notes: "" },
    ],
  },
  {
    id: "contact",
    title: "Contact Form",
    collapsed: false,
    cases: [
      { id: "ct-1", description: "Submit form with all fields empty", expected: "Validation errors shown for all required fields", status: "pending", notes: "" },
      { id: "ct-2", description: "Enter invalid email format", expected: "Email validation error displayed", status: "pending", notes: "" },
      { id: "ct-3", description: "Enter invalid phone number (letters)", expected: "Phone validation error displayed", status: "pending", notes: "" },
      { id: "ct-4", description: "Fill all fields correctly and submit", expected: "mailto link opens with correct recipient and pre-filled data", status: "pending", notes: "" },
    ],
  },
  {
    id: "pdfs",
    title: "PDF Downloads",
    collapsed: false,
    cases: [
      { id: "pdf-1", description: "Click TF Framework Document download link", expected: "PDF opens or downloads correctly", status: "pending", notes: "" },
      { id: "pdf-2", description: "Click Executive Summary download link", expected: "PDF opens or downloads correctly", status: "pending", notes: "" },
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility & Document Checker",
    collapsed: false,
    cases: [
      { id: "el-1", description: "Open Eligibility Checker modal", expected: "Modal opens with quiz questions", status: "pending", notes: "" },
      { id: "el-2", description: "Complete eligibility quiz with eligible answers", expected: "Shows eligible result with next steps", status: "pending", notes: "" },
      { id: "el-3", description: "Complete eligibility quiz with ineligible answers", expected: "Shows not eligible result with explanation", status: "pending", notes: "" },
      { id: "el-4", description: "Open Document Checklist modal", expected: "Modal opens with document checklist", status: "pending", notes: "" },
      { id: "el-5", description: "Watch eligibility checker video (if present)", expected: "Video plays correctly", status: "pending", notes: "" },
    ],
  },
  {
    id: "responsive",
    title: "Responsive Design",
    collapsed: false,
    cases: [
      { id: "rsp-1", description: "View Home page on mobile (< 768px)", expected: "Layout adapts, no horizontal scroll, all content readable", status: "pending", notes: "" },
      { id: "rsp-2", description: "View Path to Funding on tablet (768px–1024px)", expected: "Layout adapts correctly", status: "pending", notes: "" },
      { id: "rsp-3", description: "View Contacts page on mobile", expected: "Form is usable, fields stack vertically", status: "pending", notes: "" },
      { id: "rsp-4", description: "Check hero sections on all breakpoints", expected: "Images and text scale appropriately", status: "pending", notes: "" },
    ],
  },
  {
    id: "footer",
    title: "Footer & Social Links",
    collapsed: false,
    cases: [
      { id: "ft-1", description: "Click each footer navigation link", expected: "Navigates to correct page", status: "pending", notes: "" },
      { id: "ft-2", description: "Click social media icons (LinkedIn, YouTube, etc.)", expected: "Opens correct social profile in new tab", status: "pending", notes: "" },
      { id: "ft-3", description: "Scan QR code image (if applicable)", expected: "QR code links to correct destination", status: "pending", notes: "" },
    ],
  },
];

const statusIcon = (status: TestStatus) => {
  switch (status) {
    case "pass": return <CheckCircle className="h-5 w-5 text-green-600" />;
    case "fail": return <XCircle className="h-5 w-5 text-red-600" />;
    
    default: return <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/40" />;
  }
};

const TestingChecklist = () => {
  const [categories, setCategories] = useState<TestCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  const [testerName, setTesterName] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY + "-name") || ""; } catch { return ""; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + "-name", testerName);
  }, [testerName]);

  const allCases = categories.flatMap((c) => c.cases);
  const completed = allCases.filter((c) => c.status !== "pending").length;
  const passed = allCases.filter((c) => c.status === "pass").length;
  const failed = allCases.filter((c) => c.status === "fail").length;
  
  const total = allCases.length;

  const updateCase = useCallback((categoryId: string, caseId: string, updates: Partial<TestCase>) => {
    setCategories((prev) => {
      const updated = prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, cases: cat.cases.map((tc) => (tc.id === caseId ? { ...tc, ...updates } : tc)) }
          : cat
      );

      // Sync to DB if status changed and tester name exists
      const cat = updated.find((c) => c.id === categoryId);
      const tc = cat?.cases.find((c) => c.id === caseId);
      if (tc && tc.status !== "pending" && testerName.trim()) {
        supabase
          .from("test_submissions")
          .upsert(
            {
              tester_name: testerName.trim(),
              test_case_id: caseId,
              category_id: categoryId,
              status: tc.status,
              notes: tc.notes || "",
              submitted_at: new Date().toISOString(),
            },
            { onConflict: "tester_name,test_case_id" }
          )
          .then();
      }

      return updated;
    });
  }, [testerName]);

  const toggleCollapse = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, collapsed: !cat.collapsed } : cat))
    );
  };

  const [validationFailed, setValidationFailed] = useState(false);

  const handleExportPdf = () => {
    const errors: string[] = [];

    if (!testerName.trim()) {
      errors.push("Please enter your name before exporting.");
    }

    const pendingCategories = categories
      .filter((cat) => cat.cases.some((c) => c.status === "pending"))
      .map((cat) => cat.title);
    if (pendingCategories.length > 0) {
      errors.push(`Incomplete categories: ${pendingCategories.join(", ")}`);
    }

    const failsWithoutNotes = categories
      .flatMap((cat) => cat.cases)
      .filter((c) => c.status === "fail" && !c.notes.trim());
    if (failsWithoutNotes.length > 0) {
      errors.push(`${failsWithoutNotes.length} failed test(s) missing notes.`);
    }

    if (errors.length > 0) {
      setValidationFailed(true);
      // Auto-expand categories with pending items
      setCategories((prev) =>
        prev.map((cat) =>
          cat.cases.some((c) => c.status === "pending" || (c.status === "fail" && !c.notes.trim()))
            ? { ...cat, collapsed: false }
            : cat
        )
      );
      toast.error(errors.join(" "));
      return;
    }

    setValidationFailed(false);
    window.print();
  };
  const resetAll = () => {
    if (window.confirm("Reset all test results? This cannot be undone.")) {
      setCategories(initialCategories);
      setTesterName("");
      setValidationFailed(false);
    }
  };


  return (
    <div className="min-h-screen bg-background print:bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 print:mb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Website Testing Checklist</h1>
          <p className="text-muted-foreground">
            Transformation Fund — UAT Testing Template
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="text-sm font-medium text-foreground">
              Tester Name:
              <input
                className={`ml-2 border rounded-md px-3 py-1.5 text-sm bg-background ${validationFailed && !testerName.trim() ? "border-destructive ring-1 ring-destructive" : "border-input"}`}
                value={testerName}
                onChange={(e) => setTesterName(e.target.value)}
                placeholder="Enter your name"
              />
            </label>
            <span className="text-sm text-muted-foreground">
              Date: {new Date().toLocaleDateString("en-ZA")}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mb-6 border-primary/20 print:shadow-none print:border">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">📋 How to Complete This Checklist</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li><span className="font-medium text-foreground">Enter your name</span> in the field above so we know who completed the testing.</li>
              <li><span className="font-medium text-foreground">Work through each category</span> — open the website in another tab and perform each test described.</li>
              <li>For each test, click <span className="font-medium text-foreground">Pass</span> (working as expected) or <span className="font-medium text-foreground">Fail</span> (something is broken or incorrect).</li>
              <li>If a test <span className="font-medium text-foreground">fails</span>, a notes field will appear — please describe what went wrong (e.g. &quot;button does nothing on mobile&quot;).</li>
              <li>When finished, click <span className="font-medium text-foreground">&quot;Print / Export PDF&quot;</span> to save a copy of your results.</li>
              <li><span className="font-medium text-foreground">Note:</span> All test cases must be marked Pass or Fail, and failed tests must include notes, before you can export to PDF.</li>
            </ol>
          </CardContent>
        </Card>


        <Card className="mb-6 print:shadow-none print:border">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-center mb-3">
              <span className="text-sm font-medium text-foreground">{completed}/{total} completed</span>
              <Badge variant="default" className="bg-green-600 hover:bg-green-600">{passed} passed</Badge>
              <Badge variant="destructive">{failed} failed</Badge>
              
            </div>
            <Progress value={(completed / total) * 100} className="h-3" />
            <div className="flex gap-2 mt-4 print:hidden">
              <Button variant="outline" size="sm" onClick={handleExportPdf}>
                <Printer className="h-4 w-4 mr-1" /> Print / Export PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                const nonPending = categories.flatMap(cat => cat.cases.filter(c => c.status !== "pending").map(c => ({ cat, c })));
                if (!testerName.trim()) { toast.error("Please enter your name before saving."); return; }
                let count = 0;
                nonPending.forEach(({ cat, c }) => {
                  supabase.from("test_submissions").upsert({
                    tester_name: testerName.trim(),
                    test_case_id: c.id,
                    category_id: cat.id,
                    status: c.status,
                    notes: c.notes || "",
                    submitted_at: new Date().toISOString(),
                  }, { onConflict: "tester_name,test_case_id" }).then();
                  count++;
                });
                toast.success(`Saved ${count} result(s) to database.`);
              }}>
                <CheckCircle className="h-4 w-4 mr-1" /> Save Progress
              </Button>
              <Button variant="outline" size="sm" onClick={resetAll}>
                <RotateCcw className="h-4 w-4 mr-1" /> Reset All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        {categories.map((cat) => {
          const catPassed = cat.cases.filter((c) => c.status === "pass").length;
          const catFailed = cat.cases.filter((c) => c.status === "fail").length;
          const catTotal = cat.cases.length;

          return (
            <Card key={cat.id} className="mb-4 print:shadow-none print:border print:break-inside-avoid">
              <CardHeader
                className="cursor-pointer select-none print:cursor-default"
                onClick={() => toggleCollapse(cat.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {cat.collapsed ? <ChevronRight className="h-5 w-5 print:hidden" /> : <ChevronDown className="h-5 w-5 print:hidden" />}
                    <CardTitle className="text-lg">{cat.title}</CardTitle>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="text-green-600 font-medium">{catPassed}/{catTotal}</span>
                    {catFailed > 0 && <span className="text-red-600 font-medium">{catFailed} failed</span>}
                  </div>
                </div>
              </CardHeader>
              {(!cat.collapsed || typeof window !== "undefined" && window.matchMedia?.("print")?.matches) && (
                <CardContent className="space-y-4">
                  {cat.cases.map((tc, idx) => (
                    <div
                      key={tc.id}
                      className={`p-4 rounded-lg border transition-colors ${
                        tc.status === "pass" ? "border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-900" :
                        tc.status === "fail" ? "border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900" :
                        "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{statusIcon(tc.status)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground"><span className="text-muted-foreground mr-1.5">{idx + 1}.</span>{tc.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="font-medium">Expected:</span> {tc.expected}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3 print:hidden">
                            {(["pass", "fail"] as TestStatus[]).map((s) => (
                              <Button
                                key={s}
                                size="sm"
                                variant={tc.status === s ? "default" : "outline"}
                                className={
                                  tc.status === s
                                    ? s === "pass" ? "bg-green-600 hover:bg-green-700 text-white" :
                                      "bg-red-600 hover:bg-red-700 text-white"
                                    : ""
                                }
                                onClick={() => updateCase(cat.id, tc.id, { status: tc.status === s ? "pending" : s })}
                              >
                                {s === "pass" ? "Pass" : "Fail"}
                              </Button>
                            ))}
                          </div>
                          {(tc.status === "fail" || tc.notes) && (
                            <Textarea
                              className="mt-3 text-sm print:border print:shadow-none"
                              placeholder="Add notes (especially for failures)..."
                              value={tc.notes}
                              onChange={(e) => updateCase(cat.id, tc.id, { notes: e.target.value })}
                              rows={2}
                            />
                          )}
                          {tc.status !== "fail" && !tc.notes && (
                            <button
                              className="text-xs text-muted-foreground hover:text-foreground mt-2 print:hidden"
                              onClick={() => updateCase(cat.id, tc.id, { notes: " " })}
                            >
                              + Add notes
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TestingChecklist;
