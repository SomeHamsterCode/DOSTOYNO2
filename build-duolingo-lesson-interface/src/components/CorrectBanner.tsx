interface CorrectBannerProps {
  show: boolean;
  isCorrect: boolean;
  onContinue: () => void;
}

export default function CorrectBanner({ show, isCorrect, onContinue }: CorrectBannerProps) {
  if (!show) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t-2 px-6 py-5 transition-all duration-300 ${
        isCorrect
          ? 'border-green-300 bg-green-100'
          : 'border-red-300 bg-red-100'
      }`}
      style={{ animation: 'slideFromBottom 0.3s ease-out' }}
    >
      <div className="mx-auto flex max-w-lg items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              isCorrect ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <span className="text-lg text-white font-bold">
              {isCorrect ? '✓' : '✕'}
            </span>
          </div>
          <div>
            <p className={`font-bold text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
            <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? 'Great job! 🎉' : 'Keep trying! 💪'}
            </p>
          </div>
        </div>
        <button
          onClick={onContinue}
          className={`cursor-pointer rounded-2xl border-b-4 px-8 py-3 font-bold text-white transition-all duration-200 active:border-b-0 active:translate-y-1 ${
            isCorrect
              ? 'border-green-600 bg-green-500 hover:bg-green-400'
              : 'border-red-600 bg-red-500 hover:bg-red-400'
          }`}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
