export interface Ingredient {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber?: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  longStory: string;
  culturalOrigin: string;
  region: string;
  category: DishCategory;
  price: number;
  rating: number;
  totalReviews: number;
  ingredients: Ingredient[];
  nutrition: NutritionInfo;
  preparationTime: number;
  tags: string[];
  image: string;
  video: string;
  pairings: string[];
  reviews: Review[];
  isVeg: boolean;
  isVegan: boolean;
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  isBestseller: boolean;
  ordersToday: number;
  isTrending: boolean;
  isChefRecommended: boolean;
  isLocalSpecialty: boolean;
}

export type DishCategory = 'starters' | 'main-course' | 'desserts' | 'drinks';

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  description: string;
  cuisine: string;
  location: string;
  rating: number;
  totalTables: number;
}

export interface AdminMetrics {
  totalMenuViews: number;
  totalDishViews: number;
  videoPlays: number;
  avgSessionTime: string;
}

export interface DishAnalytics {
  dishId: string;
  dishName: string;
  views: number;
  videoPlays: number;
  conversionRate: number;
}
