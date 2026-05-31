'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useAppStore } from '@/store';
import { dishes } from '@/data/dishes';
import Link from 'next/link';

export function SearchBar() {
  const { setSearchQuery } = useAppStore();
  const [focused, setFocused] = useState(false);
  const [localQuery, setLocalQuery] = useState('');

  const suggestions = localQuery.length >= 2
    ? dishes.filter(
        (d) =>
          d.name.toLowerCase().includes(localQuery.toLowerCase()) ||
          d.ingredients.some((i) => i.name.toLowerCase().includes(localQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <div className="relative">
      <div className={`relative flex items-center rounded-xl transition-all duration-200 ${focused ? 'bg-white ring-2 ring-stone-900 shadow-lg' : 'bg-stone-100 ring-1 ring-stone-200'}`}>
        <Search className="absolute left-4 h-4 w-4 text-stone-400" />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => {
            setLocalQuery(e.target.value);
            setSearchQuery(e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search dishes, ingredients..."
          className="w-full pl-11 pr-10 py-3.5 text-sm rounded-xl focus:outline-none bg-transparent placeholder:text-stone-400"
        />
        {localQuery && (
          <button
            onClick={() => {
              setLocalQuery('');
              setSearchQuery('');
            }}
            className="absolute right-4 h-5 w-5 rounded-full bg-stone-200 flex items-center justify-center hover:bg-stone-300 transition-colors"
          >
            <X className="h-3 w-3 text-stone-600" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {focused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl ring-1 ring-stone-100 overflow-hidden z-50"
          >
            {suggestions.map((dish) => (
              <Link
                key={dish.id}
                href={`/dish/${dish.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 truncate">{dish.name}</p>
                  <p className="text-xs text-stone-500">{dish.category.replace('-', ' ')} · ₹{dish.price}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
