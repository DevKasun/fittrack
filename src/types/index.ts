export type MuscleGroup =
  | "Chest"
  | "Back"
  | "Shoulders"
  | "Arms"
  | "Core/Abs"
  | "Legs"
  | "Full Body/Compound";

export type MuscleId =
  | "chest"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "forearms"
  | "abs"
  | "obliques"
  | "quads"
  | "hamstrings"
  | "calves"
  | "glutes"
  | "lats"
  | "traps"
  | "lowerback";

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: string;
  primary: string[];
  secondary: string[];
};

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