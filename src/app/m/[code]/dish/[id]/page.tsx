'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Star, Users, Flame, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { dishes } from '@/data/dishes';
import { getMenuCode } from '@/data/menu-codes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoPlayer } from '@/components/shared/VideoPlayer';
import { SpiceLevel } from '@/components/shared/SpiceLevel';
import { useCartStore } from '@/store/cart';

function DishAddToCart({ dishId }: { dishId: string }) {
  const { items, addItem, updateQuantity } = useCartStore();
  const dish = dishes.find((d) => d.id === dishId)!;
  const cartItem = items.find((item) => item.dish.id === dishId);

  if (cartItem) {
    return (
      <div className="flex items-center justify-between bg-stone-50 rounded-2xl p-2 ring-1 ring-stone-100">
        <div className="flex items-center gap-1">
          <button
            onClick={() => updateQuantity(dishId, cartItem.quantity - 1)}
            className="h-10 w-10 rounded-xl bg-white ring-1 ring-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors"
          >
            <Minus className="h-4 w-4 text-stone-700" />
          </button>
          <span className="w-10 text-center text-lg font-bold text-stone-900">{cartItem.quantity}</span>
          <button
            onClick={() => updateQuantity(dishId, cartItem.quantity + 1)}
            className="h-10 w-10 rounded-xl bg-white ring-1 ring-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors"
          >
            <Plus className="h-4 w-4 text-stone-700" />
          </button>
        </div>
        <span className="text-sm font-bold text-stone-900 pr-2">₹{dish.price * cartItem.quantity} added</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => addItem(dish)}
      className="w-full py-4 rounded-2xl bg-stone-900 text-white font-semibold text-sm hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
    >
      <ShoppingBag className="h-4 w-4" />
      Add to Order — ₹{dish.price}
    </button>
  );
}

