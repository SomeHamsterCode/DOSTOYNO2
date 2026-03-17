import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
  type: 'confetti' | 'star' | 'circle';
}

interface CelebrationProps {
  xpEarned: number;
  streak: number;
  onContinue: () => void;
}

export default function Celebration({ xpEarned, streak, onContinue }: CelebrationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const colors = ['#58cc02', '#ce82ff', '#00cd9c', '#1cb0f6', '#ff9600', '#ff4b4b', '#ffd900'];
    const types: Particle['type'][] = ['confetti', 'star', 'circle'];
    const newParticles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * -50 - 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.6,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }
    setParticles(newParticles);
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Confetti particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.type === 'confetti' ? p.size * 2.5 : p.size,
              backgroundColor: p.color,
              borderRadius: p.type === 'circle' ? '50%' : p.type === 'star' ? '2px' : '2px',
              transform: `rotate(${p.rotation}deg)`,
              animation: `confettiFall ${2 + Math.random()}s ease-in ${p.delay}s forwards`,
              opacity: 0.9,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        className={`relative mx-4 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl transition-all duration-700 ${
          showContent ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-8'
        }`}
      >
        {/* Trophy */}
        <div className="mb-6 flex justify-center">
          <div
            className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg shadow-yellow-200"
            style={{ animation: 'celebrationBounce 0.6s ease-out 0.5s both' }}
          >
            <span className="text-5xl">🏆</span>
          </div>
        </div>

        <h2
          className="mb-2 text-center text-3xl font-extrabold text-gray-800"
          style={{ animation: 'slideUp 0.5s ease-out 0.7s both' }}
        >
          Lesson Complete!
        </h2>
        <p
          className="mb-8 text-center text-gray-400"
          style={{ animation: 'slideUp 0.5s ease-out 0.8s both' }}
        >
          Amazing work! Keep it up! 🎉
        </p>

        {/* Stats */}
        <div
          className="mb-8 grid grid-cols-2 gap-4"
          style={{ animation: 'slideUp 0.5s ease-out 0.9s both' }}
        >
          <div className="flex flex-col items-center rounded-2xl bg-yellow-50 p-4">
            <svg className="mb-1 h-8 w-8 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <span className="text-2xl font-bold text-yellow-600">{xpEarned}</span>
            <span className="text-xs text-yellow-500 font-medium">XP EARNED</span>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-orange-50 p-4">
            <span className="mb-1 text-3xl" style={{ filter: 'drop-shadow(0 0 4px rgba(251,146,60,0.5))' }}>
              🔥
            </span>
            <span className="text-2xl font-bold text-orange-600">{streak}</span>
            <span className="text-xs text-orange-500 font-medium">DAY STREAK</span>
          </div>
        </div>

        {/* Accuracy bar */}
        <div
          className="mb-8"
          style={{ animation: 'slideUp 0.5s ease-out 1s both' }}
        >
          <div className="mb-1 flex justify-between text-sm">
            <span className="font-medium text-gray-500">Accuracy</span>
            <span className="font-bold text-green-600">Great!</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
              style={{
                width: '0%',
                animation: 'growWidth 1s ease-out 1.2s forwards',
              }}
            />
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full cursor-pointer rounded-2xl border-b-4 border-green-600 bg-green-500 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-green-400 active:border-b-0 active:translate-y-1"
          style={{ animation: 'slideUp 0.5s ease-out 1.1s both' }}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
