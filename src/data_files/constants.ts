import ogImageSrc from "@images/social.png";

export const SITE = {
  title: "CodeZen",
  tagline: "Generate. Automate. Accelerate.",
  description: "Accelerate your projects with CodeZen's top-quality software tools and expert automation services. CodeZen offers simplicity, affordability, and reliability. Experience the difference with user-centric design and cutting-edge tools. Start exploring now!",
  description_short: "Accelerate your projects with CodeZen's top-quality software tools and expert automation services.",
  url: "https://nep.work",
  author: "Risav Karna",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: : Software Code Generators & Automation Services`,
  description: SITE.description,
  image: ogImageSrc,
};
