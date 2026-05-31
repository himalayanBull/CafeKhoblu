import { menuCodes } from '@/data/menu-codes';

export function generateStaticParams() {
  return menuCodes.map((mc) => ({ code: mc.code }));
}

export default function MenuCodeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
