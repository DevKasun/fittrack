import { Link } from "react-router";
import { useWorkoutData } from "../../hooks/useWorkoutData";

export default function History() {
  const { sessions, exercises, deleteSession } = useWorkoutData();

  const getExName = (id: string) => exercises.find((e) => e.id === id)?.name ?? id;

  const groupByMonth = () => {
    const groups: Record<string, typeof sessions> = {};
    for (const s of sessions) {
      const key = new Date(s.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
      if (!groups[key]) groups[key] = [];
      groups[key].push(s);
    }
    return groups;
  };

  const grouped = groupByMonth();

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-bold">Workout History</h2>
        <p className="text-sm text-gray-400">{sessions.length} total sessions</p>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-3">📅</p>
          <p className="font-medium">No workouts logged yet</p>
          <Link to="/workouts" className="text-emerald-400 text-sm underline mt-1 inline-block">
            Log your first workout
          </Link>
        </div>
      ) : (
        Object.entries(grouped).map(([month, monthSessions]) => (
          <section key={month}>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {month}
            </h3>
            <div className="space-y-2">
              {monthSessions.map((s) => (
                <div
                  key={s.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-white">{s.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(s.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        · {s.duration > 0 ? `${s.duration} min` : "Duration not logged"}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteSession(s.id)}
                      className="text-gray-600 hover:text-red-400 text-sm transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-2 space-y-1">
                    {s.exercises.map((ex) => {
                      const totalVolume = ex.sets.reduce((sum, set) => sum + set.reps * set.weight, 0);
                      return (
                        <div
                          key={ex.exerciseId}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-300">{getExName(ex.exerciseId)}</span>
                          <span className="text-gray-500 text-xs">
                            {ex.sets.length} sets · {totalVolume.toLocaleString()} kg
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
