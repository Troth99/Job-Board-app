import { Helmet } from "react-helmet-async";
import { useLingui } from "@lingui/react/macro";
import { SeoConfig } from "./seo";

type MetaDataProps = {
  seo: SeoConfig | (() => SeoConfig);
};

export default function MetaData({ seo }: MetaDataProps) {
  const { i18n } = useLingui();
  const effectiveSeo = typeof seo === "function" ? seo() : seo;

  return (
    <Helmet key={i18n.locale}>
      <title>{effectiveSeo.title}</title>
      <meta name="description" content={effectiveSeo.description} />

      <meta property="og:title" content={effectiveSeo.title} />
      <meta property="og:description" content={effectiveSeo.description} />
      {effectiveSeo.image && <meta property="og:image" content={effectiveSeo.image} />}
      {effectiveSeo.image && (
        <meta property="og:image:secure_url" content={effectiveSeo.image} />
      )}
      {effectiveSeo.image && <meta property="og:image:type" content="image/png" />}
      {effectiveSeo.image && <meta property="og:image:width" content="1200" />}
      {effectiveSeo.image && <meta property="og:image:height" content="630" />}
      {effectiveSeo.url && <meta property="og:url" content={effectiveSeo.url} />}
      {effectiveSeo.siteName && (
        <meta property="og:site_name" content={effectiveSeo.siteName} />
      )}
      {effectiveSeo.type && <meta property="og:type" content={effectiveSeo.type} />}

      {effectiveSeo.twitterCard && (
        <meta name="twitter:card" content={effectiveSeo.twitterCard} />
      )}
      <meta name="twitter:title" content={effectiveSeo.title} />
      <meta name="twitter:description" content={effectiveSeo.description} />
      {effectiveSeo.image && (
        <meta name="twitter:image" content={effectiveSeo.image} />
      )}

      {effectiveSeo.url && <link rel="canonical" href={effectiveSeo.url} />}
      {effectiveSeo.noindex && (
        <meta name="robots" content="noindex,nofollow" />
      )}
    </Helmet>
  );
}
