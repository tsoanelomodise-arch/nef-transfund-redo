import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePageTracking } from "./hooks/useAnalytics";
import { useLocation } from "react-router-dom";

// Lazy-loaded pages
const PhakamaniIndex = lazy(() => import("./pages/PhakamaniIndex"));
const TransformationIndex = lazy(() => import("./pages/TransformationIndex"));
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Requirements = lazy(() => import("./pages/Requirements"));
const StartupGrants = lazy(() => import("./pages/StartupGrants"));
const About = lazy(() => import("./pages/About"));
const TestContacts = lazy(() => import("./pages/TestContacts"));
const PathToFunding = lazy(() => import("./pages/PathToFunding"));
const Resources = lazy(() => import("./pages/Resources"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PolicyChoicePage = lazy(() => import("./pages/why/PolicyChoicePage"));
const FundingProcessPage = lazy(() => import("./pages/path-to-funding/FundingProcessPage"));
const MarketSegmentsPage = lazy(() => import("./pages/path-to-funding/MarketSegmentsPage"));
const ProductsPage = lazy(() => import("./pages/path-to-funding/ProductsPage"));
const InvestorsPage = lazy(() => import("./pages/InvestorsPage"));
const GovernancePage = lazy(() => import("./pages/investors/GovernancePage"));
const TestHome = lazy(() => import("./pages/TestHome"));
const NewsMediaPage = lazy(() => import("./pages/NewsMediaPage"));
const NewsMediaDetailPage = lazy(() => import("./pages/NewsMediaDetailPage"));
const NewsMediaAdmin = lazy(() => import("./pages/admin/NewsMediaAdmin"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Uat2HtaPortalPage = lazy(() => import("./pages/Uat2HtaPortalPage"));
const TestingChecklist = lazy(() => import("./pages/TestingChecklist"));
const TestResults = lazy(() => import("./pages/TestResults"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const CareerDetailPage = lazy(() => import("./pages/CareerDetailPage"));
const CareersAdmin = lazy(() => import("./pages/admin/CareersAdmin"));
const PagesAdmin = lazy(() => import("./pages/admin/PagesAdmin"));
const PageEditor = lazy(() => import("./pages/admin/PageEditor"));
const NavigationAdmin = lazy(() => import("./pages/admin/NavigationAdmin"));
const DocumentsAdmin = lazy(() => import("./pages/admin/DocumentsAdmin"));
const AdminGuide = lazy(() => import("./pages/admin/AdminGuide"));
const PagePreview = lazy(() => import("./pages/admin/PagePreview"));
const CmsPage = lazy(() => import("./pages/CmsPage"));
import CmsOrCoded from "./components/cms/CmsOrCoded";

const queryClient = new QueryClient();

const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  usePageTracking();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsWrapper>
          <ScrollToTopOnNavigate />
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              {/* Home stays code-driven: it hosts interactive sections (news highlights, portal, ticker) */}
              <Route path="/" element={<TestHome />} />
              <Route path="/about/why" element={<TransformationIndex />} />
              <Route path="/about/why/policy-choice" element={<PolicyChoicePage />} />
              <Route path="/old" element={<Index />} />
              <Route path="/about" element={<CmsOrCoded slug="about" fallback={<About />} />} />
              <Route path="/contacts" element={<CmsOrCoded slug="contacts" fallback={<TestContacts />} />} />
              <Route path="/requirements" element={<Requirements />} />
              <Route path="/startup-grants" element={<StartupGrants />} />
              <Route path="/eligibility" element={<PathToFunding />} />
              <Route path="/eligibility/process" element={<FundingProcessPage />} />
              <Route path="/eligibility/market-segments" element={<MarketSegmentsPage />} />
              <Route path="/eligibility/products" element={<ProductsPage />} />
              <Route path="/investors" element={<InvestorsPage />} />
              <Route path="/investors/governance" element={<GovernancePage />} />
              <Route path="/faq" element={<CmsOrCoded slug="faq" fallback={<FAQ />} />} />
              <Route path="/resources" element={<CmsOrCoded slug="resources" fallback={<Resources />} />} />
              <Route path="/news-media" element={<NewsMediaPage />} />
              <Route path="/news-media/:id" element={<NewsMediaDetailPage />} />
              <Route path="/admin/news-media" element={<NewsMediaAdmin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/careers/:slug" element={<CareerDetailPage />} />
              <Route path="/admin/careers" element={<CareersAdmin />} />
              <Route path="/admin/pages" element={<PagesAdmin />} />
              <Route path="/admin/pages/:pageId" element={<PageEditor />} />
              <Route path="/admin/navigation" element={<NavigationAdmin />} />
              <Route path="/admin/documents" element={<DocumentsAdmin />} />
              <Route path="/admin/guide" element={<AdminGuide />} />
              <Route path="/admin/preview/:pageId" element={<PagePreview />} />
              <Route path="/uat2_hta_portal" element={<Uat2HtaPortalPage />} />
              <Route path="/testing" element={<TestingChecklist />} />
              <Route path="/test-results" element={<TestResults />} />

              <Route path="/:slug" element={<CmsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnalyticsWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
