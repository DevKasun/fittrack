import { NavLink, Outlet } from "react-router";

const navItems = [
  { to: "/", label: "Exercises", icon: "💪" },
  { to: "/plans", label: "Workout Plan", icon: "📋" },
];

export function Layout() {
  return (
    <div className="min-h-svh flex flex-col bg-gray-950 text-gray-100">
      <header className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
        <h1 className="text-lg font-bold text-emerald-400">FitTrack</h1>
        <span className="text-xs text-gray-500">Muscle-Focused Fitness</span>
      </header>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 bg-gray-950">
        <ul className="flex justify-around">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 px-6 py-2 text-xs transition-colors ${
                    isActive
                      ? "text-emerald-400"
                      : "text-gray-500 hover:text-gray-300"
                  }`
                }
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}