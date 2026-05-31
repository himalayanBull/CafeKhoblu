import { dishes } from '@/data/dishes';

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export default function DishLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
