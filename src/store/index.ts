import { create } from 'zustand';
import { Dish, DishCategory } from '@/types';
import { dishes } from '@/data/dishes';

interface FilterState {
  category: DishCategory | 'all';
  isVeg: boolean | null;
  isVegan: boolean | null;
  spiceLevel: number | null;
  isBestseller: boolean | null;
  isHighProtein: boolean | null;
  isLowCalorie: boolean | null;
  searchQuery: string;
}

interface AppState {
  filters: FilterState;
  setCategory: (category: DishCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  toggleFilter: (key: keyof Omit<FilterState, 'category' | 'searchQuery' | 'spiceLevel'>, value: boolean | null) => void;
  setSpiceLevel: (level: number | null) => void;
  resetFilters: () => void;
  getFilteredDishes: () => Dish[];
  aiChatOpen: boolean;
  setAiChatOpen: (open: boolean) => void;
}

const defaultFilters: FilterState = {
  category: 'all',
  isVeg: null,
  isVegan: null,
  spiceLevel: null,
  isBestseller: null,
  isHighProtein: null,
  isLowCalorie: null,
  searchQuery: '',
};

export const useAppStore = create<AppState>((set, get) => ({
  filters: defaultFilters,
  aiChatOpen: false,

  setCategory: (category) =>
    set((state) => ({ filters: { ...state.filters, category } })),

  setSearchQuery: (searchQuery) =>
    set((state) => ({ filters: { ...state.filters, searchQuery } })),

  toggleFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  setSpiceLevel: (spiceLevel) =>
    set((state) => ({ filters: { ...state.filters, spiceLevel } })),

  resetFilters: () => set({ filters: defaultFilters }),

  setAiChatOpen: (aiChatOpen) => set({ aiChatOpen }),

  getFilteredDishes: () => {
    const { filters } = get();
    let filtered = [...dishes];

    if (filters.category !== 'all') {
      filtered = filtered.filter((d) => d.category === filters.category);
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.ingredients.some((i) => i.name.toLowerCase().includes(q)) ||
          d.tags.some((t) => t.toLowerCase().includes(q)) ||
          d.category.toLowerCase().includes(q)
      );
    }

    if (filters.isVeg === true) {
      filtered = filtered.filter((d) => d.isVeg);
    } else if (filters.isVeg === false) {
      filtered = filtered.filter((d) => !d.isVeg);
    }

    if (filters.isVegan) {
      filtered = filtered.filter((d) => d.isVegan);
    }

    if (filters.spiceLevel) {
      filtered = filtered.filter((d) => d.spiceLevel <= filters.spiceLevel!);
    }

    if (filters.isBestseller) {
      filtered = filtered.filter((d) => d.isBestseller);
    }

    if (filters.isHighProtein) {
      filtered = filtered.filter((d) => d.nutrition.protein >= 20);
    }

    if (filters.isLowCalorie) {
      filtered = filtered.filter((d) => d.nutrition.calories <= 300);
    }

    return filtered;
  },
}));
