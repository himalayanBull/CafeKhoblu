'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store';
import { DishCategory } from '@/types';

const categories: { key: DishCategory | 'all'; label: string; emoji: string }[] = [
  { key: 'all', label: 'All', emoji: '🍽' },
  { key: 'starters', label: 'Starters', emoji: '🥗' },
  { key: 'main-course', label: 'Mains', emoji: '🍛' },
  { key: 'desserts', label: 'Desserts', emoji: '🍮' },
  { key: 'drinks', label: 'Drinks', emoji: '🥤' },
];

export function CategoryNav() {
  const { filters, setCategory } = useAppStore();

  return (
    <div className="sticky top-0 z-30 glass border-b border-stone-200/60 py-3">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className="relative shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            {filters.category === cat.key && (
              <motion.div
                layoutId="category-active"
                className="absolute inset-0 bg-stone-900 rounded-xl"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-1.5 ${
                filters.category === cat.key ? 'text-white' : 'text-stone-600'
              }`}
            >
              <span className="text-xs">{cat.emoji}</span>
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
