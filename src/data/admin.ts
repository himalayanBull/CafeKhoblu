import { AdminMetrics, DishAnalytics } from '@/types';

export const adminMetrics: AdminMetrics = {
  totalMenuViews: 12847,
  totalDishViews: 34291,
  videoPlays: 8453,
  avgSessionTime: '4m 32s',
};

export const dishAnalytics: DishAnalytics[] = [
  { dishId: 'butter-chicken', dishName: 'Butter Chicken', views: 4521, videoPlays: 1203, conversionRate: 78 },
  { dishId: 'biryani-dum', dishName: 'Himalayan Dum Biryani', views: 3892, videoPlays: 1456, conversionRate: 72 },
  { dishId: 'chha-gosht', dishName: 'Chha Gosht', views: 3456, videoPlays: 987, conversionRate: 68 },
  { dishId: 'paneer-tikka', dishName: 'Paneer Tikka', views: 3201, videoPlays: 876, conversionRate: 65 },
  { dishId: 'dal-makhani', dishName: 'Dal Makhani', views: 2987, videoPlays: 654, conversionRate: 71 },
  { dishId: 'siddu', dishName: 'Siddu', views: 2876, videoPlays: 1023, conversionRate: 82 },
  { dishId: 'masala-chai', dishName: 'Himalayan Masala Chai', views: 2654, videoPlays: 432, conversionRate: 89 },
  { dishId: 'madra', dishName: 'Madra', views: 2431, videoPlays: 789, conversionRate: 64 },
];
