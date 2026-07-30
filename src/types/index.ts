export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "legs"
  | "glutes"
  | "core"
  | "cardio"
  | "arms"
  | "full_body";

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: string;
  primary?: string[];
  secondary?: string[];
};

export type SetLog = {
  id: string;
  reps: number;
  weight: number;
};

export type ExerciseLog = {
  exerciseId: string;
  sets: SetLog[];
};

export type WorkoutSession = {
  id: string;
  date: string;
  name: string;
  duration: number;
  exercises: ExerciseLog[];
};

export type WorkoutData = {
  exercises: Exercise[];
  sessions: WorkoutSession[];
};

export type NewExercise = {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  primary: string[];
  secondary: string[];
};

export const GranularMuscle = {
  CHEST: "chest",
  LATS: "lats",
  LOWERBACK: "lowerback",
  TRAPS: "traps",
  SHOULDERS: "shoulders",
  BICEPS: "biceps",
  TRICEPS: "triceps",
  FOREARMS: "forearms",
  ABS: "abs",
  OBLIQUES: "obliques",
  QUADS: "quads",
  GLUTES: "glutes",
  HAMSTRINGS: "hamstrings",
  CALVES: "calves",
} as const;

export type GranularMuscle = (typeof GranularMuscle)[keyof typeof GranularMuscle];

export const muscleLabels: Record<string, string> = {
  chest: "Chest",
  lats: "Lats",
  lowerback: "Lower Back",
  traps: "Traps",
  shoulders: "Shoulders",
  biceps: "Biceps",
  triceps: "Triceps",
  forearms: "Forearms",
  abs: "Abs",
  obliques: "Obliques",
  quads: "Quads",
  glutes: "Glutes",
  hamstrings: "Hamstrings",
  calves: "Calves",
};

export const muscleColors: Record<string, string> = {
  chest: "#ef4444",
  lats: "#3b82f6",
  lowerback: "#f43f5e",
  traps: "#6366f1",
  shoulders: "#eab308",
  biceps: "#f97316",
  triceps: "#a855f7",
  forearms: "#f59e0b",
  abs: "#14b8a3",
  obliques: "#06b6d4",
  quads: "#22c55e",
  glutes: "#ec4899",
  hamstrings: "#10b981",
  calves: "#84cc16",
};
