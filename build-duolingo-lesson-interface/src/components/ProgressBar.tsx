interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute inset-0 h-full rounded-full opacity-30"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
          }}
        />
      </div>
    </div>
  );
}
