'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Video, Clock, TrendingUp, QrCode, Plus, Edit, Trash2, BarChart3, Menu } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { adminMetrics, dishAnalytics } from '@/data/admin';
import { dishes } from '@/data/dishes';
import { restaurant } from '@/data/restaurant';

type AdminTab = 'dashboard' | 'dishes' | 'qr-codes';

function MetricCard({ icon: Icon, label, value, change }: { icon: React.ElementType; label: string; value: string | number; change: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 ring-1 ring-stone-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center">
          <Icon className="h-5 w-5 text-stone-600" />
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">{change}</span>
      </div>
      <p className="text-3xl font-bold text-stone-900 tracking-tight">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      <p className="text-sm text-stone-400 mt-1">{label}</p>
    </motion.div>
  );
}

function DashboardTab() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Eye} label="Menu Views" value={adminMetrics.totalMenuViews} change="+12%" />
        <MetricCard icon={TrendingUp} label="Dish Views" value={adminMetrics.totalDishViews} change="+18%" />
        <MetricCard icon={Video} label="Video Plays" value={adminMetrics.videoPlays} change="+24%" />
        <MetricCard icon={Clock} label="Avg Session" value={adminMetrics.avgSessionTime} change="+8%" />
      </div>

      <div className="bg-white rounded-2xl ring-1 ring-stone-100 overflow-hidden">
        <div className="p-6 border-b border-stone-50">
          <h3 className="text-base font-semibold text-stone-900">Top Performing Dishes</h3>
          <p className="text-sm text-stone-400 mt-0.5">Ranked by views this week</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-50">
                <th className="text-left px-6 py-3.5 text-xs font-medium text-stone-400 uppercase tracking-wider">Dish</th>
                <th className="text-left px-6 py-3.5 text-xs font-medium text-stone-400 uppercase tracking-wider">Views</th>
                <th className="text-left px-6 py-3.5 text-xs font-medium text-stone-400 uppercase tracking-wider">Video Plays</th>
                <th className="text-left px-6 py-3.5 text-xs font-medium text-stone-400 uppercase tracking-wider">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {dishAnalytics.map((item) => (
                <tr key={item.dishId} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-stone-900">{item.dishName}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-600 tabular-nums">{item.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-stone-600 tabular-nums">{item.videoPlays.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-stone-900 rounded-full" style={{ width: `${item.conversionRate}%` }} />
                      </div>
                      <span className="text-sm font-medium text-stone-700 tabular-nums">{item.conversionRate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DishesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-stone-900">Menu Items</h3>
          <p className="text-sm text-stone-400">{dishes.length} dishes across {4} categories</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors">
          <Plus className="h-4 w-4" />
          Add Dish
        </button>
      </div>

      <div className="bg-white rounded-2xl ring-1 ring-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left px-6 py-3.5 text-xs font-medium text-stone-400 uppercase tracking-wider">Dish</th>
                <th className="text-left px-6 py-3.5 text-xs font-medium text-stone-400 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3.5 text-xs font-medium text-stone-400 uppercase tracking-wider">Price</th>
                <th className="text-left px-6 py-3.5 text-xs font-medium text-stone-400 uppercase tracking-wider">Rating</th>
                <th className="text-right px-6 py-3.5 text-xs font-medium text-stone-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((dish) => (
                <tr key={dish.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={dish.image} alt={dish.name} className="h-10 w-10 rounded-lg object-cover ring-1 ring-stone-100" />
                      <div>
                        <p className="text-sm font-medium text-stone-900">{dish.name}</p>
                        <p className="text-xs text-stone-400">{dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md capitalize">{dish.category.replace('-', ' ')}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-stone-900 tabular-nums">₹{dish.price}</td>
                  <td className="px-6 py-4 text-sm text-stone-600 tabular-nums">{dish.rating} ★</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="h-8 w-8 rounded-lg hover:bg-stone-100 flex items-center justify-center transition-colors">
                        <Edit className="h-3.5 w-3.5 text-stone-500" />
                      </button>
                      <button className="h-8 w-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors">
                        <Trash2 className="h-3.5 w-3.5 text-stone-400 hover:text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function QRCodesTab() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dishstory.app';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-stone-900">Table QR Codes</h3>
          <p className="text-sm text-stone-400">{restaurant.totalTables} tables configured</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {Array.from({ length: restaurant.totalTables }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="bg-white rounded-2xl p-5 ring-1 ring-stone-100 flex flex-col items-center hover:ring-stone-200 hover:shadow-sm transition-all"
          >
            <p className="text-xs font-semibold text-stone-900 mb-4">Table {i + 1}</p>
            <div className="p-2 bg-white rounded-xl">
              <QRCodeSVG
                value={`${baseUrl}/menu?table=${i + 1}`}
                size={100}
                bgColor="#FFFFFF"
                fgColor="#1C1917"
                level="M"
              />
            </div>
            <p className="text-[10px] text-stone-300 mt-3 font-mono">/menu?table={i + 1}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const tabs: { key: AdminTab; label: string; icon: React.ElementType }[] = [
    { key: 'dashboard', label: 'Overview', icon: BarChart3 },
    { key: 'dishes', label: 'Menu Items', icon: Menu },
    { key: 'qr-codes', label: 'QR Codes', icon: QrCode },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <header className="bg-white border-b border-stone-100 px-6 sm:px-10 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-stone-900">DishStory</h1>
            <p className="text-xs text-stone-400">{restaurant.name}</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-stone-200 flex items-center justify-center">
            <span className="text-xs font-bold text-stone-600">HK</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
        <div className="flex gap-1 mb-10 p-1 bg-stone-100 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'dishes' && <DishesTab />}
        {activeTab === 'qr-codes' && <QRCodesTab />}
      </div>
    </div>
  );
}
