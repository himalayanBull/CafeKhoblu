'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store';

const filters = [
  { key: 'isVeg', label: 'Vegetarian', value: true },
  { key: 'isVeg', label: 'Non-Veg', value: false },
  { key: 'isVegan', label: 'Vegan', value: true },
  { key: 'isBestseller', label: 'Bestseller', value: true },
  { key: 'isHighProtein', label: 'High Protein', value: true },
  { key: 'isLowCalorie', label: 'Low Cal', value: true },
] as const;

export function FilterBar() {
  const store = useAppStore();

  const isActive = (key: string, value: boolean) => {
    const currentValue = store.filters[key as keyof typeof store.filters];
    return currentValue === value;
  };

  const handleToggle = (key: string, value: boolean) => {
    const currentValue = store.filters[key as keyof typeof store.filters];
    if (key === 'isVeg') {
      store.toggleFilter('isVeg', currentValue === value ? null : value);
    } else {
      store.toggleFilter(
        key as keyof Omit<typeof store.filters, 'category' | 'searchQuery' | 'spiceLevel'>,
        currentValue === value ? null : value
      );
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {filters.map((f) => {
        const active = isActive(f.key, f.value);
        return (
          <motion.button
            key={`${f.key}-${f.label}`}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleToggle(f.key, f.value)}
            className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ring-1 ${
              active
                ? 'bg-stone-900 text-white ring-stone-900'
                : 'bg-white text-stone-600 ring-stone-200 hover:ring-stone-300'
            }`}
          >
            {f.label}
          </motion.button>
        );
      })}
    </div>
  );
}
