import { useEffect } from "react";

const BASE_URL = "https://sa-transformationfund.co.za";
const SITE_NAME = "Transformation Fund";
const DEFAULT_IMAGE = "/images/logo-transformation-fund.jpg";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
}

function setMetaTag(property: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

export function useSEO({ title, description, path, image, type = "website" }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const fullUrl = `${BASE_URL}${path}`;
    const fullImage = image?.startsWith("http") ? image : `${BASE_URL}${image || DEFAULT_IMAGE}`;

    // Title
    const prevTitle = document.title;
    document.title = fullTitle;

    // Meta description
    setMetaTag("description", description);

    // Canonical
    setCanonical(fullUrl);

    // Open Graph
    setMetaTag("og:title", fullTitle, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:url", fullUrl, true);
    setMetaTag("og:image", fullImage, true);
    setMetaTag("og:type", type, true);
    setMetaTag("og:site_name", SITE_NAME, true);

    // Twitter
    setMetaTag("twitter:title", fullTitle, true);
    setMetaTag("twitter:description", description, true);
    setMetaTag("twitter:image", fullImage, true);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, path, image, type]);
}
