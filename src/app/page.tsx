import Link from 'next/link';
import GlobalNavigation from '@/components/layout/GlobalNavigation';
import styles from '@/styles/pages/Home.module.css';

export default function HomePage() {
  return (
    <>
      <GlobalNavigation />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Page Builder Demo</h1>
          <p className={styles.subtitle}>
            Explore our dynamic page builder and landing pages
          </p>
          
          <div className={styles.grid}>
            <Link href="/contentful-app" className={styles.card}>
              <h3>🛠️ Page Builder</h3>
              <p>Drag and drop components to build your landing page</p>
            </Link>
            
            <Link href="/landing/page-1" className={styles.card}>
              <h3>📄 Landing Page 1</h3>
              <p>Example landing page with hero, two-column, and image grid</p>
            </Link>
            
            <Link href="/landing/page-2" className={styles.card}>
              <h3>📄 Landing Page 2</h3>
              <p>Another example with different component arrangements</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}