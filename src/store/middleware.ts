import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '@/types/redux';
import { setAutoSaving, markSaved } from './layoutSlice';

let autoSaveTimeout: NodeJS.Timeout | null = null;

export const autoSaveMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);
  
  // Only auto-save for layout actions that make changes
  if (action.type.startsWith('layout/') && action.type !== 'layout/setAutoSaving' && action.type !== 'layout/markSaved') {
    const state = store.getState();
    
    if (state.layout.present.isDirty) {
      // Clear existing timeout
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
      
      // Set auto-saving state
      store.dispatch(setAutoSaving(true));
      
      // Auto-save after 2 seconds of inactivity
      autoSaveTimeout = setTimeout(async () => {
        try {
          const currentState = store.getState();
          const layoutData = {
            components: currentState.layout.present.components,
            lastUpdated: new Date().toISOString(),
          };
          
          // Save to Contentful (implementation depends on your setup)
          await saveToContentful(layoutData);
          
          store.dispatch(markSaved());
        } catch (error) {
          console.error('Auto-save failed:', error);
          store.dispatch(setAutoSaving(false));
        }
      }, 2000);
    }
  }
  
  return result;
};

async function saveToContentful(layoutData: any) {
  // This will be implemented based on your Contentful setup
  // For now, we'll just simulate a save operation
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}
