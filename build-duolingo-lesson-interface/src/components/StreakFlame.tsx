interface StreakFlameProps {
  streak: number;
}

export default function StreakFlame({ streak }: StreakFlameProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="relative">
        <svg
          className="h-8 w-8 text-orange-500 drop-shadow-lg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{
            animation: 'flicker 1.5s ease-in-out infinite alternate',
            filter: 'drop-shadow(0 0 6px rgba(251, 146, 60, 0.5))',
          }}
        >
          <path d="M12 23c-3.866 0-7-3.134-7-7 0-3.132 2.785-6.24 5.282-8.576a.5.5 0 01.83.245c.316 1.476 1.12 3.083 2.388 3.831.1-.93.436-2.196 1.076-3.576C15.796 5.404 17 3.266 17 1a.5.5 0 01.862-.344C19.804 2.78 22 6.5 22 10c0 3.866-3.134 7-7 7-.765 0-1.5-.122-2.19-.347C12.93 18.664 13.5 20.272 13.5 22a.5.5 0 01-.5.5.5.5 0 01-.5-.5c0-1.657-.67-3.154-1.757-4.243A6.97 6.97 0 0112 23z" />
        </svg>
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2"
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: '#fbbf24',
            animation: 'sparkle 0.8s ease-in-out infinite',
          }}
        />
      </div>
      <span className="text-lg font-bold text-orange-500">{streak}</span>
    </div>
  );
}
