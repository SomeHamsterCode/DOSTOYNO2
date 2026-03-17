interface XPBadgeProps {
  xp: number;
  showGain?: number | null;
}

export default function XPBadge({ xp, showGain }: XPBadgeProps) {
  return (
    <div className="relative flex items-center gap-1.5">
      <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1">
        <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
        <span className="text-sm font-bold text-yellow-700">{xp} XP</span>
      </div>
      {showGain && (
        <span
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-yellow-500"
          style={{ animation: 'floatUp 1s ease-out forwards' }}
        >
          +{showGain}
        </span>
      )}
    </div>
  );
}
