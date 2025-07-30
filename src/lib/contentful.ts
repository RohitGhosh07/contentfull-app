import { GraphQLClient } from 'graphql-request';
import { ContentfulResponse, LandingPage } from '@/types/contentful';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

const client = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
  {
    headers: {
      authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
    },
  }
);

const LANDING_PAGE_QUERY = `
  query GetLandingPage($slug: String!) {
    landingPageCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        title
        slug
        layoutConfiguration
        seoTitle
        seoDescription
        seoImage {
          url
          title
          description
        }
      }
    }
  }
`;

const ALL_LANDING_PAGES_QUERY = `
  query GetAllLandingPages {
    landingPageCollection {
      items {
        sys {
          id
        }
        title
        slug
        layoutConfiguration
        seoTitle
        seoDescription
        seoImage {
          url
          title
          description
        }
      }
    }
  }
`;

export async function getLandingPage(slug: string): Promise<LandingPage | null> {
  try {
    const response = await client.request<any>(LANDING_PAGE_QUERY, { slug });
    // Debug log the response structure
    console.log('Contentful landing page response:', JSON.stringify(response, null, 2));
    if (!response || !response.landingPageCollection || !response.landingPageCollection.items) {
      console.error('landingPageCollection or items missing in response:', response);
      return null;
    }
    return response.landingPageCollection.items[0] || null;
  } catch (error: any) {
    // Handle Contentful UNRESOLVABLE_LINK error gracefully
    const isUnresolvableLink = error?.response?.errors?.some((e: any) =>
      e.extensions?.contentful?.code === 'UNRESOLVABLE_LINK'
    );
    if (isUnresolvableLink && error.response?.landingPageCollection?.items) {
      console.warn('Contentful UNRESOLVABLE_LINK: returning partial data with seoImage as null');
      return error.response.landingPageCollection.items[0] || null;
    }
    console.error('Error fetching landing page:', error);
    return null;
  }
}

export async function getAllLandingPages(): Promise<LandingPage[]> {
  try {
    const response = await client.request<ContentfulResponse<{ landingPageCollection: { items: LandingPage[] } }>>(
      ALL_LANDING_PAGES_QUERY
    );
    
    return response.data.landingPageCollection.items;
  } catch (error) {
    console.error('Error fetching all landing pages:', error);
    return [];
  }
}

export function generateImageUrl(asset: { url: string }, options: { width?: number; height?: number; format?: string; quality?: number } = {}) {
  if (!asset?.url) return '';
  
  const params = new URLSearchParams();
  
  if (options.width) params.append('w', options.width.toString());
  if (options.height) params.append('h', options.height.toString());
  if (options.format) params.append('fm', options.format);
  if (options.quality) params.append('q', options.quality.toString());
  
  return `${asset.url}?${params.toString()}`;
}
