import { useState } from "react";
import type { Exercise, MuscleGroup } from "../types";
import { muscleGroupLabels, muscleGroupColors, allMuscleGroups } from "../data/exercises";

type Props = {
  exercises: Exercise[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export function ExerciseSelector({ exercises, selectedIds, onToggle }: Props) {
  const [activeGroup, setActiveGroup] = useState<MuscleGroup>("chest");
  const filtered = exercises.filter((e) => e.muscleGroup === activeGroup);

  return (
    <div>
      <div className="flex flex-wrap gap-1 mb-3">
        {allMuscleGroups.map((mg) => (
          <button
            key={mg}
            onClick={() => setActiveGroup(mg)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeGroup === mg
                ? "bg-emerald-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {muscleGroupLabels[mg]}
          </button>
        ))}
      </div>

      <div className="space-y-1 max-h-64 overflow-y-auto">
        {filtered.map((ex) => {
          const selected = selectedIds.includes(ex.id);
          return (
            <button
              key={ex.id}
              onClick={() => onToggle(ex.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                selected
                  ? "bg-emerald-500/20 border border-emerald-500/50"
                  : "bg-gray-800/50 border border-transparent hover:bg-gray-800"
              }`}
            >
              <div>
                <span className="text-gray-200">{ex.name}</span>
                <span className="text-gray-500 text-xs ml-2">{ex.equipment}</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${muscleGroupColors[ex.muscleGroup]}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
