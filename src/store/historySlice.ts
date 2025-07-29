import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryState, LayoutState } from '@/types/redux';

const initialLayoutState: LayoutState = {
  components: [],
  isDirty: false,
  lastSaved: null,
  isAutoSaving: false,
};

const initialState: HistoryState = {
  past: [],
  present: initialLayoutState,
  future: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    pushToHistory: (state, action: PayloadAction<LayoutState>) => {
      state.past.push(state.present);
      state.present = action.payload;
      state.future = [];
      
      // Limit history to last 50 states
      if (state.past.length > 50) {
        state.past = state.past.slice(-50);
      }
    },
    undo: (state) => {
      if (state.past.length > 0) {
        const previous = state.past.pop()!;
        state.future.unshift(state.present);
        state.present = previous;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const next = state.future.shift()!;
        state.past.push(state.present);
        state.present = next;
      }
    },
    clearHistory: (state) => {
      state.past = [];
      state.future = [];
    },
  },
});

export const { pushToHistory, undo, redo, clearHistory } = historySlice.actions;
export default historySlice.reducer;
