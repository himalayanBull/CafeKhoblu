'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0C0A09]">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 text-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Next-generation restaurant menus
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.05] tracking-tight mb-8"
          >
            Turn every dish
            <br />
            <span className="text-amber-400">into a story</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed mb-12"
          >
            Beautiful QR menus with cooking videos, cultural stories, ingredient details, and AI-powered recommendations. Make every dish discoverable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Link
              href="/m/Xk9f2w"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-white text-gray-900 rounded-full font-semibold text-base hover:bg-amber-50 transition-all shadow-2xl shadow-white/10"
            >
              View Demo Menu
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/m/Xk9f2w/reels"
              className="inline-flex items-center gap-3 px-7 py-4 border border-white/20 text-white rounded-full font-medium text-base hover:bg-white/5 transition-all"
            >
              Watch Food Reels
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 right-6 flex items-center gap-4 sm:gap-8 text-white/40 text-xs sm:text-sm"
        >
          <div>
            <span className="block text-lg sm:text-2xl font-semibold text-white">4.9★</span>
            <span>Avg rating</span>
          </div>
          <div className="w-px h-6 sm:h-8 bg-white/10" />
          <div>
            <span className="block text-lg sm:text-2xl font-semibold text-white">32%</span>
            <span>More revenue</span>
          </div>
          <div className="w-px h-6 sm:h-8 bg-white/10" />
          <div>
            <span className="block text-lg sm:text-2xl font-semibold text-white">2.4x</span>
            <span>Engagement</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
