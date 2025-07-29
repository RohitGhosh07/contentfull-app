import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Page Builder - Dynamic Landing Pages',
    template: '%s | Page Builder',
  },
  description: 'Build beautiful landing pages with our drag-and-drop page builder powered by Contentful and Next.js.',
  keywords: ['page builder', 'landing pages', 'contentful', 'nextjs', 'drag and drop'],
  authors: [{ name: 'Page Builder Team' }],
  creator: 'Page Builder',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Page Builder - Dynamic Landing Pages',
    description: 'Build beautiful landing pages with our drag-and-drop page builder.',
    siteName: 'Page Builder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Builder - Dynamic Landing Pages',
    description: 'Build beautiful landing pages with our drag-and-drop page builder.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
</thinking>