interface FailScreenProps {
  onRetry: () => void;
}

export default function FailScreen({ onRetry }: FailScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl" style={{ animation: 'slideUp 0.5s ease-out' }}>
        <div className="mb-6 flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-red-300 to-red-500 shadow-lg shadow-red-200">
            <span className="text-5xl">💔</span>
          </div>
        </div>

        <h2 className="mb-2 text-center text-3xl font-extrabold text-gray-800">
          Out of Hearts!
        </h2>
        <p className="mb-8 text-center text-gray-400">
          Don't worry, practice makes perfect! Try again? 💪
        </p>

        <div className="mb-6 flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <svg key={i} className="h-8 w-8 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ))}
        </div>

        <button
          onClick={onRetry}
          className="w-full cursor-pointer rounded-2xl border-b-4 border-blue-600 bg-blue-500 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-blue-400 active:border-b-0 active:translate-y-1"
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  );
}
