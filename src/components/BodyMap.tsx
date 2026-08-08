import type { ReactNode } from "react";

export type BodyView = "front" | "back";

type BodyMapProps = {
  view: BodyView;
  primary: string[];
  secondary: string[];
  onViewChange: (view: BodyView) => void;
  primaryColor?: string;
  secondaryColor?: string;
};

const SKIN = "#232833";
const INACTIVE_MUSCLE = "#3b414d";

function MuscleShape({
  muscle,
  children,
  primarySet,
  secondarySet,
  primaryColor,
  secondaryColor,
}: {
  muscle: string;
  children: ReactNode;
  primarySet: Set<string>;
  secondarySet: Set<string>;
  primaryColor: string;
  secondaryColor: string;
}) {
  const isPrimary = primarySet.has(muscle);
  const isSecondary = !isPrimary && secondarySet.has(muscle);
  const active = isPrimary || isSecondary;
  return (
    <g
      data-muscle={muscle}
      fill={active ? (isPrimary ? primaryColor : secondaryColor) : INACTIVE_MUSCLE}
      stroke={active ? "rgba(0,0,0,0.45)" : "none"}
      strokeWidth={active ? 1.2 : 0}
      opacity={active ? 1 : 0.5}
      style={{ transition: "fill 220ms ease, opacity 220ms ease" }}
    >
      {children}
    </g>
  );
}

