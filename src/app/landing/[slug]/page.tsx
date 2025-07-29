import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLandingPage, getAllLandingPages } from '@/lib/contentful';
import { ComponentBlock } from '@/types/contentful';
import GlobalNavigation from '@/components/layout/GlobalNavigation';
import HeroBlock from '@/components/blocks/HeroBlock';
import TwoColumnBlock from '@/components/blocks/TwoColumnBlock';
import ImageGridBlock from '@/components/blocks/ImageGridBlock';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // For this demo, we'll return static params
  return [
    { slug: 'page-1' },
    { slug: 'page-2' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getLandingPage(params.slug);
  
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
      images: page.seoImage ? [
        {
          url: page.seoImage.url,
          width: page.seoImage.width,
          height: page.seoImage.height,
          alt: page.seoImage.title || page.title,
        }
      ] : [],
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

export default async function LandingPage({ params }: Props) {
  // For demo purposes, we'll create mock data since we don't have actual Contentful setup
  const mockPageData = {
    'page-1': {
      sys: { id: '1' },
      title: 'Landing Page 1',
      slug: 'page-1',
      layoutConfig: {
        components: [
          {
            id: 'hero-1',
            type: 'hero' as const,
            data: {
              heading: 'Welcome to Our Amazing Product',
              subtitle: 'Transform your business with our cutting-edge solution that delivers results you can measure.',
              ctaText: 'Get Started Today',
              ctaUrl: '#contact',
              backgroundImage: {
                sys: { id: 'hero-bg-1' },
                url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080',
                title: 'Hero Background',
                width: 1920,
                height: 1080,
              },
            },
          },
          {
            id: 'two-col-1',
            type: 'twoColumn' as const,
            data: {
              heading: 'Why Choose Our Solution',
              subtitle: 'We provide enterprise-grade tools with the simplicity your team needs to succeed. Our platform scales with your business and delivers measurable results.',
              ctaText: 'Learn More',
              ctaUrl: '#features',
              image: {
                sys: { id: 'feature-img-1' },
                url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400',
                title: 'Feature Image',
                width: 600,
                height: 400,
              },
            },
          },
          {
            id: 'grid-1',
            type: 'imageGrid' as const,
            data: {
              images: [
                {
                  sys: { id: 'grid-1-1' },
                  url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300',
                  title: 'Gallery Image 1',
                  width: 400,
                  height: 300,
                },
                {
                  sys: { id: 'grid-1-2' },
                  url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300',
                  title: 'Gallery Image 2',
                  width: 400,
                  height: 300,
                },
                {
                  sys: { id: 'grid-1-3' },
                  url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300',
                  title: 'Gallery Image 3',
                  width: 400,
                  height: 300,
                },
                {
                  sys: { id: 'grid-1-4' },
                  url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300',
                  title: 'Gallery Image 4',
                  width: 400,
                  height: 300,
                },
              ],
            },
          },
        ],
        lastUpdated: new Date().toISOString(),
      },
    },
    'page-2': {
      sys: { id: '2' },
      title: 'Landing Page 2',
      slug: 'page-2',
      layoutConfig: {
        components: [
          {
            id: 'two-col-2',
            type: 'twoColumn' as const,
            data: {
              heading: 'Start Your Journey Today',
              subtitle: 'Join thousands of satisfied customers who have transformed their business with our innovative platform.',
              ctaText: 'Start Free Trial',
              ctaUrl: '#signup',
              image: {
                sys: { id: 'feature-img-2' },
                url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400',
                title: 'Start Journey Image',
                width: 600,
                height: 400,
              },
            },
          },
          {
            id: 'hero-2',
            type: 'hero' as const,
            data: {
              heading: 'Experience the Difference',
              subtitle: 'Our platform delivers exceptional performance and reliability that your business can depend on.',
              ctaText: 'Discover More',
              ctaUrl: '#discover',
              backgroundImage: {
                sys: { id: 'hero-bg-2' },
                url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080',
                title: 'Experience Background',
                width: 1920,
                height: 1080,
              },
            },
          },
        ],
        lastUpdated: new Date().toISOString(),
      },
    },
  };

  const page = mockPageData[params.slug as keyof typeof mockPageData];
  
  if (!page) {
    notFound();
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
        {page.layoutConfig.components.map(renderComponent)}
      </main>
    </>
  );
}
