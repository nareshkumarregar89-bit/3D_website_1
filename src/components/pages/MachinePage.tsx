import * as React from "react";
import { Box, Layers, Play, Pause, BookOpen, Monitor, Cpu, Printer, Server, RefreshCw, Sparkles } from "lucide-react";

export type MachineMode = "assembled" | "cutaway" | "stations" | "order";
export type MachineView = "overview" | "side" | "top" | "station" | "flight";

interface StationDetail {
  id: number;
  name: string;
  tag: string;
  desc: string;
  spec: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number; // percentage on platform
  y: number;
}

const STATIONS: StationDetail[] = [
  {
    id: 1,
    name: "Filament Extruder & Reel",
    tag: "MODULE 01",
    desc: "Twin-spool rapid additive deposition unit with precision feed stepper motors.",
    spec: "0.05mm layer height · 280°C nozzle",
    icon: Printer,
    x: 22,
    y: 28,
  },
  {
    id: 2,
    name: "Mag-Lev Loop Conveyor",
    tag: "MODULE 02",
    desc: "Continuous oval electromagnetic transport track routing parcels between assembly stages.",
    spec: "1.8 m/s sync velocity · contactless",
    icon: RefreshCw,
    x: 48,
    y: 52,
  },
  {
    id: 3,
    name: "Checkout Dispatch Terminal",
    tag: "MODULE 03",
    desc: "Automated billing, receipt generation, and biometric order validation station.",
    spec: "+$29 subtotal · thermal slip out",
    icon: Cpu,
    x: 48,
    y: 42,
  },
  {
    id: 4,
    name: "System Telemetry Display",
    tag: "MODULE 04",
    desc: "Real-time production monitoring screen tracking queue velocity and node health.",
    spec: "60 FPS analytics · 4K IPS panel",
    icon: Monitor,
    x: 68,
    y: 30,
  },
  {
    id: 5,
    name: "Compute Server Chassis",
    tag: "MODULE 05",
    desc: "Central PLC controller coordinating synchronized stepper kinematics and database sync.",
    spec: "32-core edge node · IP67 enclosure",
    icon: Server,
    x: 74,
    y: 60,
  },
];