export function BodyMap({
  view,
  primary,
  secondary,
  onViewChange,
  primaryColor = "#C6FF3D",
  secondaryColor = "#FF8A45",
}: BodyMapProps) {
  const primarySet = new Set(primary);
  const secondarySet = new Set(secondary);

  const muscleProps = { primarySet, secondarySet, primaryColor, secondaryColor };

  const silhouette = (
    <>
      <ellipse cx={120} cy={30} rx={24} ry={26} fill={SKIN} />
      <rect x={107} y={56} width={26} height={17} rx={6} fill={SKIN} />
      <path d="M70,86 Q120,72 170,86 L180,206 Q120,252 60,206 Z" fill={SKIN} />
      <path d="M56,95 L41,160" stroke={SKIN} strokeWidth={27} strokeLinecap="round" />
      <path d="M41,160 L29,250" stroke={SKIN} strokeWidth={22} strokeLinecap="round" />
      <path d="M184,95 L199,160" stroke={SKIN} strokeWidth={27} strokeLinecap="round" />
      <path d="M199,160 L211,250" stroke={SKIN} strokeWidth={22} strokeLinecap="round" />
      <ellipse cx={26} cy={258} rx={10} ry={12} fill={SKIN} />
      <ellipse cx={214} cy={258} rx={10} ry={12} fill={SKIN} />
      <path d="M97,292 L97,400" stroke={SKIN} strokeWidth={50} strokeLinecap="round" />
      <path d="M97,400 L98,470" stroke={SKIN} strokeWidth={36} strokeLinecap="round" />
      <path d="M143,292 L143,400" stroke={SKIN} strokeWidth={50} strokeLinecap="round" />
      <path d="M143,400 L142,470" stroke={SKIN} strokeWidth={36} strokeLinecap="round" />
      <path d="M86,262 Q120,280 154,262 L147,302 Q120,314 93,302 Z" fill={SKIN} />
      <ellipse cx={96} cy={502} rx={13} ry={9} fill={SKIN} />
      <ellipse cx={144} cy={502} rx={13} ry={9} fill={SKIN} />
    </>
  );

  const frontMuscles = (
    <>
      <MuscleShape muscle="shoulders" {...muscleProps}>
        <ellipse cx={58} cy={98} rx={18} ry={23} />
        <ellipse cx={182} cy={98} rx={18} ry={23} />
      </MuscleShape>
      <MuscleShape muscle="chest" {...muscleProps}>
        <ellipse cx={99} cy={118} rx={26} ry={20} />
        <ellipse cx={141} cy={118} rx={26} ry={20} />
      </MuscleShape>
      <MuscleShape muscle="biceps" {...muscleProps}>
        <ellipse cx={47} cy={154} rx={14} ry={33} />
        <ellipse cx={193} cy={154} rx={14} ry={33} />
      </MuscleShape>
      <MuscleShape muscle="forearms" {...muscleProps}>
        <ellipse cx={38} cy={216} rx={13} ry={34} />
        <ellipse cx={202} cy={216} rx={13} ry={34} />
      </MuscleShape>
      <MuscleShape muscle="abs" {...muscleProps}>
        <rect x={98} y={150} width={44} height={69} rx={10} />
      </MuscleShape>
      <MuscleShape muscle="obliques" {...muscleProps}>
        <rect x={76} y={158} width={22} height={58} rx={8} />
        <rect x={145} y={158} width={22} height={58} rx={8} />
      </MuscleShape>
      <MuscleShape muscle="quads" {...muscleProps}>
        <ellipse cx={97} cy={345} rx={26} ry={48} />
        <ellipse cx={143} cy={345} rx={26} ry={48} />
      </MuscleShape>
      <MuscleShape muscle="calves" {...muscleProps}>
        <ellipse cx={97} cy={452} rx={20} ry={40} />
        <ellipse cx={143} cy={452} rx={20} ry={40} />
      </MuscleShape>
    </>
  );

  const backMuscles = (
    <>
      <MuscleShape muscle="traps" {...muscleProps}>
        <path d="M77,78 L120,78 L160,112 L120,126 L80,112 Z" />
      </MuscleShape>
      <MuscleShape muscle="shoulders" {...muscleProps}>
        <ellipse cx={58} cy={98} rx={18} ry={23} />
        <ellipse cx={182} cy={98} rx={18} ry={23} />
      </MuscleShape>
      <MuscleShape muscle="lats" {...muscleProps}>
        <path d="M78,112 Q62,160 62,206 L96,206 L98,116 Z" />
        <path d="M162,112 Q178,160 178,206 L144,206 L142,116 Z" />
      </MuscleShape>
      <MuscleShape muscle="triceps" {...muscleProps}>
        <ellipse cx={47} cy={154} rx={14} ry={33} />
        <ellipse cx={193} cy={154} rx={14} ry={33} />
      </MuscleShape>
      <MuscleShape muscle="forearms" {...muscleProps}>
        <ellipse cx={38} cy={216} rx={13} ry={34} />
        <ellipse cx={202} cy={216} rx={13} ry={34} />
      </MuscleShape>
      <MuscleShape muscle="lowerback" {...muscleProps}>
        <rect x={102} y={212} width={36} height={46} rx={8} />
      </MuscleShape>
      <MuscleShape muscle="glutes" {...muscleProps}>
        <ellipse cx={97} cy={294} rx={25} ry={26} />
        <ellipse cx={143} cy={294} rx={25} ry={26} />
      </MuscleShape>
      <MuscleShape muscle="hamstrings" {...muscleProps}>
        <ellipse cx={97} cy={355} rx={26} ry={46} />
        <ellipse cx={143} cy={355} rx={26} ry={46} />
      </MuscleShape>
      <MuscleShape muscle="calves" {...muscleProps}>
        <ellipse cx={97} cy={452} rx={20} ry={40} />
        <ellipse cx={143} cy={452} rx={20} ry={40} />
      </MuscleShape>
    </>
  );

  return (
    <div>
      <div role="tablist" aria-label="Body view" className="mb-4 grid grid-cols-2 gap-1 rounded-lg border border-gray-800 bg-gray-950/60 p-1">
        {(["front", "back"] as const).map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={view === v}
            onClick={() => onViewChange(v)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              view === v ? "bg-gray-800 text-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="mx-auto w-full max-w-[230px]">
        <svg viewBox="0 0 240 520" role="img" aria-label={`${view} muscle map`} className="block h-auto w-full select-none">
          {silhouette}
          {view === "front" ? frontMuscles : backMuscles}
        </svg>
      </div>
    </div>
  );
}