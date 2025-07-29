'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import DragDropBuilder from '@/components/contentful-app/DragDropBuilder';
import styles from '@/styles/pages/ContentfulApp.module.css';

export default function ContentfulAppPage() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div className={styles.loading}>Loading...</div>} persistor={persistor}>
        <div className={styles.app}>
          <header className={styles.header}>
            <h1>Page Builder</h1>
            <p>Drag and drop components to build your landing page</p>
          </header>
          <main className={styles.main}>
            <DragDropBuilder />
          </main>
        </div>
      </PersistGate>
    </Provider>
  );
}
</thinking>