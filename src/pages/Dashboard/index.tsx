import { useState, useMemo } from "react";
import type { MuscleGroup } from "../../types";
import { useWorkoutData } from "../../hooks/useWorkoutData";
import { MuscleBody3D } from "../../components/MuscleBody3D";
import { muscleGroupLabels, muscleGroupColors, allMuscleGroups } from "../../data/exercises";
import { muscleLabels, muscleColors } from "../../types";

export default function Dashboard() {
  const { exercises } = useWorkoutData();
  const [activeGroup, setActiveGroup] = useState<MuscleGroup | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return exercises.filter((e) => {
      const matchesGroup = !activeGroup || e.muscleGroup === activeGroup;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.muscleGroup.toLowerCase().includes(q) ||
        e.equipment.toLowerCase().includes(q) ||
        e.primary?.some((m) => m.toLowerCase().includes(q));
      return matchesGroup && matchesSearch;
    });
  }, [exercises, activeGroup, searchQuery]);

  const activeMuscles = useMemo(() => {
    const set = new Set<string>();
    if (!activeGroup) {
      filtered.forEach((e) => {
        e.primary?.forEach((m) => set.add(m));
        e.secondary?.forEach((m) => set.add(m));
      });
    } else {
      filtered.forEach((e) => {
        e.primary?.forEach((m) => set.add(m));
      });
    }
    return [...set];
  }, [filtered, activeGroup]);

  const groupCount = useMemo(() => {
    const map = new Map<string, number>();
    map.set("all", exercises.length);
    for (const mg of allMuscleGroups) {
      map.set(mg, exercises.filter((e) => e.muscleGroup === mg).length);
    }
    return map;
  }, [exercises]);

  return (
    <div className="p-4 space-y-4 pb-24">
      <div>
        <h2 className="text-xl font-bold">Muscle Anatomy</h2>
        <p className="text-sm text-gray-400">
          Explore exercises by muscle group
        </p>
      </div>

      <MuscleBody3D activeMuscles={activeMuscles} />

      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveGroup(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !activeGroup
              ? "bg-emerald-500 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          All ({groupCount.get("all")})
        </button>
        {allMuscleGroups.map((mg) => (
          <button
            key={mg}
            onClick={() => setActiveGroup(mg)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeGroup === mg
                ? "bg-emerald-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {muscleGroupLabels[mg]} ({groupCount.get(mg)})
          </button>
        ))}
      </div>

      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search exercises, muscles, equipment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No exercises match your filters</p>
          </div>
        ) : (
          filtered.map((ex) => {
            const allTargets = [...(ex.primary ?? []), ...(ex.secondary ?? [])];
            return (
              <div
                key={ex.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-3 space-y-2 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white text-sm">
                      {ex.name}
                    </p>
                    <p className="text-xs text-gray-500">{ex.equipment}</p>
                  </div>
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      muscleGroupColors[ex.muscleGroup]
                    }`}
                  />
                </div>
                {allTargets.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {ex.primary?.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: muscleColors[m] + "20",
                          color: muscleColors[m],
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: muscleColors[m] }}
                        />
                        {muscleLabels[m] ?? m}
                      </span>
                    ))}
                    {ex.secondary?.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full text-gray-400 bg-gray-800"
                      >
                        {muscleLabels[m] ?? m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
