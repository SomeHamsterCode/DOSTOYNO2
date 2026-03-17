import { useState } from 'react';
import { Choice } from '../types';

interface MultipleChoiceProps {
  question: string;
  hint?: string;
  choices: Choice[];
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

export default function MultipleChoice({ question, hint, choices, onAnswer, disabled }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (choice: Choice) => {
    if (disabled || showResult) return;
    setSelected(choice.id);
    setShowResult(true);
    setTimeout(() => {
      onAnswer(!!choice.isCorrect);
    }, 1200);
  };

  const getChoiceStyle = (choice: Choice) => {
    if (!showResult || selected !== choice.id) {
      if (showResult && choice.isCorrect) {
        return 'border-green-400 bg-green-50 text-green-700';
      }
      return selected === choice.id
        ? 'border-blue-400 bg-blue-50 text-blue-700'
        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700';
    }
    if (choice.isCorrect) return 'border-green-400 bg-green-50 text-green-700 ring-2 ring-green-200';
    return 'border-red-400 bg-red-50 text-red-700 ring-2 ring-red-200 animate-shake';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">{question}</h2>
        {hint && <p className="text-sm text-gray-400 italic">💡 {hint}</p>}
      </div>
      <div className="grid gap-3">
        {choices.map((choice, index) => (
          <button
            key={choice.id}
            onClick={() => handleSelect(choice)}
            disabled={disabled || showResult}
            className={`flex items-center gap-4 rounded-2xl border-2 border-b-4 px-5 py-4 text-left text-lg font-medium transition-all duration-200 active:border-b-2 active:translate-y-0.5 ${getChoiceStyle(choice)} ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-current text-sm font-bold opacity-60">
              {index + 1}
            </span>
            <span>{choice.text}</span>
            {showResult && selected === choice.id && (
              <span className="ml-auto text-xl">
                {choice.isCorrect ? '✅' : '❌'}
              </span>
            )}
            {showResult && choice.isCorrect && selected !== choice.id && (
              <span className="ml-auto text-xl">✅</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
