import { create } from 'zustand';
import { Property } from '@/types';

interface ComparisonState {
  items: Property[];
  addItem: (property: Property) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}

export const useComparisonStore = create<ComparisonState>((set) => ({
  items: [],
  addItem: (property) => set((state) => {
    if (state.items.length >= 3) return state; // Limit to 3
    if (state.items.find(item => item.id === property.id)) return state;
    return { items: [...state.items, property] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  clearItems: () => set({ items: [] }),
}));
