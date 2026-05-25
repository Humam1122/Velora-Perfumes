import { useEffect } from "react";

interface SeoConfig {
  title: string;
  description: string;
  image?: string;
}

function setMeta(selector: string, attribute: "content", value: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

export function useSeo({ title, description, image = "/images/velora-hero.jpg" }: SeoConfig) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", image);
  }, [description, image, title]);
}
