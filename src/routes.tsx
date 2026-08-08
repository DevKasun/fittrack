import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import ExerciseLibrary from "./pages/Exercises";
import WorkoutPlanner from "./pages/Plans";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ExerciseLibrary /> },
      { path: "plans", element: <WorkoutPlanner /> },
    ],
  },
]);