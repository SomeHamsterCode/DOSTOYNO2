import { useState, useEffect, useCallback } from 'react';
import { MatchPair } from '../types';

interface MatchingExerciseProps {
  question: string;
  pairs: MatchPair[];
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

export default function MatchingExercise({ question, pairs, onAnswer, disabled }: MatchingExerciseProps) {
  const [shuffledLeft, setShuffledLeft] = useState<MatchPair[]>([]);
  const [shuffledRight, setShuffledRight] = useState<MatchPair[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    setShuffledLeft([...pairs].sort(() => Math.random() - 0.5));
    setShuffledRight([...pairs].sort(() => Math.random() - 0.5));
  }, [pairs]);

  const checkMatch = useCallback((leftId: string, rightId: string) => {
    if (leftId === rightId) {
      setMatched(prev => {
        const next = new Set(prev);
        next.add(leftId);
        return next;
      });
      setSelectedLeft(null);
      setSelectedRight(null);
      
      if (matched.size + 1 === pairs.length) {
        setTimeout(() => onAnswer(mistakes === 0), 600);
      }
    } else {
      setWrongPair({ left: leftId, right: rightId });
      setMistakes(prev => prev + 1);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 800);
    }
  }, [matched.size, mistakes, onAnswer, pairs.length]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      checkMatch(selectedLeft, selectedRight);
    }
  }, [selectedLeft, selectedRight, checkMatch]);

  const handleLeftClick = (id: string) => {
    if (disabled || matched.has(id)) return;
    setSelectedLeft(id);
    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleRightClick = (id: string) => {
    if (disabled || matched.has(id)) return;
    setSelectedRight(id);
    if (selectedLeft) {
      checkMatch(selectedLeft, id);
    }
  };

  const getLeftStyle = (id: string) => {
    if (matched.has(id)) return 'border-green-400 bg-green-50 text-green-600 scale-95 opacity-60';
    if (wrongPair?.left === id) return 'border-red-400 bg-red-50 text-red-600 animate-shake';
    if (selectedLeft === id) return 'border-blue-400 bg-blue-100 text-blue-700 ring-2 ring-blue-200 scale-105';
    return 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700';
  };

  const getRightStyle = (id: string) => {
    if (matched.has(id)) return 'border-green-400 bg-green-50 text-green-600 scale-95 opacity-60';
    if (wrongPair?.right === id) return 'border-red-400 bg-red-50 text-red-600 animate-shake';
    if (selectedRight === id) return 'border-blue-400 bg-blue-100 text-blue-700 ring-2 ring-blue-200 scale-105';
    return 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{question}</h2>
      <p className="text-sm text-gray-400">Tap a word on each side to match them</p>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-3">
          {shuffledLeft.map(pair => (
            <button
              key={pair.id}
              onClick={() => handleLeftClick(pair.id)}
              disabled={disabled || matched.has(pair.id)}
              className={`rounded-2xl border-2 border-b-4 px-4 py-3.5 text-center text-base font-semibold transition-all duration-200 ${getLeftStyle(pair.id)} ${
                disabled || matched.has(pair.id) ? 'cursor-default' : 'cursor-pointer active:border-b-2 active:translate-y-0.5'
              }`}
            >
              {pair.left}
              {matched.has(pair.id) && ' ✓'}
            </button>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {shuffledRight.map(pair => (
            <button
              key={pair.id}
              onClick={() => handleRightClick(pair.id)}
              disabled={disabled || matched.has(pair.id)}
              className={`rounded-2xl border-2 border-b-4 px-4 py-3.5 text-center text-base font-semibold transition-all duration-200 ${getRightStyle(pair.id)} ${
                disabled || matched.has(pair.id) ? 'cursor-default' : 'cursor-pointer active:border-b-2 active:translate-y-0.5'
              }`}
            >
              {pair.right}
              {matched.has(pair.id) && ' ✓'}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-1 justify-center">
        {pairs.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              i < matched.size ? 'bg-green-400' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
