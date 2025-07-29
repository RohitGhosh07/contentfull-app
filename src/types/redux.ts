export interface ComponentState {
  id: string;
  type: 'hero' | 'twoColumn' | 'imageGrid';
  data: any;
  position: number;
}

export interface LayoutState {
  components: ComponentState[];
  isDirty: boolean;
  lastSaved: string | null;
  isAutoSaving: boolean;
}

export interface HistoryState {
  past: LayoutState[];
  present: LayoutState;
  future: LayoutState[];
}

export interface RootState {
  layout: HistoryState;
}
