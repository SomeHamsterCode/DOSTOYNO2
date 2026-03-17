export type ExerciseType = 'multiple-choice' | 'matching' | 'translation' | 'fill-blank';

export interface Choice {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface Exercise {
  id: number;
  type: ExerciseType;
  question: string;
  hint?: string;
  choices?: Choice[];
  matchPairs?: MatchPair[];
  correctAnswer?: string;
  blankedSentence?: string;
  options?: string[];
  xpReward: number;
}

export interface LessonState {
  currentExercise: number;
  totalExercises: number;
  hearts: number;
  maxHearts: number;
  xp: number;
  streak: number;
  completed: boolean;
  failed: boolean;
}
