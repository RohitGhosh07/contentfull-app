import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLandingPage, getAllLandingPages } from '@/lib/contentful';
import { ComponentBlock } from '@/types/contentful';
import GlobalNavigation from '@/components/layout/GlobalNavigation';
import HeroBlock from '@/components/blocks/HeroBlock';
import TwoColumnBlock from '@/components/blocks/TwoColumnBlock';
import ImageGridBlock from '@/components/blocks/ImageGridBlock';


export async function generateStaticParams() {
  return [
    { slug: 'page-1' },
    { slug: 'page-2' },
  ];
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = params;
  const page = await getLandingPage(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || `Landing page: ${page.title}`,
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDescription || `Landing page: ${page.title}`,
      url: `${siteUrl}/landing/${params.slug}`,
      siteName: 'Page Builder',
      images: page.seoImage
        ? [
            {
              url: page.seoImage.url,
              width: page.seoImage.width,
              height: page.seoImage.height,
              alt: page.seoImage.title || page.title,
            },
          ]
        : [],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seoTitle || page.title,
      description: page.seoDescription || `Landing page: ${page.title}`,
      images: page.seoImage ? [page.seoImage.url] : [],
    },
    alternates: {
      canonical: `${siteUrl}/landing/${params.slug}`,
    },
  };
}

export default async function Page({ params }: any) {
  const { slug } = params;
  const page = await getLandingPage(slug);
  if (!page) {
    notFound();
  }

  let layoutConfig = page.layoutConfig || page.layoutConfiguration;
  if (typeof layoutConfig === 'string') {
    try {
      layoutConfig = JSON.parse(layoutConfig);
    } catch {
      layoutConfig = { components: [], lastUpdated: new Date().toISOString() };
    }
  }
  if (!layoutConfig || typeof layoutConfig !== 'object') {
    layoutConfig = { components: [], lastUpdated: new Date().toISOString() };
  } else if (!layoutConfig.lastUpdated) {
    layoutConfig.lastUpdated = new Date().toISOString();
  }

  const renderComponent = (component: ComponentBlock) => {
    switch (component.type) {
      case 'hero':
        return <HeroBlock key={component.id} block={component} />;
      case 'twoColumn':
        return <TwoColumnBlock key={component.id} block={component} />;
      case 'imageGrid':
        return <ImageGridBlock key={component.id} block={component} />;
      default:
        return null;
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: `Landing page: ${page.title}`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/landing/${params.slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Landing Pages',
          item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/landing`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: page.title,
          item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/landing/${params.slug}`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GlobalNavigation />
      <main>
        {layoutConfig.components.map(renderComponent)}
      </main>
    </>
  );
}
