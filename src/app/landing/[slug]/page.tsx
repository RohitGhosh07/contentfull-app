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
  const resolvedParams = await params;
  const { slug } = resolvedParams;
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
      url: `${siteUrl}/landing/${slug}`,
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
      canonical: `${siteUrl}/landing/${slug}`,
    },
  };
}


export default async function Page({ params }: any) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const page = await getLandingPage(slug);
  if (!page) {
    notFound();
  }

  let layoutConfigRaw = page.layoutConfig || page.layoutConfiguration;
  let layoutConfig: { components: any[]; lastUpdated: string };
  // Ensure layoutConfig is always defined and has the expected shape
  if (!layoutConfigRaw) {
    layoutConfig = { components: [], lastUpdated: new Date().toISOString() };
  } else if (typeof layoutConfigRaw === 'object' && Array.isArray((layoutConfigRaw as any).components)) {
    layoutConfig = layoutConfigRaw as { components: any[]; lastUpdated: string };
  } else if (typeof layoutConfigRaw === 'string') {
    try {
      layoutConfig = JSON.parse(layoutConfigRaw);
    } catch {
      layoutConfig = { components: [], lastUpdated: new Date().toISOString() };
    }
  } else {
    layoutConfig = { components: [], lastUpdated: new Date().toISOString() };
  }
  if (!layoutConfig.lastUpdated) {
    layoutConfig.lastUpdated = new Date().toISOString();
  }
  // Ensure layoutConfig is always defined and has the expected shape
  if (!layoutConfig) {
    layoutConfig = { components: [], lastUpdated: new Date().toISOString() };
  } else if (typeof layoutConfig === 'object' && Array.isArray((layoutConfig as any).components)) {
    // do nothing
  } else if (typeof layoutConfig === 'string') {
    try {
      layoutConfig = JSON.parse(layoutConfig);
    } catch {
      layoutConfig = { components: [], lastUpdated: new Date().toISOString() };
    }
  } else {
    layoutConfig = { components: [], lastUpdated: new Date().toISOString() };
  }
  if (!layoutConfig.lastUpdated) {
    layoutConfig.lastUpdated = new Date().toISOString();
  }

  // Map Contentful API shape to internal block shape expected by components
  const normalizeBlock = (component: any): ComponentBlock => {
    if (component.type === 'hero') {
      return {
        id: component.id,
        type: 'hero',
        data: {
          heading: component.heading,
          subtitle: component.subheading,
          ctaText: component.cta?.label || '',
          ctaUrl: component.cta?.url || '',
          backgroundImage: {
            sys: { id: component.id + '-bg' },
            url: component.backgroundImage,
            title: component.heading,
          },
        },
      };
    } else if (component.type === 'twoColumn') {
      return {
        id: component.id,
        type: 'twoColumn',
        data: {
          heading: component.left?.heading || '',
          subtitle: component.left?.subheading || '',
          ctaText: component.left?.cta?.label || '',
          ctaUrl: component.left?.cta?.url || '',
          image: {
            sys: { id: component.id + '-img' },
            url: component.rightImage,
            title: component.left?.heading || '',
          },
        },
      };
    } else if (component.type === 'imageGrid') {
      return {
        id: component.id,
        type: 'imageGrid',
        data: {
          images: (component.images || []).map((url: string, idx: number) => ({
            sys: { id: component.id + '-img-' + idx },
            url,
            title: `Image ${idx + 1}`,
          })),
        },
      };
    }
    return component as ComponentBlock;
  };

  const renderComponent = (component: any) => {
    const block = normalizeBlock(component);
    switch (block.type) {
      case 'hero':
        return <HeroBlock key={block.id} block={block} />;
      case 'twoColumn':
        return <TwoColumnBlock key={block.id} block={block} />;
      case 'imageGrid':
        return <ImageGridBlock key={block.id} block={block} />;
      default:
        return null;
    }
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: `Landing page: ${page.title}`,
    url: `${siteUrl}/landing/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Landing Pages',
          item: `${siteUrl}/landing`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: page.title,
          item: `${siteUrl}/landing/${slug}`,
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
