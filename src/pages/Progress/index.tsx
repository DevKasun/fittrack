import { useState } from "react";
import { useWorkoutData } from "../../hooks/useWorkoutData";

export default function Progress() {
  const { exercises, getExerciseHistory } = useWorkoutData();
  const [selectedId, setSelectedId] = useState(exercises[0]?.id ?? "");

  const history = getExerciseHistory(selectedId);
  const ex = exercises.find((e) => e.id === selectedId);

  const maxWeight = history.length > 0 ? Math.max(...history.map((h) => h.maxWeight)) : 0;
  const maxVolume = history.length > 0 ? Math.max(...history.map((h) => h.volume)) : 0;

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold">Progress</h2>
        <p className="text-sm text-gray-400">Track strength gains over time</p>
      </div>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
      >
        {exercises.map((ex) => (
          <option key={ex.id} value={ex.id}>
            {ex.name}
          </option>
        ))}
      </select>

      {history.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-3">📈</p>
          <p className="font-medium">No data yet</p>
          <p className="text-sm">Log workouts with {ex?.name} to see progress</p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Max Weight Over Time
            </h3>
            <div className="flex items-end gap-1 h-32">
              {history.map((h, i) => {
                const pct = maxWeight > 0 ? (h.maxWeight / maxWeight) * 100 : 0;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-500">{h.maxWeight}</span>
                    <div
                      className="w-full bg-emerald-500 rounded-t transition-all"
                      style={{ height: `${Math.max(pct, 4)}%` }}
                    />
                    <span className="text-[10px] text-gray-600 truncate w-full text-center">
                      {new Date(h.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Total Volume Over Time
            </h3>
            <div className="flex items-end gap-1 h-32">
              {history.map((h, i) => {
                const pct = maxVolume > 0 ? (h.volume / maxVolume) * 100 : 0;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-500">{h.volume}</span>
                    <div
                      className="w-full bg-blue-500 rounded-t transition-all"
                      style={{ height: `${Math.max(pct, 4)}%` }}
                    />
                    <span className="text-[10px] text-gray-600 truncate w-full text-center">
                      {new Date(h.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Session Log
            </h3>
            <div className="space-y-1">
              {history.toReversed().map((h, i) => (
                <div key={i} className="flex justify-between text-sm py-1">
                  <span className="text-gray-400">
                    {new Date(h.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-white">
                    {h.maxWeight} kg · {h.volume} kg volume
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
