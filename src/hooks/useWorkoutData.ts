import { useLocalStorage } from "./useLocalStorage";
import { newExerciseTemplate } from "../data/exercises";
import type { WorkoutData, WorkoutSession } from "../types";

export function useWorkoutData() {
  const [data, setData] = useLocalStorage<WorkoutData>("fitness-tracker", {
    exercises: newExerciseTemplate,
    sessions: [],
  });

  const addSession = (session: WorkoutSession) => {
    setData((prev) => ({ ...prev, sessions: [session, ...prev.sessions] }));
  };

  const deleteSession = (id: string) => {
    setData((prev) => ({
      ...prev,
      sessions: prev.sessions.filter((s) => s.id !== id),
    }));
  };

  const getSession = (id: string) => data.sessions.find((s) => s.id === id);

  const getRecentSessions = (count = 5) => data.sessions.slice(0, count);

  const getSessionsByDateRange = (start: string, end: string) =>
    data.sessions.filter((s) => s.date >= start && s.date <= end);

  const getExerciseHistory = (exerciseId: string) => {
    const entries: { date: string; maxWeight: number; volume: number }[] = [];
    for (const session of data.sessions) {
      const exLog = session.exercises.find((e) => e.exerciseId === exerciseId);
      if (exLog && exLog.sets.length > 0) {
        const maxWeight = Math.max(...exLog.sets.map((s) => s.weight));
        const volume = exLog.sets.reduce((sum, s) => sum + s.reps * s.weight, 0);
        entries.push({ date: session.date, maxWeight, volume });
      }
    }
    return entries;
  };

  const getTotalStats = () => {
    let totalWorkouts = data.sessions.length;
    let totalExercises = 0;
    let totalSets = 0;
    let totalVolume = 0;

    for (const session of data.sessions) {
      totalExercises += session.exercises.length;
      for (const ex of session.exercises) {
        for (const set of ex.sets) {
          totalSets++;
          totalVolume += set.reps * set.weight;
        }
      }
    }

    return { totalWorkouts, totalExercises, totalSets, totalVolume };
  };

  const getWorkoutsThisWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const start = startOfWeek.toISOString().split("T")[0];
    return data.sessions.filter((s) => s.date >= start).length;
  };

  return {
    data,
    exercises: data.exercises,
    sessions: data.sessions,
    addSession,
    deleteSession,
    getSession,
    getRecentSessions,
    getSessionsByDateRange,
    getExerciseHistory,
    getTotalStats,
    getWorkoutsThisWeek,
  };
}
