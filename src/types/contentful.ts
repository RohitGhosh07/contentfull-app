export interface ContentfulAsset {
  sys: {
    id: string;
  };
  url: string;
  title: string;
  description?: string;
  width?: number;
  height?: number;
}

export interface HeroBlock {
  id: string;
  type: 'hero';
  data: {
    heading: string;
    subtitle: string;
    ctaText: string;
    ctaUrl: string;
    backgroundImage: ContentfulAsset;
  };
}

export interface TwoColumnBlock {
  id: string;
  type: 'twoColumn';
  data: {
    heading: string;
    subtitle: string;
    ctaText: string;
    ctaUrl: string;
    image: ContentfulAsset;
  };
}

export interface ImageGridBlock {
  id: string;
  type: 'imageGrid';
  data: {
    images: ContentfulAsset[];
  };
}

export type ComponentBlock = HeroBlock | TwoColumnBlock | ImageGridBlock;

export interface LayoutConfig {
  components: ComponentBlock[];
  lastUpdated: string;
}

export interface LandingPage {
  sys: {
    id: string;
  };
  title: string;
  slug: string;
  layoutConfig: LayoutConfig;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: ContentfulAsset;
}

export interface ContentfulResponse<T> {
  data: T;
}
