# Contentful Page Builder

A full-stack application that enables editors to visually arrange components for landing pages using a drag-and-drop interface. Built with Next.js, TypeScript, Redux, and designed for integration with Contentful CMS.

## 🚀 Features

### Contentful App (Page Builder)
- **Drag & Drop Interface**: Visual component arrangement with beautiful animations
- **Component Library**: Hero blocks, two-column layouts, and 2x2 image grids
- **State Management**: Redux with undo/redo functionality and auto-save
- **Persistence**: Redux Persist maintains layout after browser refresh
- **Real-time Preview**: See components as you build

### Next.js Frontend
- **Static Site Generation (SSG)**: Fast, SEO-optimized pages
- **App Router**: Modern Next.js 15.3+ routing
- **Dynamic Metadata**: SEO-friendly meta tags and JSON-LD structured data
- **Image Optimization**: Next.js `next/image` with Contentful integration
- **Performance**: Lighthouse score ≥90 for Performance, SEO, and Accessibility

### Technical Stack
- **Framework**: Next.js 15.3+ (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit + Redux Persist
- **Styling**: CSS Modules (responsive design)
- **CMS Integration**: Contentful (GraphQL API ready)
- **Drag & Drop**: React Beautiful DnD
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd contentful-page-builder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Contentful credentials:
   ```env
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
   CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
   NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
   NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   - Homepage: http://localhost:3000
   - Page Builder: http://localhost:3000/contentful-app
   - Landing Pages: http://localhost:3000/landing/page-1

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── contentful-app/    # Page builder interface
│   ├── landing/[slug]/    # Dynamic landing pages
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── blocks/           # Landing page components
│   ├── contentful-app/   # Page builder components
│   └── layout/           # Layout components
├── lib/                  # Utilities and API functions
├── store/                # Redux store configuration
├── styles/               # CSS Modules
└── types/                # TypeScript type definitions
```

## 🎨 Components

### Available Blocks

1. **Hero Block**
   - Large banner with heading, subtitle, CTA button
   - Full-width background image support
   - Responsive design with overlay

2. **Two Column Block**
   - Left: Content (heading, subtitle, CTA)
   - Right: Image
   - Flexible layout that stacks on mobile

3. **2x2 Image Grid**
   - Four images in a responsive grid
   - Hover effects and animations
   - Optimized image loading

### Page Builder Features

- **Component Palette**: Drag components from sidebar
- **Visual Editor**: Real-time preview of components
- **Undo/Redo**: Full history management
- **Auto-save**: Automatic persistence of changes
- **Responsive Preview**: See how components look on different devices

## 🔧 Contentful Setup

### Content Model Structure

Create the following content types in your Contentful space:

#### Landing Page
```json
{
  "name": "Landing Page",
  "apiId": "landingPage",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": "Text"
    },
    {
      "id": "slug",
      "name": "Slug",
      "type": "Text"
    },
    {
      "id": "layoutConfig",
      "name": "Layout Configuration",
      "type": "Object"
    },
    {
      "id": "seoTitle",
      "name": "SEO Title",
      "type": "Text"
    },
    {
      "id": "seoDescription",
      "name": "SEO Description",
      "type": "Text"
    },
    {
      "id": "seoImage",
      "name": "SEO Image",
      "type": "Link",
      "linkType": "Asset"
    }
  ]
}
```

### GraphQL Queries

The application uses GraphQL to fetch content from Contentful. Key queries include:

- `getLandingPage(slug)`: Fetch a specific landing page
- `getAllLandingPages()`: Get all landing pages for static generation

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Build Commands
- **Build**: `npm run build`
- **Start**: `npm start`
- **Development**: `npm run dev`

## 🧪 Testing

Run the test suite:
```bash
npm test
npm run test:watch  # Watch mode
```

## 📊 Performance

The application is optimized for:
- **Core Web Vitals**: Fast loading and interaction
- **SEO**: Structured data, meta tags, sitemaps
- **Accessibility**: WCAG compliance
- **Image Optimization**: WebP format, responsive sizes
- **Bundle Size**: Code splitting and tree shaking

## 🔒 Security

- Environment variables for sensitive data
- Content Security Policy headers
- Sanitized user inputs
- Secure API endpoints

## 📈 Monitoring

- **Lighthouse**: Automated performance auditing
- **Core Web Vitals**: Real user monitoring
- **Error Tracking**: Production error monitoring
- **Analytics**: User behavior tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the example implementations

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Maintainer**: Page Builder Team
</thinking>