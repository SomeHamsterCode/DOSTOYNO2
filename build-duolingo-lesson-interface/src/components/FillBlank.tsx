import { useState } from 'react';

interface FillBlankProps {
  question: string;
  sentence: string;
  correctAnswer: string;
  options: string[];
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

export default function FillBlank({ question, sentence, correctAnswer, options, onAnswer, disabled }: FillBlankProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const parts = sentence.split('___');

  const handleSelect = (option: string) => {
    if (disabled || showResult) return;
    setSelected(option);
    setShowResult(true);
    const isCorrect = option === correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1200);
  };

  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return selected === option
        ? 'border-blue-400 bg-blue-100 text-blue-700'
        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700';
    }
    if (option === correctAnswer) return 'border-green-400 bg-green-50 text-green-700 ring-2 ring-green-200';
    if (option === selected && option !== correctAnswer) return 'border-red-400 bg-red-50 text-red-700 ring-2 ring-red-200 animate-shake';
    return 'border-gray-200 bg-gray-50 text-gray-400';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{question}</h2>
      <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 px-6 py-5">
        <p className="text-xl text-gray-700 text-center">
          {parts[0]}
          <span
            className={`inline-block min-w-[80px] mx-1 rounded-lg border-b-2 px-3 py-1 text-center font-bold transition-all duration-300 ${
              selected
                ? showResult
                  ? selected === correctAnswer
                    ? 'border-green-400 bg-green-100 text-green-700'
                    : 'border-red-400 bg-red-100 text-red-700'
                  : 'border-blue-400 bg-blue-100 text-blue-700'
                : 'border-gray-300 bg-white text-gray-400'
            }`}
          >
            {selected || '___'}
          </span>
          {parts[1]}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(option => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={disabled || showResult}
            className={`rounded-2xl border-2 border-b-4 px-4 py-3.5 text-center text-lg font-semibold transition-all duration-200 active:border-b-2 active:translate-y-0.5 ${getOptionStyle(option)} ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
