import Image from 'next/image';
import Link from 'next/link';
import { HeroBlock as HeroBlockType } from '@/types/contentful';
import { generateImageUrl } from '@/lib/contentful';
import styles from '@/styles/components/HeroBlock.module.css';

interface Props {
  block: HeroBlockType;
}

export default function HeroBlock({ block }: Props) {
  const { heading, subtitle, ctaText, ctaUrl, backgroundImage } = block.data;
  
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundImage}>
        <Image
          src={generateImageUrl(backgroundImage, { width: 1920, height: 1080, format: 'webp', quality: 80 })}
          alt={backgroundImage.title || ''}
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          
          {ctaText && ctaUrl && (
            <Link href={ctaUrl} className={styles.cta}>
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
