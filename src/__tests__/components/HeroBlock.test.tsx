import { render, screen } from '@testing-library/react'
import HeroBlock from '@/components/blocks/HeroBlock'
import { HeroBlock as HeroBlockType } from '@/types/contentful'

const mockHeroBlock: HeroBlockType = {
  id: 'test-hero',
  type: 'hero',
  data: {
    heading: 'Test Hero Heading',
    subtitle: 'Test hero subtitle',
    ctaText: 'Test CTA',
    ctaUrl: '/test',
    backgroundImage: {
      sys: { id: 'test-image' },
      url: 'https://example.com/test-image.jpg',
      title: 'Test Image',
      width: 1920,
      height: 1080,
    },
  },
}

describe('HeroBlock', () => {
  it('renders hero content correctly', () => {
    render(<HeroBlock block={mockHeroBlock} />)
    
    expect(screen.getByText('Test Hero Heading')).toBeInTheDocument()
    expect(screen.getByText('Test hero subtitle')).toBeInTheDocument()
    expect(screen.getByText('Test CTA')).toBeInTheDocument()
  })

  it('renders CTA link with correct href', () => {
    render(<HeroBlock block={mockHeroBlock} />)
    
    const ctaLink = screen.getByRole('link', { name: 'Test CTA' })
    expect(ctaLink).toHaveAttribute('href', '/test')
  })

  it('renders background image', () => {
    render(<HeroBlock block={mockHeroBlock} />)
    
    const image = screen.getByAltText('Test Image')
    expect(image).toBeInTheDocument()
  })
})
</thinking>