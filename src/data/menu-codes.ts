export interface MenuCode {
  code: string;
  restaurantId: string;
  tableNumber: number;
}

export const menuCodes: MenuCode[] = [
  { code: 'Xk9f2w', restaurantId: 'himalayan-kitchen', tableNumber: 1 },
  { code: 'Tm3pLq', restaurantId: 'himalayan-kitchen', tableNumber: 2 },
  { code: 'Jn7vRx', restaurantId: 'himalayan-kitchen', tableNumber: 3 },
  { code: 'Qw4mBz', restaurantId: 'himalayan-kitchen', tableNumber: 4 },
  { code: 'Hy8kNt', restaurantId: 'himalayan-kitchen', tableNumber: 5 },
  { code: 'Lp2sDf', restaurantId: 'himalayan-kitchen', tableNumber: 6 },
  { code: 'Vr6gWc', restaurantId: 'himalayan-kitchen', tableNumber: 7 },
  { code: 'Zn5xAe', restaurantId: 'himalayan-kitchen', tableNumber: 8 },
  { code: 'Fb9tYm', restaurantId: 'himalayan-kitchen', tableNumber: 9 },
  { code: 'Gk1hPw', restaurantId: 'himalayan-kitchen', tableNumber: 10 },
  { code: 'Cd4jRs', restaurantId: 'himalayan-kitchen', tableNumber: 11 },
  { code: 'Mn8qUv', restaurantId: 'himalayan-kitchen', tableNumber: 12 },
];

export function getMenuCode(code: string): MenuCode | undefined {
  return menuCodes.find((mc) => mc.code === code);
}
