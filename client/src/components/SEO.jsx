import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, url }) {
  const siteName = 'S2Y Global';
  const fullTitle = title || `${siteName} | Creating Businesses Through Innovation`;
  const defaultDescription = 'S2Y Global is a technology holding company building integrated infrastructure platforms across food systems and digital ecosystems.';
  const defaultKeywords = 'S2Y Global, Technology, Infrastructure, Food Systems, Digital Infrastructure, Social Platform';
  const defaultUrl = 'https://s2yglobal.com';
  const ogImage = `${defaultUrl}/og-image.png`;

  const currentUrl = url || defaultUrl;

  const schemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: defaultUrl,
    logo: `${defaultUrl}/vite.svg`,
    sameAs: [],
    description: defaultDescription,
  };

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={currentUrl} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
