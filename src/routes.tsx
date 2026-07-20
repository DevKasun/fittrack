import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NewWorkout from "./pages/Workouts";
import ExerciseLibrary from "./pages/Exercises";
import Progress from "./pages/Progress";
import History from "./pages/History";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "workouts", element: <NewWorkout /> },
      { path: "exercises", element: <ExerciseLibrary /> },
      { path: "progress", element: <Progress /> },
      { path: "history", element: <History /> },
    ],
  },
]);
