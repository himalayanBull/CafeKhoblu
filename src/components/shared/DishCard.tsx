'use client';

import { motion } from 'framer-motion';
import { Clock, Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Dish } from '@/types';
import { SpiceLevel } from './SpiceLevel';
import { AddToCartButton } from './Cart';

interface DishCardProps {
  dish: Dish;
  index?: number;
}

export function DishCard({ dish, index = 0 }: DishCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Link href={`/dish/${dish.id}`}>
        <div className="group relative bg-white rounded-3xl overflow-hidden ring-1 ring-stone-100 hover:ring-stone-200 hover:shadow-lg transition-all duration-300">
          <div className="relative aspect-[16/11] overflow-hidden">
            <img
              src={dish.image}
              alt={dish.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Top badges */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              <div className="flex gap-1.5">
                <span
                  className={`h-6 w-6 rounded-full flex items-center justify-center ring-2 ring-white/20 ${
                    dish.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
              </div>
              {dish.isBestseller && (
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-stone-800">
                  ★ Bestseller
                </span>
              )}
            </div>

            {/* Bottom overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-medium text-white leading-tight mb-1">
                    {dish.name}
                  </h3>
                  <div className="flex items-center gap-2.5 text-white/70">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-medium text-white">{dish.rating}</span>
                    </div>
                    <span className="h-3 w-px bg-white/20" />
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{dish.preparationTime}m</span>
                    </div>
                    <span className="h-3 w-px bg-white/20" />
                    <SpiceLevel level={dish.spiceLevel} />
                  </div>
                </div>
                <span className="shrink-0 text-xl font-bold text-white">
                  ₹{dish.price}
                </span>
              </div>
            </div>
          </div>

          {/* Card body */}
          <div className="px-5 py-4">
            <p className="text-[13px] text-stone-500 leading-relaxed line-clamp-2">
              {dish.description}
            </p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2">
                {dish.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[11px] font-medium text-stone-400 uppercase tracking-wider bg-stone-50 px-2 py-1 rounded-md">
                    {tag.replace('-', ' ')}
                  </span>
                ))}
              </div>
              <AddToCartButton dish={dish} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