export default function DishPage({ params }: { params: Promise<{ code: string; id: string }> }) {
  const { code, id } = use(params);
  const menuCode = getMenuCode(code);

  if (!menuCode) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Menu not found</h1>
          <p className="text-stone-500 text-sm">This QR code is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    notFound();
  }

  const pairingDishes = dishes.filter((d) => dish.pairings.includes(d.id));

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="relative">
        <div className="h-64 sm:h-80 md:h-[420px] relative overflow-hidden">
          <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        </div>

        <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between">
          <Link
            href={`/m/${code}`}
            className="h-10 w-10 rounded-xl glass-dark flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
          <div className="flex gap-2">
            {dish.isBestseller && (
              <span className="px-3 py-1.5 rounded-lg bg-amber-500/90 backdrop-blur-sm text-xs font-semibold text-white">
                Popular
              </span>
            )}
            <span className={`px-3 py-1.5 rounded-lg backdrop-blur-sm text-xs font-semibold text-white ${dish.isVeg ? 'bg-emerald-500/90' : 'bg-rose-500/90'}`}>
              {dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-6"
        >
          <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-2">{dish.name}</h1>
          <p className="text-white/70 text-sm max-w-md leading-relaxed">{dish.description}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 -mt-5 relative z-10"
      >
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-stone-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-5">
            <span className="text-3xl font-bold text-stone-900">₹{dish.price}</span>
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-stone-900">{dish.rating}</span>
              <span className="text-xs text-stone-400">({dish.totalReviews})</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-stone-500 mb-5">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{dish.preparationTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{dish.ordersToday} today</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              <SpiceLevel level={dish.spiceLevel} />
            </div>
          </div>

          <DishAddToCart dishId={dish.id} />
        </div>
      </motion.div>

      <div className="px-5 pb-12">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full flex overflow-x-auto scrollbar-hide bg-stone-100 rounded-xl p-1 h-auto gap-0.5">
            <TabsTrigger value="about" className="shrink-0 text-xs py-3 px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:font-semibold">Story</TabsTrigger>
            <TabsTrigger value="video" className="shrink-0 text-xs py-3 px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:font-semibold">Video</TabsTrigger>
            <TabsTrigger value="ingredients" className="shrink-0 text-xs py-3 px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:font-semibold">Ingredients</TabsTrigger>
            <TabsTrigger value="nutrition" className="shrink-0 text-xs py-3 px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:font-semibold">Nutrition</TabsTrigger>
            <TabsTrigger value="pairings" className="shrink-0 text-xs py-3 px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:font-semibold">Pairs</TabsTrigger>
            <TabsTrigger value="reviews" className="shrink-0 text-xs py-3 px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:font-semibold">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6 space-y-4">
            <div className="bg-white rounded-2xl p-6 ring-1 ring-stone-100">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-medium text-stone-900 mb-3">The Story</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{dish.longStory}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 ring-1 ring-stone-100">
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Origin</p>
                <p className="text-sm text-stone-700 leading-relaxed">{dish.culturalOrigin}</p>
              </div>
              <div className="bg-white rounded-2xl p-5 ring-1 ring-stone-100">
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Region</p>
                <p className="text-sm text-stone-700">{dish.region}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="video" className="mt-6">
            <VideoPlayer src={dish.video} poster={dish.image} className="aspect-[9/16] max-h-[500px] mx-auto" />
            <p className="text-center text-xs text-stone-400 mt-4">Watch the preparation of {dish.name}</p>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dish.ingredients.map((ing) => (
                <div key={ing.id} className="bg-white rounded-xl p-4 ring-1 ring-stone-100 flex items-center gap-4">
                  <img src={ing.image} alt={ing.name} className="h-12 w-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-stone-900">{ing.name}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{ing.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-6">
            <div className="bg-white rounded-2xl p-6 ring-1 ring-stone-100">
              <h3 className="text-sm font-semibold text-stone-900 mb-6">Per serving</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Calories', value: dish.nutrition.calories, unit: 'kcal', color: 'bg-orange-500' },
                  { label: 'Protein', value: dish.nutrition.protein, unit: 'g', color: 'bg-blue-500' },
                  { label: 'Fat', value: dish.nutrition.fat, unit: 'g', color: 'bg-amber-500' },
                  { label: 'Carbs', value: dish.nutrition.carbohydrates, unit: 'g', color: 'bg-emerald-500' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className={`h-14 w-14 rounded-2xl ${item.color}/10 mx-auto mb-3 flex items-center justify-center`}>
                      <span className={`text-sm font-bold ${item.color.replace('bg-', 'text-')}`}>{item.value}</span>
                    </div>
                    <p className="text-xs text-stone-500">{item.label}</p>
                    <p className="text-[10px] text-stone-300">{item.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pairings" className="mt-6 space-y-3">
            <p className="text-sm text-stone-500 mb-4">Pairs beautifully with:</p>
            {pairingDishes.length > 0 ? (
              pairingDishes.map((p) => (
                <Link key={p.id} href={`/m/${code}/dish/${p.id}`}>
                  <div className="bg-white rounded-xl p-4 ring-1 ring-stone-100 flex items-center gap-4 hover:ring-stone-200 hover:shadow-sm transition-all">
                    <img src={p.image} alt={p.name} className="h-14 w-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-stone-900">{p.name}</p>
                      <p className="text-xs text-stone-400 truncate">{p.description}</p>
                    </div>
                    <span className="text-sm font-bold text-stone-900">₹{p.price}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-white rounded-xl p-5 ring-1 ring-stone-100">
                <p className="text-sm text-stone-600">Recommended with: {dish.pairings.join(', ')}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 space-y-3">
            {dish.reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-5 ring-1 ring-stone-100">
                <div className="flex items-center gap-3 mb-3">
                  <img src={review.avatar} alt={review.author} className="h-9 w-9 rounded-full ring-1 ring-stone-100" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-900">{review.author}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-stone-300">{review.date}</span>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
