import { useMemo, useState } from "react";
import type { Exercise, MuscleGroup } from "../types";
import { muscleLabels } from "../types";
import { exercises as allExercises, allMuscleGroups } from "../data/exercises";
import { BodyMap } from "./BodyMap";
import type { BodyView } from "./BodyMap";

const PRIMARY_COLOR = "#C6FF3D";
const SECONDARY_COLOR = "#FF8A45";
const ALL = "All";

const BACK_ONLY_MUSCLES = new Set([
  "traps",
  "lats",
  "lowerback",
  "glutes",
  "hamstrings",
  "triceps",
]);

export function ExerciseLibrary() {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<MuscleGroup | typeof ALL>("All");
  const [selectedId, setSelectedId] = useState(allExercises[0].id);
  const [view, setView] = useState<BodyView>("front");

  const counts = useMemo(() => {
    const map = new Map<MuscleGroup | typeof ALL, number>();
    map.set(ALL, allExercises.length);
    for (const group of allMuscleGroups) {
      map.set(group, allExercises.filter((e) => e.muscleGroup === group).length);
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allExercises.filter(
      (e) =>
        (activeGroup === ALL || e.muscleGroup === activeGroup) &&
        (!q || e.name.toLowerCase().includes(q)),
    );
  }, [activeGroup, query]);

  const selected =
    allExercises.find((e) => e.id === selectedId) ?? allExercises[0];

  const selectExercise = (ex: Exercise) => {
    setSelectedId(ex.id);
    const hasBack = ex.primary.some((m) => BACK_ONLY_MUSCLES.has(m));
    const hasFront = ex.primary.some((m) => !BACK_ONLY_MUSCLES.has(m));
    if (hasBack && !hasFront) setView("back");
    else if (hasFront && !hasBack) setView("front");
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-4 lg:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Exercise Library
          </h2>
          <p className="text-sm text-gray-400">
            Pick a move to see exactly which muscles it targets.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <aside className="order-1 w-full lg:order-2 lg:sticky lg:top-4 lg:w-87.5 lg:shrink-0">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-4">
            <BodyMap
              view={view}
              primary={selected.primary}
              secondary={selected.secondary}
              onViewChange={setView}
              primaryColor={PRIMARY_COLOR}
              secondaryColor={SECONDARY_COLOR}
            />

            <div className="mt-4 space-y-2 border-t border-gray-800 pt-3">
              <div className="flex items-end justify-between gap-2">
                <p className="text-sm font-semibold text-white">
                  {selected.name}
                </p>
                <span className="shrink-0 text-[10px] uppercase tracking-wider text-gray-500">
                  {selected.equipment}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  />
                  <span className="font-medium text-gray-300">Primary</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: SECONDARY_COLOR }}
                  />
                  <span className="font-medium text-gray-300">Secondary</span>
                </span>
              </div>

              {selected.primary.length > 0 && (
                <p className="text-xs text-gray-400">
                  Primary:{" "}
                  <span style={{ color: PRIMARY_COLOR }}>
                    {selected.primary
                      .map((m) => muscleLabels[m] ?? m)
                      .join(", ")}
                  </span>
                </p>
              )}
              {selected.secondary.length > 0 && (
                <p className="text-xs text-gray-400">
                  Secondary:{" "}
                  <span style={{ color: SECONDARY_COLOR }}>
                    {selected.secondary
                      .map((m) => muscleLabels[m] ?? m)
                      .join(", ")}
                  </span>
                </p>
              )}
            </div>
          </div>
        </aside>

        <section className="order-2 w-full min-w-0 flex-1 lg:order-1">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search exercises..."
              className="w-full rounded-xl border border-gray-800 bg-gray-900/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 transition-colors focus:border-lime-300/50 focus:outline-none"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {([ALL, ...allMuscleGroups] as const).map((group) => {
              const active = activeGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setActiveGroup(group)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-lime-300/60 bg-lime-300/10 text-lime-200"
                      : "border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700 hover:text-gray-300"
                  }`}
                >
                  {group}
                  <span className="ml-1 text-[10px] text-gray-500">
                    {counts.get(group)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 space-y-2">
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-800 bg-gray-900/40 p-8 text-center text-sm text-gray-500">
                No exercises match your filters.
              </div>
            ) : (
              filtered.map((ex) => {
                const isSelected = ex.id === selectedId;
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => selectExercise(ex)}
                    aria-pressed={isSelected}
                    className={`w-full rounded-xl border p-3 text-left transition-colors ${
                      isSelected
                        ? "border-lime-300/60 bg-lime-300/10"
                        : "border-gray-800 bg-gray-900/60 hover:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {ex.name}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {ex.equipment} · {ex.muscleGroup}
                        </p>
                      </div>
                      <p
                        className="shrink-0 text-xs"
                        style={{ color: isSelected ? PRIMARY_COLOR : "#8b92a0" }}
                      >
                        {ex.primary.map((m) => muscleLabels[m] ?? m).join(", ")}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
