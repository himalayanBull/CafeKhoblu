'use client';

import { motion } from 'framer-motion';
import { ChefHat, Flame, MapPin, TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';
import { dishes } from '@/data/dishes';

function SectionHeader({ title, icon: Icon, count }: { title: string; icon: React.ElementType; count: number }) {
  return (
    <div className="flex items-center justify-between mb-4 px-5">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-stone-900 flex items-center justify-center">
          <Icon className="h-4 w-4 text-amber-400" />
        </div>
        <h2 className="text-[15px] font-semibold text-stone-900">{title}</h2>
      </div>
      <span className="text-xs text-stone-400">{count} dishes</span>
    </div>
  );
}

function HorizontalCard({ dish, index, basePath }: { dish: typeof dishes[0]; index: number; basePath: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="shrink-0"
    >
      <Link href={`${basePath}/dish/${dish.id}`}>
        <div className="w-52 sm:w-64 rounded-2xl overflow-hidden bg-white ring-1 ring-stone-100 hover:ring-stone-200 hover:shadow-md transition-all duration-200 group">
          <div className="relative h-36 sm:h-40 overflow-hidden">
            <img
              src={dish.image}
              alt={dish.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="absolute top-3 left-3">
              <span className={`h-5 w-5 rounded-full flex items-center justify-center ${dish.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-semibold text-white">{dish.rating}</span>
              </div>
              <span className="text-sm font-bold text-white">₹{dish.price}</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm text-stone-900 mb-0.5">{dish.name}</h3>
            <p className="text-xs text-stone-400 line-clamp-1">{dish.description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function HorizontalScroll({ title, icon: Icon, items, basePath }: { title: string; icon: React.ElementType; items: typeof dishes; basePath: string }) {
  return (
    <div className="mb-10">
      <SectionHeader title={title} icon={Icon} count={items.length} />
      <div className="flex gap-3.5 overflow-x-auto scrollbar-hide px-5 pb-2">
        {items.map((dish, i) => (
          <HorizontalCard key={dish.id} dish={dish} index={i} basePath={basePath} />
        ))}
      </div>
    </div>
  );
}

export function DiscoverySections({ basePath }: { basePath: string }) {
  const chefRecommends = dishes.filter((d) => d.isChefRecommended);
  const mostOrdered = [...dishes].sort((a, b) => b.ordersToday - a.ordersToday).slice(0, 6);
  const localSpecialties = dishes.filter((d) => d.isLocalSpecialty);
  const trending = dishes.filter((d) => d.isTrending);

  return (
    <div className="pt-8">
      <HorizontalScroll title="Chef Recommends" icon={ChefHat} items={chefRecommends} basePath={basePath} />
      <HorizontalScroll title="Most Ordered Today" icon={Flame} items={mostOrdered} basePath={basePath} />
      <HorizontalScroll title="Himachali Specialties" icon={MapPin} items={localSpecialties} basePath={basePath} />
      <HorizontalScroll title="Trending This Week" icon={TrendingUp} items={trending} basePath={basePath} />
    </div>
  );
}
