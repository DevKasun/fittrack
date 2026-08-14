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
      <ellipse cx={120} cy={27} rx={19} ry={22} fill={SKIN} />
      <path d="M110,42 L130,42 L132,56 Q120,61 108,56 Z" fill={SKIN} />

      <path
        d="M80,188 C73,206 73,230 82,250 C89,264 103,272 120,272
           C137,272 151,264 158,250 C167,230 167,206 160,188 Z"
        fill={SKIN}
      />
      <path
        d="M63,82 C88,66 152,66 177,82 C187,100 185,124 177,146
           C172,162 165,177 155,188 C146,195 134,199 120,199
           C106,199 94,195 85,188 C75,177 68,162 63,146
           C55,124 53,100 63,82 Z"
        fill={SKIN}
      />

      <path
        d="M40,79 Q27,90 26,112 Q25,132 22,152 Q19,172 19,192 Q19,210 22,224
           Q25,236 36,238 Q44,238 47,228 Q49,214 47,198 Q45,178 48,160
           Q51,146 50,132 Q54,112 60,96 Q63,88 58,82 Q50,77 40,79 Z"
        fill={SKIN}
      />
      <path
        d="M200,79 Q213,90 214,112 Q215,132 218,152 Q221,172 221,192 Q221,210 218,224
           Q215,236 204,238 Q196,238 193,228 Q191,214 193,198 Q195,178 192,160
           Q189,146 190,132 Q186,112 180,96 Q177,88 182,82 Q190,77 200,79 Z"
        fill={SKIN}
      />

      <path
        d="M95,264 Q80,278 78,306 Q76,332 82,358 Q87,380 96,398
           Q90,412 89,432 Q88,452 93,470 Q97,484 106,486 Q114,486 116,474
           Q119,452 117,428 Q116,404 119,382 Q123,352 120,322
           Q118,298 111,278 Q107,266 95,264 Z"
        fill={SKIN}
      />
      <ellipse cx={100} cy={500} rx={15} ry={9} fill={SKIN} />
      <path
        d="M145,264 Q160,278 162,306 Q164,332 158,358 Q153,380 144,398
           Q150,412 151,432 Q152,452 147,470 Q143,484 134,486 Q126,486 124,474
           Q121,452 123,428 Q124,404 121,382 Q117,352 120,322
           Q122,298 129,278 Q133,266 145,264 Z"
        fill={SKIN}
      />
      <ellipse cx={140} cy={500} rx={15} ry={9} fill={SKIN} />
    </>
  );

  const frontMuscles = (
    <>
      <MuscleShape muscle="shoulders" {...muscleProps}>
        <ellipse cx={40} cy={97} rx={12} ry={14} />
        <ellipse cx={200} cy={97} rx={12} ry={14} />
      </MuscleShape>
      <MuscleShape muscle="chest" {...muscleProps}>
        <ellipse cx={99} cy={115} rx={23} ry={17} />
        <ellipse cx={141} cy={115} rx={23} ry={17} />
      </MuscleShape>
      <MuscleShape muscle="biceps" {...muscleProps}>
        <ellipse cx={33} cy={140} rx={11} ry={27} />
        <ellipse cx={207} cy={140} rx={11} ry={27} />
      </MuscleShape>
      <MuscleShape muscle="forearms" {...muscleProps}>
        <ellipse cx={30} cy={200} rx={10} ry={24} />
        <ellipse cx={210} cy={200} rx={10} ry={24} />
      </MuscleShape>
      <MuscleShape muscle="abs" {...muscleProps}>
        <rect x={99} y={150} width={42} height={42} rx={10} />
      </MuscleShape>
      <MuscleShape muscle="obliques" {...muscleProps}>
        <rect x={79} y={156} width={18} height={34} rx={7} />
        <rect x={143} y={156} width={18} height={34} rx={7} />
      </MuscleShape>
      <MuscleShape muscle="quads" {...muscleProps}>
        <ellipse cx={98} cy={335} rx={19} ry={48} />
        <ellipse cx={142} cy={335} rx={19} ry={48} />
      </MuscleShape>
      <MuscleShape muscle="calves" {...muscleProps}>
        <ellipse cx={104} cy={448} rx={13} ry={31} />
        <ellipse cx={136} cy={448} rx={13} ry={31} />
      </MuscleShape>
    </>
  );

  const backMuscles = (
    <>
      <MuscleShape muscle="traps" {...muscleProps}>
        <path d="M85,68 L120,66 L156,88 L120,100 L86,88 Z" />
      </MuscleShape>
      <MuscleShape muscle="shoulders" {...muscleProps}>
        <ellipse cx={40} cy={97} rx={12} ry={14} />
        <ellipse cx={200} cy={97} rx={12} ry={14} />
      </MuscleShape>
      <MuscleShape muscle="lats" {...muscleProps}>
        <path d="M84,92 C72,120 70,155 78,185 L100,185 L96,96 Z" />
        <path d="M156,92 C168,120 170,155 162,185 L140,185 L144,96 Z" />
      </MuscleShape>
      <MuscleShape muscle="triceps" {...muscleProps}>
        <ellipse cx={33} cy={140} rx={11} ry={27} />
        <ellipse cx={207} cy={140} rx={11} ry={27} />
      </MuscleShape>
      <MuscleShape muscle="forearms" {...muscleProps}>
        <ellipse cx={30} cy={200} rx={10} ry={24} />
        <ellipse cx={210} cy={200} rx={10} ry={24} />
      </MuscleShape>
      <MuscleShape muscle="lowerback" {...muscleProps}>
        <rect x={100} y={192} width={40} height={42} rx={9} />
      </MuscleShape>
      <MuscleShape muscle="glutes" {...muscleProps}>
        <ellipse cx={98} cy={245} rx={22} ry={22} />
        <ellipse cx={142} cy={245} rx={22} ry={22} />
      </MuscleShape>
      <MuscleShape muscle="hamstrings" {...muscleProps}>
        <ellipse cx={98} cy={335} rx={19} ry={48} />
        <ellipse cx={142} cy={335} rx={19} ry={48} />
      </MuscleShape>
      <MuscleShape muscle="calves" {...muscleProps}>
        <ellipse cx={104} cy={448} rx={13} ry={31} />
        <ellipse cx={136} cy={448} rx={13} ry={31} />
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