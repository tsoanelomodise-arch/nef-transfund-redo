import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePageTracking } from "./hooks/useAnalytics";

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

const queryClient = new QueryClient();

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
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<TestHome />} />
              <Route path="/about/why" element={<TransformationIndex />} />
              <Route path="/about/why/policy-choice" element={<PolicyChoicePage />} />
              <Route path="/old" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<TestContacts />} />
              <Route path="/requirements" element={<Requirements />} />
              <Route path="/startup-grants" element={<StartupGrants />} />
              <Route path="/path-to-funding" element={<PathToFunding />} />
              <Route path="/path-to-funding/process" element={<FundingProcessPage />} />
              <Route path="/path-to-funding/market-segments" element={<MarketSegmentsPage />} />
              <Route path="/path-to-funding/products" element={<ProductsPage />} />
              <Route path="/investors" element={<InvestorsPage />} />
              <Route path="/investors/governance" element={<GovernancePage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/news-media" element={<NewsMediaPage />} />
              <Route path="/news-media/:id" element={<NewsMediaDetailPage />} />
              <Route path="/admin/news-media" element={<NewsMediaAdmin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnalyticsWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
