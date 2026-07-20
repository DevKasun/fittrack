import { useWorkoutData } from "../../hooks/useWorkoutData";
import { StatCard } from "../../components/StatCard";
import { Link } from "react-router";

export default function Dashboard() {
  const { getTotalStats, getWorkoutsThisWeek, sessions, exercises } = useWorkoutData();
  const stats = getTotalStats();
  const weekCount = getWorkoutsThisWeek();
  const recent = sessions.slice(0, 5);

  const getExName = (id: string) => exercises.find((e) => e.id === id)?.name ?? id;

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-sm text-gray-400">Your fitness at a glance</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon="💪" label="Total Workouts" value={stats.totalWorkouts} />
        <StatCard icon="📊" label="Total Volume (kg)" value={stats.totalVolume.toLocaleString()} />
        <StatCard icon="🔁" label="Sets Done" value={stats.totalSets} />
        <StatCard icon="📅" label="This Week" value={weekCount} />
      </div>

      {recent.length > 0 ? (
        <section>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Recent Workouts
          </h3>
          <div className="space-y-2">
            {recent.map((s) => (
              <Link
                key={s.id}
                to={`/history/${s.id}`}
                className="block bg-gray-900 border border-gray-800 rounded-xl p-3 hover:border-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-white">{s.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(s.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      · {s.duration} min
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {s.exercises.length} exercises
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {s.exercises.slice(0, 4).map((ex) => (
                    <span
                      key={ex.exerciseId}
                      className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-400"
                    >
                      {getExName(ex.exerciseId)}
                    </span>
                  ))}
                  {s.exercises.length > 4 && (
                    <span className="text-xs text-gray-600 px-2 py-0.5">
                      +{s.exercises.length - 4} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-3">🏋️</p>
          <p className="font-medium">No workouts yet</p>
          <p className="text-sm mb-4">Log your first workout to get started</p>
          <Link
            to="/workouts"
            className="inline-block bg-emerald-500 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-emerald-400 transition-colors"
          >
            Start Workout
          </Link>
        </div>
      )}
    </div>
  );
}
