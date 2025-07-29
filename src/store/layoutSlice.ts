import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentState, LayoutState } from '@/types/redux';

const initialState: LayoutState = {
  components: [],
  isDirty: false,
  lastSaved: null,
  isAutoSaving: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<ComponentState>) => {
      state.components.push(action.payload);
      state.isDirty = true;
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter(c => c.id !== action.payload);
      state.isDirty = true;
    },
    reorderComponents: (state, action: PayloadAction<ComponentState[]>) => {
      state.components = action.payload;
      state.isDirty = true;
    },
    updateComponent: (state, action: PayloadAction<{ id: string; data: any }>) => {
      const component = state.components.find(c => c.id === action.payload.id);
      if (component) {
        component.data = { ...component.data, ...action.payload.data };
        state.isDirty = true;
      }
    },
    setAutoSaving: (state, action: PayloadAction<boolean>) => {
      state.isAutoSaving = action.payload;
    },
    markSaved: (state) => {
      state.isDirty = false;
      state.lastSaved = new Date().toISOString();
      state.isAutoSaving = false;
    },
    loadLayout: (state, action: PayloadAction<ComponentState[]>) => {
      state.components = action.payload;
      state.isDirty = false;
      state.lastSaved = new Date().toISOString();
    },
  },
});

export const {
  addComponent,
  removeComponent,
  reorderComponents,
  updateComponent,
  setAutoSaving,
  markSaved,
  loadLayout,
} = layoutSlice.actions;

export default layoutSlice.reducer;
</thinking>