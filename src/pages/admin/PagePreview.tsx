import { useParams, Link } from "react-router-dom";
import { useAdminPage } from "@/hooks/useCms";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import BlockRenderer from "@/components/cms/BlockRenderer";

const PagePreview = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const { data, isLoading } = useAdminPage(pageId);

  if (isLoading || !data) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white pt-[180px] lg:pt-[210px]">
      <div className="fixed bottom-4 right-4 z-[60] bg-black text-white text-sm px-4 py-2 rounded-md shadow-lg flex items-center gap-3">
        Draft preview — not live
        <Link to={`/admin/pages/${pageId}`} className="underline">Back to editor</Link>
      </div>
      <PhakamaniNavbar />
      <main>
        <BlockRenderer blocks={data.blocks} />
      </main>
      <Footer />
    </div>
  );
};

export default PagePreview;
