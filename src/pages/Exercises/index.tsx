import { useState } from "react";
import type { MuscleGroup } from "../../types";
import { muscleGroupLabels, muscleGroupColors } from "../../data/exercises";
import { useWorkoutData } from "../../hooks/useWorkoutData";

const muscleGroups: MuscleGroup[] = [
  "chest", "back", "shoulders", "biceps", "triceps",
  "legs", "glutes", "core", "cardio",
];

export default function ExerciseLibrary() {
  const { exercises, sessions } = useWorkoutData();
  const [activeGroup, setActiveGroup] = useState<MuscleGroup>("chest");

  const filtered = exercises.filter((e) => e.muscleGroup === activeGroup);

  const getUsageCount = (exId: string) =>
    sessions.filter((s) => s.exercises.some((e) => e.exerciseId === exId)).length;

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold">Exercise Library</h2>
        <p className="text-sm text-gray-400">{exercises.length} exercises total</p>
      </div>

      <div className="flex flex-wrap gap-1">
        {muscleGroups.map((mg) => (
          <button
            key={mg}
            onClick={() => setActiveGroup(mg)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeGroup === mg
                ? "bg-emerald-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {muscleGroupLabels[mg]}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((ex) => {
          const count = getUsageCount(ex.id);
          return (
            <div
              key={ex.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-white">{ex.name}</p>
                <p className="text-xs text-gray-500">{ex.equipment}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {count} {count === 1 ? "session" : "sessions"}
                </span>
                <div className={`w-2.5 h-2.5 rounded-full ${muscleGroupColors[ex.muscleGroup]}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
