import Image from 'next/image';
import { ImageGridBlock as ImageGridBlockType } from '@/types/contentful';
import { generateImageUrl } from '@/lib/contentful';
import styles from '@/styles/components/ImageGridBlock.module.css';

interface Props {
  block: ImageGridBlockType;
}

export default function ImageGridBlock({ block }: Props) {
  const { images } = block.data;
  
  // Ensure we have exactly 4 images for the 2x2 grid
  const gridImages = images.slice(0, 4);
  
  return (
    <section className={styles.imageGrid}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {gridImages.map((image, index) => (
            <div key={image.sys.id} className={styles.gridItem}>
              <Image
                src={generateImageUrl(image, { width: 400, height: 300, format: 'webp', quality: 80 })}
                alt={image.title || `Image ${index + 1}`}
                width={400}
                height={300}
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
</thinking>