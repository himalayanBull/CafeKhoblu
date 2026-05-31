import { menuCodes } from '@/data/menu-codes';
import { dishes } from '@/data/dishes';

export function generateStaticParams() {
  const params: { code: string; id: string }[] = [];
  for (const mc of menuCodes) {
    for (const dish of dishes) {
      params.push({ code: mc.code, id: dish.id });
    }
  }
  return params;
}

export default function DishLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
