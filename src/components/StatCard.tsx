type StatCardProps = {
  label: string;
  value: string | number;
  icon?: string;
};

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
      {icon && <span className="text-2xl">{icon}</span>}
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}
