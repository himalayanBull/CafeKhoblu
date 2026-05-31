'use client';

export function SpiceLevel({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < level ? 'bg-orange-500' : 'bg-stone-200'
          }`}
        />
      ))}
    </div>
  );
}
