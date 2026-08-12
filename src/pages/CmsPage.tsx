import { useLocation, useParams } from "react-router-dom";
import { usePublishedPage } from "@/hooks/useCms";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import BlockRenderer from "@/components/cms/BlockRenderer";
import NotFound from "./NotFound";

const CmsPage = ({ slug: slugProp }: { slug?: string } = {}) => {
  const params = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  // Supports nested addresses too (e.g. "eligibility/products").
  const slug = slugProp ?? params.slug ?? pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  const { data, isLoading } = usePublishedPage(slug);

  useSEO({
    title: data?.page.seo_title || data?.page.title || "Transformation Fund",
    description: data?.page.seo_description || "",
    path: `/${slug ?? ""}`,
  });

  if (isLoading) {
    return <div className="min-h-screen bg-white" />;
  }

  if (!data) return <NotFound />;

  return (
    <div className="min-h-screen bg-white pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      <main>
        <h1 className="sr-only">{data.page.title}</h1>
        <BlockRenderer blocks={data.blocks} />
      </main>
      <Footer />
    </div>
  );
};

export default CmsPage;
