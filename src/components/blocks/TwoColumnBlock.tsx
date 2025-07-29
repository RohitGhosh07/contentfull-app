import Image from 'next/image';
import Link from 'next/link';
import { TwoColumnBlock as TwoColumnBlockType } from '@/types/contentful';
import { generateImageUrl } from '@/lib/contentful';
import styles from '@/styles/components/TwoColumnBlock.module.css';

interface Props {
  block: TwoColumnBlockType;
}

export default function TwoColumnBlock({ block }: Props) {
  const { heading, subtitle, ctaText, ctaUrl, image } = block.data;
  
  return (
    <section className={styles.twoColumn}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          
          {ctaText && ctaUrl && (
            <Link href={ctaUrl} className={styles.cta}>
              {ctaText}
            </Link>
          )}
        </div>
        
        <div className={styles.imageWrapper}>
          <Image
            src={generateImageUrl(image, { width: 600, height: 400, format: 'webp', quality: 80 })}
            alt={image.title || ''}
            width={600}
            height={400}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
