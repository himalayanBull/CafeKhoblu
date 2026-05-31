'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';

export function OrderPanel() {
  const { items, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice } = useCartStore();
  const [collapsed, setCollapsed] = useState(true);
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  const tax = Math.round(getTotalPrice() * 0.05);
  const total = getTotalPrice() + tax;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] rounded-t-3xl max-h-[70vh] flex flex-col"
    >
      {/* Header — always visible */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between px-6 py-4 w-full"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="h-5 w-5 text-stone-700" />
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-stone-900 text-[10px] font-bold text-white flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-stone-900">Your Order</p>
            <p className="text-xs text-stone-400">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-stone-900">₹{total}</span>
          {collapsed ? (
            <ChevronUp className="h-4 w-4 text-stone-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-stone-400" />
          )}
        </div>
      </button>

      {/* Order items — collapsible */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 max-h-[40vh] overflow-y-auto space-y-3">
              {items.map((item) => (
                <div
                  key={item.dish.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 ring-1 ring-stone-100"
                >
                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    className="h-12 w-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">{item.dish.name}</p>
                    <p className="text-xs text-stone-400">{item.dish.isVeg ? 'Veg' : 'Non-Veg'}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                      className="h-9 w-9 rounded-lg bg-white ring-1 ring-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5 text-stone-600" />
                    </button>
                    <span className="w-7 text-center text-sm font-bold text-stone-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                      className="h-9 w-9 rounded-lg bg-white ring-1 ring-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5 text-stone-600" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-stone-900 w-14 text-right shrink-0">
                    ₹{item.dish.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeItem(item.dish.id)}
                    className="h-7 w-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors shrink-0"
                  >
                    <Trash2 className="h-3 w-3 text-stone-300 hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            {/* Totals & CTA */}
            <div className="px-6 pb-6 pt-3 border-t border-stone-100">
              <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                <span>Subtotal</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-400 mb-3">
                <span>GST (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-stone-900">Total</span>
                <span className="text-lg font-bold text-stone-900">₹{total}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="px-4 py-3 rounded-xl ring-1 ring-stone-200 text-xs font-medium text-stone-500 hover:bg-stone-50 transition-colors"
                >
                  Clear
                </button>
                <button className="flex-1 py-3.5 rounded-xl bg-stone-900 text-white font-semibold text-sm hover:bg-stone-800 transition-colors">
                  Place Order
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AddToCartButton({ dish }: { dish: import('@/types').Dish }) {
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((item) => item.dish.id === dish.id);

  if (cartItem) {
    return (
      <div className="flex items-center gap-0.5 bg-stone-900 rounded-xl ring-1 ring-stone-800">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(dish.id, cartItem.quantity - 1); }}
          className="h-9 w-9 flex items-center justify-center hover:bg-stone-800 rounded-l-xl transition-colors"
        >
          <Minus className="h-3.5 w-3.5 text-white" />
        </button>
        <span className="w-8 text-center text-sm font-bold text-white">{cartItem.quantity}</span>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(dish.id, cartItem.quantity + 1); }}
          className="h-9 w-9 flex items-center justify-center hover:bg-stone-800 rounded-r-xl transition-colors"
        >
          <Plus className="h-3.5 w-3.5 text-white" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(dish); }}
      className="h-9 px-4 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1.5"
    >
      <Plus className="h-3.5 w-3.5" />
      Add
    </button>
  );
}
