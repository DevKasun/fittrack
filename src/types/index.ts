export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "legs"
  | "glutes"
  | "core"
  | "cardio";

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: string;
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
