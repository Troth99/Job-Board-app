import { Helmet } from "react-helmet-async";
import { SeoConfig } from "./seo";

type MetaDataProps = {
  seo: SeoConfig;
};

export default function MetaData({ seo }: MetaDataProps) {
  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      {seo.image && <meta property="og:image:secure_url" content={seo.image} />}
      {seo.image && <meta property="og:image:type" content="image/png" />}
      {seo.image && <meta property="og:image:width" content="1200" />}
      {seo.image && <meta property="og:image:height" content="630" />}
      {seo.url && <meta property="og:url" content={seo.url} />}
      {seo.siteName && <meta property="og:site_name" content={seo.siteName} />}
      {seo.type && <meta property="og:type" content={seo.type} />}

      {seo.twitterCard && <meta name="twitter:card" content={seo.twitterCard} />}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}

      {seo.url && <link rel="canonical" href={seo.url} />}
    </Helmet>
  );
}
