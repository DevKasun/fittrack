import type { Exercise, MuscleGroup } from "../types";

export const exercises: Exercise[] = [
  { id: "bench-press", name: "Barbell Bench Press", muscleGroup: "Chest", equipment: "Barbell", primary: ["chest"], secondary: ["shoulders", "triceps"] },
  { id: "incline-db-press", name: "Incline Dumbbell Press", muscleGroup: "Chest", equipment: "Dumbbell", primary: ["chest"], secondary: ["shoulders"] },
  { id: "push-up", name: "Push-Up", muscleGroup: "Chest", equipment: "Bodyweight", primary: ["chest"], secondary: ["shoulders", "triceps", "abs"] },
  { id: "dips", name: "Parallel Bar Dips", muscleGroup: "Chest", equipment: "Bodyweight", primary: ["chest", "triceps"], secondary: ["shoulders"] },

  { id: "pull-up", name: "Pull-Up", muscleGroup: "Back", equipment: "Bodyweight", primary: ["lats"], secondary: ["biceps", "traps"] },
  { id: "barbell-row", name: "Barbell Row", muscleGroup: "Back", equipment: "Barbell", primary: ["lats"], secondary: ["biceps", "lowerback", "traps"] },
  { id: "lat-pulldown", name: "Lat Pulldown", muscleGroup: "Back", equipment: "Machine", primary: ["lats"], secondary: ["biceps"] },
  { id: "face-pull", name: "Face Pull", muscleGroup: "Back", equipment: "Cable", primary: ["traps"], secondary: ["shoulders"] },
  { id: "hyperextension", name: "Back Hyperextension", muscleGroup: "Back", equipment: "Bodyweight", primary: ["lowerback"], secondary: ["glutes", "hamstrings"] },

  { id: "overhead-press", name: "Overhead Press", muscleGroup: "Shoulders", equipment: "Barbell", primary: ["shoulders"], secondary: ["triceps", "traps"] },
  { id: "lateral-raise", name: "Lateral Raise", muscleGroup: "Shoulders", equipment: "Dumbbell", primary: ["shoulders"], secondary: [] },
  { id: "rear-delt-fly", name: "Rear Delt Fly", muscleGroup: "Shoulders", equipment: "Dumbbell", primary: ["shoulders"], secondary: ["traps"] },

  { id: "bicep-curl", name: "Dumbbell Bicep Curl", muscleGroup: "Arms", equipment: "Dumbbell", primary: ["biceps"], secondary: ["forearms"] },
  { id: "tricep-pushdown", name: "Tricep Pushdown", muscleGroup: "Arms", equipment: "Cable", primary: ["triceps"], secondary: ["forearms"] },
  { id: "hammer-curl", name: "Hammer Curl", muscleGroup: "Arms", equipment: "Dumbbell", primary: ["biceps"], secondary: ["forearms"] },
  { id: "wrist-curl", name: "Wrist Curl", muscleGroup: "Arms", equipment: "Dumbbell", primary: ["forearms"], secondary: [] },

  { id: "plank", name: "Plank", muscleGroup: "Core/Abs", equipment: "Bodyweight", primary: ["abs"], secondary: ["obliques", "lowerback"] },
  { id: "crunch", name: "Crunch", muscleGroup: "Core/Abs", equipment: "Bodyweight", primary: ["abs"], secondary: [] },
  { id: "russian-twist", name: "Russian Twist", muscleGroup: "Core/Abs", equipment: "Bodyweight", primary: ["obliques"], secondary: ["abs"] },
  { id: "hanging-leg-raise", name: "Hanging Leg Raise", muscleGroup: "Core/Abs", equipment: "Bodyweight", primary: ["abs"], secondary: ["obliques"] },

  { id: "squat", name: "Barbell Squat", muscleGroup: "Legs", equipment: "Barbell", primary: ["quads"], secondary: ["glutes", "hamstrings", "lowerback"] },
  { id: "lunge", name: "Walking Lunge", muscleGroup: "Legs", equipment: "Dumbbell", primary: ["quads", "glutes"], secondary: ["hamstrings"] },
  { id: "leg-press", name: "Leg Press", muscleGroup: "Legs", equipment: "Machine", primary: ["quads"], secondary: ["glutes", "hamstrings"] },
  { id: "romanian-deadlift", name: "Romanian Deadlift", muscleGroup: "Legs", equipment: "Barbell", primary: ["hamstrings"], secondary: ["glutes", "lowerback"] },
  { id: "calf-raise", name: "Standing Calf Raise", muscleGroup: "Legs", equipment: "Machine", primary: ["calves"], secondary: [] },
  { id: "hip-thrust", name: "Barbell Hip Thrust", muscleGroup: "Legs", equipment: "Barbell", primary: ["glutes"], secondary: ["hamstrings"] },

  { id: "deadlift", name: "Deadlift", muscleGroup: "Full Body/Compound", equipment: "Barbell", primary: ["hamstrings", "lowerback"], secondary: ["glutes", "lats", "traps", "forearms"] },
  { id: "burpee", name: "Burpee", muscleGroup: "Full Body/Compound", equipment: "Bodyweight", primary: ["chest", "quads"], secondary: ["shoulders", "abs", "calves"] },
  { id: "kettlebell-swing", name: "Kettlebell Swing", muscleGroup: "Full Body/Compound", equipment: "Kettlebell", primary: ["glutes", "hamstrings"], secondary: ["lowerback", "shoulders"] },
  { id: "clean-and-press", name: "Clean and Press", muscleGroup: "Full Body/Compound", equipment: "Barbell", primary: ["shoulders", "quads"], secondary: ["traps", "hamstrings", "lowerback", "abs"] },
];

export const allMuscleGroups: MuscleGroup[] = [
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Core/Abs",
  "Legs",
  "Full Body/Compound",
];