import { useState } from "react";
import { useNavigate } from "react-router";
import { useWorkoutData } from "../../hooks/useWorkoutData";
import { ExerciseSelector } from "../../components/ExerciseSelector";
import type { SetLog } from "../../types";

export default function NewWorkout() {
  const navigate = useNavigate();
  const { exercises, addSession } = useWorkoutData();
  const [name, setName] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [step, setStep] = useState<"select" | "log">("select");
  const [logs, setLogs] = useState<Record<string, SetLog[]>>({});

  const toggleExercise = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    setLogs((prev) => {
      if (prev[id]) return prev;
      return { ...prev, [id]: [{ id: crypto.randomUUID(), reps: 10, weight: 0 }] };
    });
  };

  const addSet = (exId: string) => {
    setLogs((prev) => ({
      ...prev,
      [exId]: [...(prev[exId] || []), { id: crypto.randomUUID(), reps: 10, weight: 0 }],
    }));
  };

  const removeSet = (exId: string, setId: string) => {
    setLogs((prev) => ({
      ...prev,
      [exId]: prev[exId].filter((s) => s.id !== setId),
    }));
  };

  const updateSet = (exId: string, setId: string, field: "reps" | "weight", value: number) => {
    setLogs((prev) => ({
      ...prev,
      [exId]: prev[exId].map((s) => (s.id === setId ? { ...s, [field]: value } : s)),
    }));
  };

  const handleSubmit = () => {
    if (!name.trim() || selectedIds.length === 0) return;

    const exerciseLogs = selectedIds
      .filter((id) => (logs[id]?.length ?? 0) > 0)
      .map((id) => ({
        exerciseId: id,
        sets: logs[id] || [],
      }));

    addSession({
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      name: name.trim(),
      duration: 0,
      exercises: exerciseLogs,
    });

    navigate("/");
  };

  const getExName = (id: string) => exercises.find((e) => e.id === id)?.name ?? id;

  if (step === "select") {
    return (
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-xl font-bold">New Workout</h2>
          <p className="text-sm text-gray-400">Select exercises to include</p>
        </div>

        <input
          type="text"
          placeholder="Workout name (e.g. Push Day)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
        />

        <ExerciseSelector
          exercises={exercises}
          selectedIds={selectedIds}
          onToggle={toggleExercise}
        />

        <button
          onClick={() => setStep("log")}
          disabled={selectedIds.length === 0 || !name.trim()}
          className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-400 transition-colors"
        >
          Log Sets ({selectedIds.length} exercises)
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-sm text-gray-400">Log your sets</p>
        </div>
        <button
          onClick={() => setStep("select")}
          className="text-sm text-gray-400 hover:text-white"
        >
          Change exercises
        </button>
      </div>

      <div className="space-y-4">
        {selectedIds.map((exId) => (
          <div key={exId} className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <h3 className="font-medium text-white mb-2">{getExName(exId)}</h3>

            <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-xs text-gray-400 mb-1 px-2">
              <span>Reps</span>
              <span>Weight (kg)</span>
              <span />
            </div>

            {(logs[exId] || []).map((set) => (
              <div key={set.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-1">
                <input
                  type="number"
                  min={1}
                  value={set.reps}
                  onChange={(e) => updateSet(exId, set.id, "reps", Number(e.target.value))}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={set.weight}
                  onChange={(e) => updateSet(exId, set.id, "weight", Number(e.target.value))}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => removeSet(exId, set.id)}
                  className="text-red-500 hover:text-red-400 px-2 py-2 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              onClick={() => addSet(exId)}
              className="w-full mt-2 border border-dashed border-gray-700 rounded-lg py-2 text-sm text-gray-500 hover:text-emerald-400 hover:border-emerald-500 transition-colors"
            >
              + Add Set
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-400 transition-colors"
      >
        Save Workout
      </button>
    </div>
  );
}
