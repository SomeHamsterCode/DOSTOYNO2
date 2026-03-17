import { useState, useCallback } from 'react';
import ProgressBar from './components/ProgressBar';
import Hearts from './components/Hearts';
import StreakFlame from './components/StreakFlame';
import XPBadge from './components/XPBadge';
import MultipleChoice from './components/MultipleChoice';
import MatchingExercise from './components/MatchingExercise';
import FillBlank from './components/FillBlank';
import Celebration from './components/Celebration';
import FailScreen from './components/FailScreen';
import CorrectBanner from './components/CorrectBanner';
import { exercises } from './data/exercises';
import { LessonState } from './types';

const INITIAL_STATE: LessonState = {
  currentExercise: 0,
  totalExercises: exercises.length,
  hearts: 5,
  maxHearts: 5,
  xp: 0,
  streak: 7,
  completed: false,
  failed: false,
};

export default function App() {
  const [state, setState] = useState<LessonState>(INITIAL_STATE);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerCorrect, setBannerCorrect] = useState(false);
  const [xpGain, setXpGain] = useState<number | null>(null);
  const [heartShake, setHeartShake] = useState(false);
  const [exerciseKey, setExerciseKey] = useState(0);
  const [started, setStarted] = useState(false);

  const currentExercise = exercises[state.currentExercise];

  const handleAnswer = useCallback((correct: boolean) => {
    setBannerCorrect(correct);
    setShowBanner(true);

    if (correct) {
      const reward = currentExercise.xpReward;
      setXpGain(reward);
      setState(prev => ({
        ...prev,
        xp: prev.xp + reward,
      }));
      setTimeout(() => setXpGain(null), 1200);
    } else {
      setHeartShake(true);
      setState(prev => {
        const newHearts = prev.hearts - 1;
        if (newHearts <= 0) {
          return { ...prev, hearts: 0, failed: true };
        }
        return { ...prev, hearts: newHearts };
      });
      setTimeout(() => setHeartShake(false), 700);
    }
  }, [currentExercise]);

  const handleContinue = useCallback(() => {
    setShowBanner(false);
    if (state.failed) return;

    setState(prev => {
      const nextExercise = prev.currentExercise + 1;
      if (nextExercise >= prev.totalExercises) {
        return { ...prev, completed: true };
      }
      return { ...prev, currentExercise: nextExercise };
    });
    setExerciseKey(prev => prev + 1);
  }, [state.failed]);

  const handleRestart = useCallback(() => {
    setState(INITIAL_STATE);
    setShowBanner(false);
    setBannerCorrect(false);
    setXpGain(null);
    setHeartShake(false);
    setExerciseKey(prev => prev + 1);
  }, []);

  const handleLessonComplete = useCallback(() => {
    setState(prev => ({ ...prev, streak: prev.streak + 1 }));
    handleRestart();
  }, [handleRestart]);

  const handleQuit = useCallback(() => {
    setStarted(false);
    handleRestart();
  }, [handleRestart]);

  // Start Screen
  if (!started) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-400 to-green-600 p-4">
        <div className="w-full max-w-md text-center" style={{ animation: 'slideUp 0.6s ease-out' }}>
          {/* Owl mascot */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-2xl">
                <span className="text-7xl" style={{ animation: 'flicker 2s ease-in-out infinite alternate' }}>
                  🦉
                </span>
              </div>
              <div
                className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 shadow-lg"
                style={{ animation: 'celebrationBounce 1s ease-out 0.3s both' }}
              >
                <span className="text-lg">⭐</span>
              </div>
            </div>
          </div>

          <h1 className="mb-2 text-4xl font-extrabold text-white drop-shadow-lg">
            DuoLearn
          </h1>
          <p className="mb-2 text-lg text-green-100">
            Spanish Basics • Lesson 1
          </p>
          <p className="mb-8 text-sm text-green-200">
            8 exercises • ~5 minutes
          </p>

          {/* Stats preview */}
          <div className="mb-8 flex justify-center gap-6">
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
              <span className="text-xl">🔥</span>
              <span className="font-bold text-white">{state.streak} day streak</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
              <span className="text-xl">⭐</span>
              <span className="font-bold text-white">{state.xp} XP</span>
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="w-full cursor-pointer rounded-2xl border-b-4 border-white/30 bg-white px-8 py-5 text-xl font-extrabold text-green-600 shadow-lg transition-all duration-200 hover:bg-green-50 active:border-b-0 active:translate-y-1"
          >
            START LESSON
          </button>

          <p className="mt-6 text-sm text-green-200 opacity-75">
            You have ❤️ 5 lives — don't lose them all!
          </p>
        </div>
      </div>
    );
  }

  // Render exercise type indicator
  const getExerciseTypeLabel = () => {
    switch (currentExercise?.type) {
      case 'multiple-choice':
        return { label: 'Select the correct answer', icon: '🎯' };
      case 'matching':
        return { label: 'Match the pairs', icon: '🔗' };
      case 'translation':
        return { label: 'Choose the translation', icon: '🌍' };
      case 'fill-blank':
        return { label: 'Complete the sentence', icon: '✏️' };
      default:
        return { label: '', icon: '' };
    }
  };

  const typeInfo = getExerciseTypeLabel();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-3">
          {/* Close button */}
          <button
            onClick={handleQuit}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Progress bar */}
          <div className="flex-1">
            <ProgressBar current={state.currentExercise} total={state.totalExercises} />
          </div>

          {/* Hearts */}
          <Hearts hearts={state.hearts} maxHearts={state.maxHearts} shake={heartShake} />
        </div>
      </div>

      {/* Stats bar */}
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <StreakFlame streak={state.streak} />
        <XPBadge xp={state.xp} showGain={xpGain} />
      </div>

      {/* Exercise area */}
      <div className="mx-auto max-w-2xl px-4 pb-32 pt-4">
        {/* Exercise type badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-100"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          <span>{typeInfo.icon}</span>
          <span className="text-sm font-medium text-gray-500">{typeInfo.label}</span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-400">
            {state.currentExercise + 1}/{state.totalExercises}
          </span>
        </div>

        {/* Exercise content */}
        <div key={exerciseKey} style={{ animation: 'slideUp 0.4s ease-out' }}>
          {currentExercise?.type === 'multiple-choice' && (
            <MultipleChoice
              question={currentExercise.question}
              hint={currentExercise.hint}
              choices={currentExercise.choices!}
              onAnswer={handleAnswer}
              disabled={showBanner}
            />
          )}

          {currentExercise?.type === 'translation' && (
            <MultipleChoice
              question={currentExercise.question}
              hint={currentExercise.hint}
              choices={currentExercise.choices!}
              onAnswer={handleAnswer}
              disabled={showBanner}
            />
          )}

          {currentExercise?.type === 'matching' && (
            <MatchingExercise
              question={currentExercise.question}
              pairs={currentExercise.matchPairs!}
              onAnswer={handleAnswer}
              disabled={showBanner}
            />
          )}

          {currentExercise?.type === 'fill-blank' && (
            <FillBlank
              question={currentExercise.question}
              sentence={currentExercise.blankedSentence!}
              correctAnswer={currentExercise.correctAnswer!}
              options={currentExercise.options!}
              onAnswer={handleAnswer}
              disabled={showBanner}
            />
          )}
        </div>
      </div>

      {/* Bottom banner */}
      <CorrectBanner
        show={showBanner && !state.failed}
        isCorrect={bannerCorrect}
        onContinue={handleContinue}
      />

      {/* Celebration modal */}
      {state.completed && (
        <Celebration
          xpEarned={state.xp}
          streak={state.streak}
          onContinue={handleLessonComplete}
        />
      )}

      {/* Fail modal */}
      {state.failed && <FailScreen onRetry={handleRestart} />}
    </div>
  );
}
