'use client';

export function Footer() {
  return (
    <footer className="bg-stone-950 text-white py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-medium mb-3">
              DishStory
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Transforming how restaurants present food and how customers discover it. Every dish deserves to be understood.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">&copy; 2024 DishStory. All rights reserved.</p>
          <p className="text-xs text-stone-500">Crafted for restaurants that care about food.</p>
        </div>
      </div>
    </footer>
  );
}
