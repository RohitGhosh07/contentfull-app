import { ComponentState } from '@/types/redux';
import styles from '@/styles/components/ComponentPreview.module.css';

interface Props {
  component: ComponentState;
}

export default function ComponentPreview({ component }: Props) {
  const renderPreview = () => {
    switch (component.type) {
      case 'hero':
        return (
          <div className={styles.heroPreview}>
            <div className={styles.heroContent}>
              <h3>{component.data.heading}</h3>
              <p>{component.data.subtitle}</p>
              <button className={styles.ctaButton}>{component.data.ctaText}</button>
            </div>
            <div className={styles.heroImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={component.data.backgroundImage.url} alt="Hero background" />
            </div>
          </div>
        );
      
      case 'twoColumn':
        return (
          <div className={styles.twoColumnPreview}>
            <div className={styles.twoColumnContent}>
              <h3>{component.data.heading}</h3>
              <p>{component.data.subtitle}</p>
              <button className={styles.ctaButton}>{component.data.ctaText}</button>
            </div>
            <div className={styles.twoColumnImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={component.data.image.url} alt="Two column image" />
            </div>
          </div>
        );
      
      case 'imageGrid':
        return (
          <div className={styles.imageGridPreview}>
            <div className={styles.gridContainer}>
              {component.data.images.slice(0, 4).map((image: any, index: number) => (
                <div key={index} className={styles.gridItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.url} alt={`Grid image ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return <div className={styles.unknownPreview}>Unknown component type</div>;
    }
  };

  return (
    <div className={styles.preview}>
      <div className={styles.previewHeader}>
        <span className={styles.componentType}>
          {component.type === 'hero' && '🎯 Hero Block'}
          {component.type === 'twoColumn' && '📰 Two Column'}
          {component.type === 'imageGrid' && '🖼️ Image Grid'}
        </span>
      </div>
      <div className={styles.previewContent}>
        {renderPreview()}
      </div>
    </div>
  );
}
</thinking>