export const MachinePage: React.FC = () => {
  const [mode, setMode] = React.useState<MachineMode>("cutaway");
  const [view, setView] = React.useState<MachineView>("overview");
  const [isRotating, setIsRotating] = React.useState(false);
  const [rotOffset, setRotOffset] = React.useState(0);
  const [activeStation, setActiveStation] = React.useState<number | null>(null);
  const [orderProgress, setOrderProgress] = React.useState(0);

  // Auto-rotate logic
  React.useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotOffset((prev) => (prev + 0.4) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isRotating]);

  // Order execution loop
  React.useEffect(() => {
    if (mode !== "order") return;
    const interval = setInterval(() => {
      setOrderProgress((prev) => (prev + 0.012) % 1);
    }, 30);
    return () => clearInterval(interval);
  }, [mode]);

  // View angle transform mapping matching screenshots
  const viewStyles: Record<MachineView, { rotateX: number; rotateZ: number; rotateY: number; scale: number; translateY: number }> = {
    overview: { rotateX: 54, rotateZ: -36, rotateY: 0, scale: 0.95, translateY: 0 },
    side: { rotateX: 18, rotateZ: -14, rotateY: -6, scale: 1.15, translateY: 40 },
    top: { rotateX: 78, rotateZ: -10, rotateY: 0, scale: 0.9, translateY: -20 },
    station: { rotateX: 38, rotateZ: -28, rotateY: 4, scale: 1.35, translateY: -40 },
    flight: { rotateX: 48, rotateZ: 135, rotateY: 15, scale: 1.05, translateY: 20 },
  };

  const currentCam = viewStyles[view];
  const effectiveZ = currentCam.rotateZ + rotOffset;

  // Package position along oval track for "One Order" mode
  const trackAngle = orderProgress * Math.PI * 2;
  const packageX = 50 + Math.cos(trackAngle) * 26;
  const packageY = 52 + Math.sin(trackAngle) * 16;

  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none pt-24 pb-8">
      {/* Top Header matching Image 1 */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-[#f97316]" />
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-white/90 uppercase font-semibold">
            THE MACHINE YOU WILL BUILD
          </span>
        </div>

        <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-white/60 uppercase">
          5 MODULES / 1 SYSTEM
        </div>
      </header>

      {/* Main 3D Isometric Viewport */}
      <div
        className="relative w-full h-[580px] sm:h-[660px] flex items-center justify-center my-auto overflow-hidden"
        style={{
          perspective: "1600px",
          perspectiveOrigin: "50% 48%",
        }}
      >
        {/* Orbital guide circle on floor */}
        <div className="pointer-events-none absolute w-[780px] h-[780px] rounded-full border border-white/5 [transform:rotateX(60deg)]" />
        <div className="pointer-events-none absolute w-[1050px] h-[1050px] rounded-full border border-white/5 [transform:rotateX(60deg)]" />

        {/* 3D Platform Root */}
        <div
          className="relative w-[720px] sm:w-[840px] h-[480px] sm:h-[520px] [transform-style:preserve-3d] transition-transform duration-700 ease-out"
          style={{
            transform: `translateY(${currentCam.translateY}px) rotateX(${currentCam.rotateX}deg) rotateZ(${effectiveZ}deg) rotateY(${currentCam.rotateY}deg) scale(${currentCam.scale})`,
          }}
        >
          {/* Main Workstation Baseplate */}
          <div
            className={`absolute inset-0 rounded-[28px] border transition-all duration-500
              ${
                mode === "cutaway"
                  ? "bg-slate-900/90 border-[#f97316]/60 shadow-[0_30px_80px_rgba(249,115,22,0.25)]"
                  : "bg-[#181c24] border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
              }`}
            style={{
              transform: "translateZ(0px)",
              boxShadow:
                mode === "cutaway"
                  ? "0 30px 80px rgba(0,0,0,0.9), inset 0 0 40px rgba(249,115,22,0.15)"
                  : "0 30px 80px rgba(0,0,0,0.9), inset 0 1px 2px rgba(255,255,255,0.2)",
            }}
          >
            {/* Baseplate edge extrusion effect */}
            <div className="absolute inset-0 rounded-[28px] border-b-8 border-r-4 border-slate-950/80 pointer-events-none" />

            {/* Corner Precision Bolts */}
            {[
              "top-3 left-3",
              "top-3 right-3",
              "bottom-3 left-3",
              "bottom-3 right-3",
            ].map((pos) => (
              <div
                key={pos}
                className={`absolute ${pos} w-3 h-3 rounded-full bg-slate-700 border border-slate-500/50 shadow-inner`}
              />
            ))}

            {/* Platform Branding Label */}
            <div className="absolute bottom-6 left-8 font-mono text-[10px] tracking-widest text-slate-500 uppercase">
              NARESH // HARDWARE SYSTEM · REV 4.2
            </div>

            {/* Internal Circuit Lines in Cutaway Mode */}
            {mode === "cutaway" && (
              <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none stroke-[#f97316] fill-none">
                <path d="M120 180 L240 180 L320 260 L540 260 L620 180" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M220 280 L220 380 L420 380" strokeWidth="1.5" />
                <path d="M480 140 L480 340 L580 340" strokeWidth="1.5" strokeDasharray="6 3" />
                <circle cx="240" cy="180" r="3" fill="#f97316" />
                <circle cx="320" cy="260" r="3" fill="#f97316" />
                <circle cx="540" cy="260" r="3" fill="#f97316" />
              </svg>
            )}
          </div>

          {/* Module 1: 3D Filament Reel & Extruder Gantry */}
          <div
            className="absolute [transform-style:preserve-3d] transition-transform duration-500"
            style={{
              left: "18%",
              top: "18%",
              transform: "translateZ(30px)",
            }}
          >
            {/* Twin Reel Spools */}
            <div className="relative w-20 h-28 flex flex-col items-center">
              {/* Spool Wheels */}
              <div className="w-12 h-12 rounded-full border-4 border-slate-600 bg-slate-800 flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 rounded-full bg-slate-900 border border-white/20" />
              </div>
              {/* Vertical Orange Gantry Frame */}
              <div className="w-16 h-20 bg-gradient-to-b from-[#f97316] to-[#c2410c] rounded-lg mt-1 p-1 shadow-md border border-white/20 flex flex-col items-center justify-between">
                <span className="text-[8px] font-mono font-bold text-white uppercase">REEL-01</span>
                <div className="w-10 h-10 bg-slate-900 rounded border border-white/10 flex items-center justify-center">
                  <div className="w-2 h-6 bg-[#f97316] rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Module 2: The Mag-Lev Oval Conveyor Loop */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none [transform-style:preserve-3d]"
            style={{ transform: "translateZ(25px)" }}
          >
            {/* The Outer and Inner Rails */}
            <div
              className={`relative w-[480px] h-[280px] rounded-[140px] border-8 transition-colors duration-300
                ${mode === "cutaway" ? "border-[#f97316]/80 shadow-[0_0_20px_rgba(249,115,22,0.4)]" : "border-slate-300 dark:border-slate-400 shadow-xl"}`}
            >
              {/* Track Stanchion Posts */}
              {[15, 35, 65, 85].map((leftPct) => (
                <div
                  key={leftPct}
                  className="absolute w-2 h-6 bg-slate-500 rounded-sm"
                  style={{ left: `${leftPct}%`, bottom: "-14px" }}
                />
              ))}

              {/* Package Token when in "One Order" mode */}
              {mode === "order" && (
                <div
                  className="absolute w-7 h-7 rounded-md bg-[#f97316] border border-white flex items-center justify-center shadow-[0_0_15px_#f97316] transition-all"
                  style={{
                    left: `calc(${packageX}% - 14px)`,
                    top: `calc(${packageY}% - 14px)`,
                    transform: "translateZ(15px)",
                  }}
                >
                  <span className="text-[9px] font-bold text-white">#1</span>
                </div>
              )}
            </div>
          </div>

          {/* Module 3: Checkout Terminal & Receipt Slip */}
          <div
            className="absolute [transform-style:preserve-3d]"
            style={{
              left: "44%",
              top: "36%",
              transform: "translateZ(35px)",
            }}
          >
            <div className="w-28 h-20 bg-slate-200 dark:bg-slate-800 rounded-xl p-2 border border-white/20 shadow-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold text-[#f97316]">CHECKOUT</span>
                <span className="text-[9px] font-mono text-slate-400">+$29</span>
              </div>
              <div className="w-full h-8 bg-slate-900 rounded p-1 flex items-center justify-center">
                <span className="text-[10px] font-mono text-emerald-400">● DISPATCH OK</span>
              </div>
              {/* White Receipt Slip sticking out */}
              <div className="w-14 h-8 bg-white text-slate-900 rounded-b shadow text-[7px] font-mono p-1 leading-none -mb-3 mx-auto border border-slate-300">
                REC #8842<br />PAID 100%
              </div>
            </div>
          </div>

          {/* Module 4: Telemetry Monitor Display */}
          <div
            className="absolute [transform-style:preserve-3d]"
            style={{
              left: "62%",
              top: "22%",
              transform: "translateZ(40px) rotateY(-10deg)",
            }}
          >
            <div className="w-32 h-24 bg-slate-900 rounded-lg border-2 border-slate-700 shadow-2xl p-1.5 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/10 pb-1">
                <span className="text-[8px] font-mono text-[#f97316] font-bold">SYSTEM ACTIVE</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="h-1.5 bg-slate-800 rounded w-full overflow-hidden">
                  <div className="h-full bg-[#f97316] w-3/4" />
                </div>
                <div className="h-1.5 bg-slate-800 rounded w-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-1/2" />
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-400">FPS: 60 · QUEUE: 0</span>
            </div>
            {/* Stand */}
            <div className="w-3 h-8 bg-slate-600 mx-auto -mt-1 rounded-b shadow" />
          </div>

          {/* Module 5: Compute Server Chassis */}
          <div
            className="absolute [transform-style:preserve-3d]"
            style={{
              left: "70%",
              top: "52%",
              transform: "translateZ(30px)",
            }}
          >
            <div className="w-24 h-28 bg-slate-900 border border-slate-700 rounded-xl p-2 shadow-2xl flex flex-col justify-between">
              <div className="w-full h-4 bg-[#f97316] rounded-t-lg -mt-2 -mx-2 px-2 flex items-center justify-between text-[8px] font-mono font-bold text-slate-950">
                <span>PLC EDGE</span>
              </div>
              <div className="space-y-1 my-auto">
                <div className="h-2 rounded bg-slate-800 flex items-center px-1">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                </div>
                <div className="h-2 rounded bg-slate-800 flex items-center px-1">
                  <div className="w-1 h-1 rounded-full bg-amber-400" />
                </div>
                <div className="h-2 rounded bg-slate-800 flex items-center px-1">
                  <div className="w-1 h-1 rounded-full bg-cyan-400" />
                </div>
              </div>
              <span className="text-[7px] font-mono text-slate-500">IP67 BUS V4</span>
            </div>
          </div>

          {/* Stations Mode Callout Pins */}
          {mode === "stations" && (
            STATIONS.map((station) => (
              <div
                key={station.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStation(station.id);
                }}
                className="absolute cursor-pointer group [transform-style:preserve-3d] hover:scale-110 transition-transform"
                style={{
                  left: `${station.x}%`,
                  top: `${station.y}%`,
                  transform: "translateZ(60px)",
                }}
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f97316] text-white text-[10px] font-mono font-bold shadow-lg shadow-[#f97316]/50 border border-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>{station.tag}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Mode Switcher Capsule matching Image 1, 2 & 3 */}
      <div className="relative z-20 flex flex-col items-center gap-4 px-4 max-w-xl mx-auto w-full">
        {/* Main 4-Segment Mode Pill */}
        <div className="flex items-center rounded-2xl p-1.5 bg-[#14171f]/90 border border-white/15 backdrop-blur-xl shadow-2xl">
          <button
            type="button"
            onClick={() => setMode("assembled")}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 outline-none
              ${mode === "assembled" ? "bg-[#f97316] text-white shadow-lg shadow-[#f97316]/30 font-semibold" : "text-slate-300 hover:text-white"}`}
          >
            <Box className="w-4 h-4" />
            <span>Assembled</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("cutaway")}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 outline-none
              ${mode === "cutaway" ? "bg-[#f97316] text-white shadow-lg shadow-[#f97316]/30 font-semibold" : "text-slate-300 hover:text-white"}`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Cutaway</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("stations")}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 outline-none
              ${mode === "stations" ? "bg-[#f97316] text-white shadow-lg shadow-[#f97316]/30 font-semibold" : "text-slate-300 hover:text-white"}`}
          >
            <Layers className="w-4 h-4" />
            <span>Stations</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("order")}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 outline-none
              ${mode === "order" ? "bg-[#f97316] text-white shadow-lg shadow-[#f97316]/30 font-semibold" : "text-slate-300 hover:text-white"}`}
          >
            <Play className="w-4 h-4" />
            <span>One order</span>
          </button>
        </div>

        {/* Bottom Camera Angle Bar matching Image 1, 2, 3 */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="uppercase text-[10px] tracking-widest text-slate-500">VIEW</span>
          {(["overview", "side", "top", "station", "flight"] as MachineView[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`capitalize transition-colors outline-none
                ${view === v ? "text-white font-bold underline decoration-[#f97316] decoration-2 underline-offset-4" : "hover:text-slate-200"}`}
            >
              {v}
            </button>
          ))}

          {/* Pause / Play Rotate Toggle */}
          <div className="w-px h-3 bg-white/20 mx-1" />
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className="hover:text-white transition-colors outline-none p-1"
            title={isRotating ? "Pause orbit" : "Auto orbit"}
          >
            {isRotating ? <Pause className="w-3.5 h-3.5 text-[#f97316]" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Station Detail Modal when clicked in Stations mode */}
      {activeStation !== null && (
        <div
          onClick={() => setActiveStation(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-[#14171f] border border-[#f97316]/40 p-6 shadow-2xl"
          >
            {(() => {
              const s = STATIONS.find((x) => x.id === activeStation);
              if (!s) return null;
              const Icon = s.icon;
              return (
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#f97316] font-bold">{s.tag}</span>
                    <button
                      type="button"
                      onClick={() => setActiveStation(null)}
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      ✕
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-[#f97316]" />
                    {s.name}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2">{s.desc}</p>
                  <div className="mt-4 p-3 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-slate-400">
                    SPEC: {s.spec}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
