import { Suspense, type ReactElement } from "react";
import { usePublishedPage } from "@/hooks/useCms";
import CmsPage from "@/pages/CmsPage";

/**
 * Renders the CMS version of a page when a published page exists for `slug`,
 * otherwise falls back to the existing coded page. Lets the client take over a
 * page from the admin area without any risk of the route breaking.
 */
const CmsOrCoded = ({ slug, fallback }: { slug: string; fallback: ReactElement }) => {
  const { data, isLoading } = usePublishedPage(slug);

  if (isLoading) return <div className="min-h-screen bg-white" />;
  if (!data || !data.blocks.length) return <Suspense fallback={<div className="min-h-screen" />}>{fallback}</Suspense>;

  return <CmsPage slug={slug} />;
};

export default CmsOrCoded;