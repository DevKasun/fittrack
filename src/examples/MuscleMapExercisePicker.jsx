import React, { useState, useMemo } from "react";
import { Search, Dumbbell, RotateCcw } from "lucide-react";

/* ---------------------------------------------------------
   DESIGN TOKENS
--------------------------------------------------------- */
const tokens = {
  bg: "#14171C",
  surface: "#1C2028",
  surfaceAlt: "#232833",
  border: "#2A2F39",
  text: "#F3F4F6",
  textMuted: "#8B92A0",
  primary: "#C6FF3D", // primary muscle highlight (volt)
  secondary: "#FF8A45", // secondary muscle highlight (ember)
  neutralMuscle: "#33394480", // unselected muscle fill
};

/* ---------------------------------------------------------
   EXERCISE DATA
   muscles keys: chest, shoulders, biceps, triceps, forearms,
   abs, obliques, quads, hamstrings, calves, glutes, lats,
   traps, lowerback
--------------------------------------------------------- */
const EXERCISES = [
  { id: "bench_press", name: "Barbell Bench Press", muscleGroup: "Chest", equipment: "Barbell", primary: ["chest"], secondary: ["shoulders", "triceps"] },
  { id: "incline_db_press", name: "Incline Dumbbell Press", muscleGroup: "Chest", equipment: "Dumbbell", primary: ["chest"], secondary: ["shoulders"] },
  { id: "pushup", name: "Push-Up", muscleGroup: "Chest", equipment: "Bodyweight", primary: ["chest"], secondary: ["shoulders", "triceps", "abs"] },
  { id: "dips", name: "Parallel Bar Dips", muscleGroup: "Chest", equipment: "Bodyweight", primary: ["chest", "triceps"], secondary: ["shoulders"] },
  { id: "pullup", name: "Pull-Up", muscleGroup: "Back", equipment: "Bodyweight", primary: ["lats"], secondary: ["biceps", "traps"] },
  { id: "barbell_row", name: "Barbell Row", muscleGroup: "Back", equipment: "Barbell", primary: ["lats"], secondary: ["biceps", "lowerback", "traps"] },
  { id: "lat_pulldown", name: "Lat Pulldown", muscleGroup: "Back", equipment: "Machine", primary: ["lats"], secondary: ["biceps"] },
  { id: "face_pull", name: "Face Pull", muscleGroup: "Back", equipment: "Cable", primary: ["traps"], secondary: ["shoulders"] },
  { id: "hyperextension", name: "Back Hyperextension", muscleGroup: "Back", equipment: "Bodyweight", primary: ["lowerback"], secondary: ["glutes", "hamstrings"] },
  { id: "overhead_press", name: "Overhead Press", muscleGroup: "Shoulders", equipment: "Barbell", primary: ["shoulders"], secondary: ["triceps", "traps"] },
  { id: "lateral_raise", name: "Lateral Raise", muscleGroup: "Shoulders", equipment: "Dumbbell", primary: ["shoulders"], secondary: [] },
  { id: "rear_delt_fly", name: "Rear Delt Fly", muscleGroup: "Shoulders", equipment: "Dumbbell", primary: ["shoulders"], secondary: ["traps"] },
  { id: "bicep_curl", name: "Dumbbell Bicep Curl", muscleGroup: "Arms", equipment: "Dumbbell", primary: ["biceps"], secondary: ["forearms"] },
  { id: "tricep_pushdown", name: "Tricep Pushdown", muscleGroup: "Arms", equipment: "Cable", primary: ["triceps"], secondary: ["forearms"] },
  { id: "hammer_curl", name: "Hammer Curl", muscleGroup: "Arms", equipment: "Dumbbell", primary: ["biceps"], secondary: ["forearms"] },
  { id: "wrist_curl", name: "Wrist Curl", muscleGroup: "Arms", equipment: "Dumbbell", primary: ["forearms"], secondary: [] },
  { id: "plank", name: "Plank", muscleGroup: "Core/Abs", equipment: "Bodyweight", primary: ["abs"], secondary: ["obliques", "lowerback"] },
  { id: "crunch", name: "Crunch", muscleGroup: "Core/Abs", equipment: "Bodyweight", primary: ["abs"], secondary: [] },
  { id: "russian_twist", name: "Russian Twist", muscleGroup: "Core/Abs", equipment: "Bodyweight", primary: ["obliques"], secondary: ["abs"] },
  { id: "hanging_raise", name: "Hanging Leg Raise", muscleGroup: "Core/Abs", equipment: "Bodyweight", primary: ["abs"], secondary: ["obliques"] },
  { id: "squat", name: "Barbell Squat", muscleGroup: "Legs", equipment: "Barbell", primary: ["quads"], secondary: ["glutes", "hamstrings", "lowerback"] },
  { id: "lunge", name: "Walking Lunge", muscleGroup: "Legs", equipment: "Dumbbell", primary: ["quads", "glutes"], secondary: ["hamstrings"] },
  { id: "leg_press", name: "Leg Press", muscleGroup: "Legs", equipment: "Machine", primary: ["quads"], secondary: ["glutes", "hamstrings"] },
  { id: "romanian_dl", name: "Romanian Deadlift", muscleGroup: "Legs", equipment: "Barbell", primary: ["hamstrings"], secondary: ["glutes", "lowerback"] },
  { id: "calf_raise", name: "Standing Calf Raise", muscleGroup: "Legs", equipment: "Machine", primary: ["calves"], secondary: [] },
  { id: "hip_thrust", name: "Barbell Hip Thrust", muscleGroup: "Legs", equipment: "Barbell", primary: ["glutes"], secondary: ["hamstrings"] },
  { id: "deadlift", name: "Deadlift", muscleGroup: "Full Body/Compound", equipment: "Barbell", primary: ["hamstrings", "lowerback"], secondary: ["glutes", "lats", "traps", "forearms"] },
  { id: "burpee", name: "Burpee", muscleGroup: "Full Body/Compound", equipment: "Bodyweight", primary: ["chest", "quads"], secondary: ["shoulders", "abs", "calves"] },
  { id: "kb_swing", name: "Kettlebell Swing", muscleGroup: "Full Body/Compound", equipment: "Kettlebell", primary: ["glutes", "hamstrings"], secondary: ["lowerback", "shoulders"] },
  { id: "clean_and_press", name: "Clean and Press", muscleGroup: "Full Body/Compound", equipment: "Barbell", primary: ["shoulders", "quads"], secondary: ["traps", "hamstrings", "lowerback", "abs"] },
];

