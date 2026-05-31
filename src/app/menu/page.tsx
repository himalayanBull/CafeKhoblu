'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Star, Play } from 'lucide-react';
import Link from 'next/link';
import { restaurant } from '@/data/restaurant';
import { useAppStore } from '@/store';
import { SearchBar } from '@/components/shared/SearchBar';
import { FilterBar } from '@/components/shared/FilterBar';
import { CategoryNav } from '@/components/menu/CategoryNav';
import { DiscoverySections } from '@/components/menu/DiscoverySections';
import { DishCard } from '@/components/shared/DishCard';
import { AIAssistant } from '@/components/shared/AIAssistant';
import { OrderPanel } from '@/components/shared/Cart';

function MenuContent() {
  const searchParams = useSearchParams();
  const table = searchParams.get('table') || '1';
  const { getFilteredDishes, filters } = useAppStore();
  const filteredDishes = getFilteredDishes();

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-stone-900">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=300&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 to-stone-900/90" />
        </div>

        <div className="relative px-5 pt-10 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl overflow-hidden ring-2 ring-white/10">
                <img src={restaurant.logo} alt={restaurant.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white leading-tight">{restaurant.name}</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium text-white/80">{restaurant.rating}</span>
                  </div>
                  <span className="h-3 w-px bg-white/20" />
                  <div className="flex items-center gap-1 text-white/50">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs">{restaurant.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm ring-1 ring-white/10">
              <span className="text-xs font-semibold text-white/90">Table {table}</span>
            </div>
          </div>

          <SearchBar />
        </div>
      </motion.header>

      <CategoryNav />

      {filters.category === 'all' && !filters.searchQuery && (
        <>
          <DiscoverySections />

          {/* Reels CTA */}
          <div className="px-5 mb-8">
            <Link href="/reels">
              <div className="relative overflow-hidden rounded-2xl bg-stone-900 p-5 group">
                <div className="absolute inset-0 opacity-30">
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=200&fit=crop&q=80"
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-0.5">Watch Food Reels</h3>
                    <p className="text-white/50 text-xs">See our dishes being prepared in short videos</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/10 group-hover:bg-white/20 transition-colors">
                    <Play className="h-4 w-4 text-white ml-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </>
      )}

      <div className="px-5 py-4">
        <FilterBar />
      </div>

      {/* Dish grid */}
      <div className="px-5 pb-36">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
            {filters.category === 'all' ? 'Full Menu' : filters.category.replace('-', ' ')} — {filteredDishes.length} items
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredDishes.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>
        {filteredDishes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-400 text-sm">No dishes match your selection.</p>
            <button
              onClick={() => useAppStore.getState().resetFilters()}
              className="mt-3 text-sm font-medium text-stone-900 underline underline-offset-4 hover:no-underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <OrderPanel />
      <AIAssistant />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center"><span className="text-stone-400 text-sm">Loading...</span></div>}>
      <MenuContent />
    </Suspense>
  );
}
