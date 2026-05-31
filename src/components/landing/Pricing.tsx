'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '₹2,999',
    period: '/month',
    description: 'For single-location restaurants getting started with digital menus.',
    features: [
      'Up to 50 dishes',
      'QR code generation',
      'Basic analytics dashboard',
      'Mobile-optimized menu',
      'Email support',
    ],
    highlighted: false,
    cta: 'Start free trial',
  },
  {
    name: 'Professional',
    price: '₹7,999',
    period: '/month',
    description: 'For restaurants serious about the customer experience.',
    features: [
      'Unlimited dishes',
      'Video hosting & player',
      'Advanced analytics & heatmaps',
      'AI recommendation engine',
      'Custom branding & domain',
      'Priority support',
      'Multi-location support',
    ],
    highlighted: true,
    cta: 'Start free trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For chains and franchise groups with complex needs.',
    features: [
      'Everything in Professional',
      'Multi-language menus',
      'Full API access',
      'Dedicated success manager',
      'Custom integrations (POS, ordering)',
      'SLA & uptime guarantee',
    ],
    highlighted: false,
    cta: 'Contact sales',
  },
];

export function Pricing() {
  return (
    <section className="py-32 px-6 sm:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Pricing
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-medium text-gray-900 leading-tight mb-6">
            Start free, scale when ready
          </h2>
          <p className="text-lg text-gray-500">
            14-day free trial on all plans. No credit card required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gray-900 text-white ring-1 ring-gray-900 shadow-2xl shadow-gray-900/20 md:-my-4 md:py-12'
                  : 'bg-white text-gray-900 ring-1 ring-gray-200'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-amber-400 text-gray-900 text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                {plan.period && (
                  <span className={plan.highlighted ? 'text-white/50' : 'text-gray-400'}>
                    {plan.period}
                  </span>
                )}
              </div>
              <p className={`text-sm mb-8 ${plan.highlighted ? 'text-white/60' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${plan.highlighted ? 'text-amber-400' : 'text-primary'}`} />
                    <span className={plan.highlighted ? 'text-white/80' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? 'bg-white text-gray-900 hover:bg-amber-50'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