const CATEGORIES = ["All", "Chest", "Back", "Shoulders", "Arms", "Core/Abs", "Legs", "Full Body/Compound"];

const MUSCLE_LABELS = {
  chest: "Chest", shoulders: "Shoulders", biceps: "Biceps", triceps: "Triceps",
  forearms: "Forearms", abs: "Abs", obliques: "Obliques", quads: "Quads",
  hamstrings: "Hamstrings", calves: "Calves", glutes: "Glutes", lats: "Lats",
  traps: "Traps", lowerback: "Lower back",
};

// Which muscles belong to which view (for auto-switching)
const BACK_ONLY = new Set(["lats", "glutes", "hamstrings", "lowerback", "triceps", "traps"]);

/* ---------------------------------------------------------
   BODY MAP SVG (front + back, simplified anatomical regions)
--------------------------------------------------------- */
function MuscleShape({ id, d, cx, cy, rx, ry, x, y, width, height, rxCorner, activeSet, secondarySet }) {
  const isPrimary = activeSet.has(id);
  const isSecondary = !isPrimary && secondarySet.has(id);
  const fill = isPrimary ? tokens.primary : isSecondary ? tokens.secondary : tokens.neutralMuscle;
  const stroke = isPrimary || isSecondary ? "#0000004D" : "#00000000";
  const common = {
    fill,
    stroke,
    strokeWidth: 1,
    style: { transition: "fill 220ms ease" },
  };
  if (d) return <path d={d} {...common} />;
  if (cx !== undefined) return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} {...common} />;
  return <rect x={x} y={y} width={width} height={height} rx={rxCorner || 8} {...common} />;
}

