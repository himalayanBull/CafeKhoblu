'use client';

import { motion } from 'framer-motion';
import { QrCode, BookOpen, Video, BarChart3, Sparkles, Users } from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: 'Smart QR Menus',
    description: 'Elegant digital menus accessible via table QR codes. No app downloads, no friction.',
  },
  {
    icon: BookOpen,
    title: 'Dish Stories',
    description: 'Cultural origins, preparation philosophy, and the tradition behind every plate.',
  },
  {
    icon: Video,
    title: 'Cooking Videos',
    description: 'Full-screen vertical videos that let customers see their food being prepared.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Know which dishes are viewed most, which videos convert, and optimize your menu.',
  },
  {
    icon: Sparkles,
    title: 'AI Food Guide',
    description: 'Customers ask for recommendations in natural language. The AI knows your menu.',
  },
  {
    icon: Users,
    title: 'Customer Insights',
    description: 'Understand dietary preferences, peak ordering patterns, and engagement metrics.',
  },
];

export function Features() {
  return (
    <section className="py-32 px-6 sm:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-20"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Capabilities
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-medium text-gray-900 leading-tight mb-6">
            Everything a modern menu should be
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Static PDFs and basic QR menus leave money on the table. DishStory transforms browsing into discovery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-10 group hover:bg-stone-50 transition-colors"
            >
              <div className="h-11 w-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
