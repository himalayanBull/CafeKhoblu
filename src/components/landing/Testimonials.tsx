'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Thakur',
    role: 'Owner, Mountain View Restaurant',
    avatar: 'https://i.pravatar.cc/80?img=65',
    quote: 'Our average order value increased 32% after implementing DishStory. Customers explore more and order dishes they never would have tried.',
  },
  {
    name: 'Priya Sharma',
    role: 'GM, The Spice Garden',
    avatar: 'https://i.pravatar.cc/80?img=44',
    quote: "The cooking videos changed everything. Customers watch the preparation, get excited, and order more. Our kitchen feels connected to the dining room.",
  },
  {
    name: 'Amit Verma',
    role: 'Chef & Owner, Himalayan Bites',
    avatar: 'https://i.pravatar.cc/80?img=52',
    quote: "Finally, a platform that respects the craft behind food. My dishes have stories — now my customers actually hear them.",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 px-6 sm:px-12 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-20"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Testimonials
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-medium text-gray-900 leading-tight">
            Trusted by restaurants that care about food
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-stone-100" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