function BodyMap({ view, activeSet, secondarySet }) {
  const skin = "#3A404C";
  const stroke = "#00000000";

  const Head = <ellipse cx={120} cy={36} rx={24} ry={26} fill={skin} />;
  const Neck = <rect x={107} y={56} width={26} height={20} rx={6} fill={skin} />;
  const Pelvis = <path d="M85,268 Q120,282 155,268 L150,300 Q120,310 90,300 Z" fill={skin} />;
  const Hands = (
    <>
      <ellipse cx={30} cy={258} rx={9} ry={12} fill={skin} />
      <ellipse cx={210} cy={258} rx={9} ry={12} fill={skin} />
    </>
  );
  const Feet = (
    <>
      <ellipse cx={90} cy={505} rx={12} ry={8} fill={skin} />
      <ellipse cx={150} cy={505} rx={12} ry={8} fill={skin} />
    </>
  );

  if (view === "front") {
    return (
      <svg viewBox="0 0 240 520" width="100%" height="100%">
        {Head}{Neck}
        {/* torso silhouette base */}
        <path d="M70,86 Q120,72 170,86 L178,215 Q120,240 62,215 Z" fill={skin} />
        {Pelvis}
        {/* shoulders */}
        <MuscleShape id="shoulders" cx={55} cy={98} rx={20} ry={24} activeSet={activeSet} secondarySet={secondarySet} />
        <MuscleShape id="shoulders" cx={185} cy={98} rx={20} ry={24} activeSet={activeSet} secondarySet={secondarySet} />
        {/* chest */}
        <MuscleShape id="chest" cx={98} cy={118} rx={26} ry={20} activeSet={activeSet} secondarySet={secondarySet} />
        <MuscleShape id="chest" cx={142} cy={118} rx={26} ry={20} activeSet={activeSet} secondarySet={secondarySet} />
        {/* biceps */}
        <MuscleShape id="biceps" cx={45} cy={155} rx={15} ry={32} activeSet={activeSet} secondarySet={secondarySet} />
        <MuscleShape id="biceps" cx={195} cy={155} rx={15} ry={32} activeSet={activeSet} secondarySet={secondarySet} />
        {/* forearms */}
        <MuscleShape id="forearms" cx={38} cy={218} rx={12} ry={34} activeSet={activeSet} secondarySet={secondarySet} />
        <MuscleShape id="forearms" cx={202} cy={218} rx={12} ry={34} activeSet={activeSet} secondarySet={secondarySet} />
        {Hands}
        {/* abs */}
        <MuscleShape id="abs" x={98} y={150} width={44} height={68} rxCorner={10} activeSet={activeSet} secondarySet={secondarySet} />
        {/* obliques */}
        <MuscleShape id="obliques" x={74} y={158} width={20} height={58} rxCorner={8} activeSet={activeSet} secondarySet={secondarySet} />
        <MuscleShape id="obliques" x={146} y={158} width={20} height={58} rxCorner={8} activeSet={activeSet} secondarySet={secondarySet} />
        {/* quads */}
        <MuscleShape id="quads" cx={95} cy={335} rx={28} ry={52} activeSet={activeSet} secondarySet={secondarySet} />
        <MuscleShape id="quads" cx={145} cy={335} rx={28} ry={52} activeSet={activeSet} secondarySet={secondarySet} />
        {/* calves front */}
        <MuscleShape id="calves" cx={90} cy={445} rx={15} ry={40} activeSet={activeSet} secondarySet={secondarySet} />
        <MuscleShape id="calves" cx={150} cy={445} rx={15} ry={40} activeSet={activeSet} secondarySet={secondarySet} />
        {Feet}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 520" width="100%" height="100%">
      {Head}{Neck}
      <path d="M70,86 Q120,72 170,86 L178,215 Q120,240 62,215 Z" fill={skin} />
      {Pelvis}
      {/* traps */}
      <MuscleShape id="traps" d="M95,70 L145,70 L165,110 L120,120 L75,110 Z" activeSet={activeSet} secondarySet={secondarySet} />
      {/* rear delts */}
      <MuscleShape id="shoulders" cx={55} cy={98} rx={20} ry={24} activeSet={activeSet} secondarySet={secondarySet} />
      <MuscleShape id="shoulders" cx={185} cy={98} rx={20} ry={24} activeSet={activeSet} secondarySet={secondarySet} />
      {/* lats */}
      <MuscleShape id="lats" d="M78,110 Q65,160 82,205 L110,190 L100,115 Z" activeSet={activeSet} secondarySet={secondarySet} />
      <MuscleShape id="lats" d="M162,110 Q175,160 158,205 L130,190 L140,115 Z" activeSet={activeSet} secondarySet={secondarySet} />
      {/* triceps */}
      <MuscleShape id="triceps" cx={45} cy={155} rx={15} ry={32} activeSet={activeSet} secondarySet={secondarySet} />
      <MuscleShape id="triceps" cx={195} cy={155} rx={15} ry={32} activeSet={activeSet} secondarySet={secondarySet} />
      {/* forearms */}
      <MuscleShape id="forearms" cx={38} cy={218} rx={12} ry={34} activeSet={activeSet} secondarySet={secondarySet} />
      <MuscleShape id="forearms" cx={202} cy={218} rx={12} ry={34} activeSet={activeSet} secondarySet={secondarySet} />
      {Hands}
      {/* lower back */}
      <MuscleShape id="lowerback" x={100} y={210} width={40} height={50} rxCorner={10} activeSet={activeSet} secondarySet={secondarySet} />
      {/* glutes */}
      <MuscleShape id="glutes" cx={95} cy={288} rx={27} ry={28} activeSet={activeSet} secondarySet={secondarySet} />
      <MuscleShape id="glutes" cx={145} cy={288} rx={27} ry={28} activeSet={activeSet} secondarySet={secondarySet} />
      {/* hamstrings */}
      <MuscleShape id="hamstrings" cx={95} cy={350} rx={27} ry={48} activeSet={activeSet} secondarySet={secondarySet} />
      <MuscleShape id="hamstrings" cx={145} cy={350} rx={27} ry={48} activeSet={activeSet} secondarySet={secondarySet} />
      {/* calves back */}
      <MuscleShape id="calves" cx={90} cy={445} rx={15} ry={40} activeSet={activeSet} secondarySet={secondarySet} />
      <MuscleShape id="calves" cx={150} cy={445} rx={15} ry={40} activeSet={activeSet} secondarySet={secondarySet} />
      {Feet}
    </svg>
  );
}

/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */
export default function MuscleMapExercisePicker() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(EXERCISES[0].id);
  const [view, setView] = useState("front");

  const filtered = useMemo(() => {
    return EXERCISES.filter((e) => {
      const catOk = category === "All" || e.muscleGroup === category;
      const qOk = e.name.toLowerCase().includes(query.toLowerCase());
      return catOk && qOk;
    });
  }, [category, query]);

  const selected = EXERCISES.find((e) => e.id === selectedId) || EXERCISES[0];
  const primarySet = new Set(selected.primary);
  const secondarySet = new Set(selected.secondary);

  const selectExercise = (ex) => {
    setSelectedId(ex.id);
    const allMuscles = [...ex.primary, ...ex.secondary];
    const shouldBeBack = allMuscles.some((m) => BACK_ONLY.has(m));
    const shouldBeFront = allMuscles.some((m) => !BACK_ONLY.has(m));
    if (shouldBeBack && !shouldBeFront) setView("back");
    else if (shouldBeFront && !shouldBeBack) setView("front");
  };

  return (
    <div style={{ background: tokens.bg, color: tokens.text, fontFamily: "'Inter', sans-serif", padding: "28px", borderRadius: 16, minHeight: 640 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        .display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.03em; }
        .chip { transition: all 150ms ease; cursor: pointer; }
        .card { transition: all 150ms ease; cursor: pointer; }
        .card:hover { border-color: ${tokens.primary}66 !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${tokens.border}; border-radius: 4px; }
      `}</style>

      <div style={{ marginBottom: 20 }}>
        <h1 className="display" style={{ fontSize: 34, margin: 0, lineHeight: 1 }}>EXERCISE LIBRARY</h1>
        <p style={{ color: tokens.textMuted, fontSize: 13, margin: "4px 0 0" }}>Pick a move, see exactly what it works</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        {/* LEFT: list */}
        <div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, background: tokens.surface, border: `1px solid ${tokens.border}`, borderRadius: 10, padding: "8px 12px" }}>
            <Search size={16} color={tokens.textMuted} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search exercises..."
              style={{ background: "transparent", border: "none", outline: "none", color: tokens.text, fontSize: 14, width: "100%" }}
            />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {CATEGORIES.map((c) => (
              <div
                key={c}
                className="chip"
                onClick={() => setCategory(c)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  border: `1px solid ${category === c ? tokens.primary : tokens.border}`,
                  background: category === c ? `${tokens.primary}1A` : "transparent",
                  color: category === c ? tokens.primary : tokens.textMuted,
                }}
              >
                {c}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 440, overflowY: "auto", paddingRight: 4 }}>
            {filtered.map((ex) => {
              const isSelected = ex.id === selectedId;
              return (
                <div
                  key={ex.id}
                  className="card"
                  onClick={() => selectExercise(ex)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: `1px solid ${isSelected ? tokens.primary : tokens.border}`,
                    background: isSelected ? `${tokens.primary}14` : tokens.surface,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{ex.name}</div>
                    <div style={{ fontSize: 12, color: tokens.textMuted, marginTop: 2 }}>
                      {ex.equipment} • {ex.primary.map((m) => MUSCLE_LABELS[m]).join(", ")}
                    </div>
                  </div>
                  <Dumbbell size={16} color={isSelected ? tokens.primary : tokens.textMuted} />
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ color: tokens.textMuted, fontSize: 13, padding: 20, textAlign: "center" }}>No exercises match.</div>
            )}
          </div>
        </div>

        {/* RIGHT: body map */}
        <div style={{ background: tokens.surface, border: `1px solid ${tokens.border}`, borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 12, alignSelf: "stretch", background: tokens.bg, borderRadius: 8, padding: 4 }}>
            {["front", "back"].map((v) => (
              <div
                key={v}
                className="chip"
                onClick={() => setView(v)}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "6px 0",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: view === v ? tokens.border : "transparent",
                  color: view === v ? tokens.text : tokens.textMuted,
                }}
              >
                {v}
              </div>
            ))}
          </div>

          <div style={{ width: "100%", maxWidth: 220, aspectRatio: "240/520" }}>
            <BodyMap view={view} activeSet={primarySet} secondarySet={secondarySet} />
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 11, color: tokens.textMuted }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: tokens.primary, display: "inline-block" }} />
              Primary
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: tokens.secondary, display: "inline-block" }} />
              Secondary
            </span>
          </div>

          <div style={{ width: "100%", borderTop: `1px solid ${tokens.border}`, marginTop: 16, paddingTop: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{selected.name}</div>
            <div style={{ fontSize: 12, color: tokens.textMuted, marginTop: 6 }}>
              Primary: <span style={{ color: tokens.primary }}>{selected.primary.map((m) => MUSCLE_LABELS[m]).join(", ")}</span>
            </div>
            {selected.secondary.length > 0 && (
              <div style={{ fontSize: 12, color: tokens.textMuted, marginTop: 4 }}>
                Secondary: <span style={{ color: tokens.secondary }}>{selected.secondary.map((m) => MUSCLE_LABELS[m]).join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
