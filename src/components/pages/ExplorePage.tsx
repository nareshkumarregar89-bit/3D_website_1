import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Orbit, Compass, ArrowUpRight, Volume2, VolumeX } from "lucide-react";

export interface CorridorCard {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  x: number; // base percentage X
  y: number; // base percentage Y
  z: number; // initial Z depth
  rotX: number;
  rotY: number;
  rotZ: number;
  description: string;
  stats: { label: string; value: string }[];
}

const CARDS: CorridorCard[] = [
  {
    id: "prism-3",
    code: "PRISM III",
    title: "Hydrodynamic Lattice",
    subtitle: "Fluid Dynamics · Resonant Waveform",
    category: "FLUID DYNAMICS",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    x: -28,
    y: 22,
    z: -120,
    rotX: 12,
    rotY: 18,
    rotZ: -6,
    description: "Multi-layered oceanic wave algorithms generating non-Euclidean fluid topological deformations in virtual space.",
    stats: [
      { label: "Frequency", value: "432.8 Hz" },
      { label: "Curvature", value: "K = -0.42" },
      { label: "Viscosity", value: "0.082 Pa·s" },
    ],
  },
  {
    id: "apollo-9",
    code: "AETHER IX",
    title: "Sub-Orbital Ascent",
    subtitle: "Aerospace Propulsion · Mach 8.4",
    category: "PROPULSION",
    image: "https://images.unsplash.com/photo-1517976487515-594283073743?auto=format&fit=crop&w=1000&q=80",
    x: -18,
    y: -24,
    z: -380,
    rotX: -10,
    rotY: -14,
    rotZ: 8,
    description: "Atmospheric thermal puncture capture during solid-fuel ignition sequence into low planetary orbit.",
    stats: [
      { label: "Thrust", value: "34.8 MN" },
      { label: "Altitude", value: "88.2 km" },
      { label: "Velocity", value: "Mach 8.4" },
    ],
  },
  {
    id: "summit-alpine",
    code: "AFTHER IX",
    title: "Alpine Ridge Twilight",
    subtitle: "Topographic Scans · High Altitude",
    category: "GEOLOGY",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
    x: -6,
    y: -8,
    z: -620,
    rotX: 6,
    rotY: -8,
    rotZ: -3,
    description: "Granite tectonic formation captured at solar terminus with natural atmospheric light scattering.",
    stats: [
      { label: "Elevation", value: "4,810 m" },
      { label: "Temperature", value: "-14°C" },
      { label: "Pressure", value: "540 hPa" },
    ],
  },
  {
    id: "ether-4",
    code: "ETHER IV",
    title: "Chiral Bio-Helix",
    subtitle: "Synthetic Morphology · Self-Assembly",
    category: "SYNTHETIC BIO",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80",
    x: 8,
    y: -22,
    z: -260,
    rotX: -14,
    rotY: 16,
    rotZ: 12,
    description: "Parametric organic vertebrae sequence undulating along an electromagnetic tension field.",
    stats: [
      { label: "Chirality", value: "Right-Hand D" },
      { label: "Pitch", value: "3.4 nm" },
      { label: "Tension", value: "128 pN" },
    ],
  },
  {
    id: "flux-8",
    code: "FLUX VIII",
    title: "Thermal Dispersion",
    subtitle: "Micro-Gravity Suspension · Chromatic",
    category: "CHROMODYNAMICS",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80",
    x: -4,
    y: 20,
    z: -480,
    rotX: 8,
    rotY: -12,
    rotZ: -4,
    description: "Suspended ink diffusion across zero-gravity aqueous medium under polarized chromatic ultraviolet illumination.",
    stats: [
      { label: "Entropy", value: "ΔS = +4.12" },
      { label: "Diffusion", value: "0.94 cm²/s" },
      { label: "Refraction", value: "n = 1.334" },
    ],
  },
  {
    id: "quantum-5",
    code: "QUANTUM V",
    title: "Non-Linear Geometry",
    subtitle: "Mathematical Topology · Manifolds",
    category: "MATHEMATICS",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80",
    x: 20,
    y: 18,
    z: -200,
    rotX: 10,
    rotY: -16,
    rotZ: 8,
    description: "Calabi-Yau compactification diagrams representing higher dimensional geometric projections.",
    stats: [
      { label: "Dimensions", value: "10-D" },
      { label: "Euler Char.", value: "χ = -6" },
      { label: "Holonomy", value: "SU(3)" },
    ],
  },
  {
    id: "cyber-7",
    code: "CYBER VII",
    title: "Photonic Substrate",
    subtitle: "Quantum Interconnect · Sub-nanometer",
    category: "COMPUTATION",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    x: 32,
    y: -14,
    z: -520,
    rotX: -12,
    rotY: -22,
    rotZ: -10,
    description: "Ultra-dense silicon photonics architecture enabling zero-latency coherent optic interconnects.",
    stats: [
      { label: "Node Scale", value: "1.4 nm" },
      { label: "Bandwidth", value: "102.4 Tbps" },
      { label: "Thermal Flux", value: "18.2 W/cm²" },
    ],
  },
  {
    id: "chroma-1",
    code: "CHROMA I",
    title: "Holographic Silk",
    subtitle: "Metamaterial Sheen · Iridescence",
    category: "METAMATERIALS",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=80",
    x: 34,
    y: 10,
    z: -320,
    rotX: 8,
    rotY: -18,
    rotZ: 14,
    description: "Structural color nanofiber reflection that bends incident light through holographic chromatic spectra.",
    stats: [
      { label: "Reflectance", value: "98.7%" },
      { label: "Angle Shift", value: "Δλ = 180nm" },
      { label: "Layer Depth", value: "64 Layers" },
    ],
  },
];

export const ExplorePage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [targetProgress, setTargetProgress] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState<CorridorCard | null>(null);
  const [soundEnabled, setSoundEnabled] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const startDragY = React.useRef(0);
  const startProgress = React.useRef(0);

  // Smooth camera spring damping loop
  React.useEffect(() => {
    let animationFrame: number;
    const loop = () => {
      setScrollProgress((prev) => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.0001) return targetProgress;
        return prev + diff * 0.08;
      });
      animationFrame = requestAnimationFrame(loop);
    };
    animationFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetProgress]);

  // Handle Wheel Events
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * 0.0015;
    setTargetProgress((prev) => Math.max(0, Math.min(1.4, prev + delta)));
  };

  // Pointer drag for mouse and touch
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startDragY.current = e.clientY;
    startProgress.current = targetProgress;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Parallax mouse tilt
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const normX = (clientX - rect.left) / rect.width - 0.5;
    const normY = (clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: normX, y: normY });

    if (!isDragging.current) return;
    const dy = (e.clientY - startDragY.current) * -0.002;
    setTargetProgress(Math.max(0, Math.min(1.4, startProgress.current + dy)));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Keyboard controls
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setTargetProgress((prev) => Math.min(1.4, prev + 0.1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setTargetProgress((prev) => Math.max(0, prev - 0.1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full min-h-screen overflow-hidden select-none cursor-grab active:cursor-grabbing
                 bg-[#070913] text-white transition-colors duration-500"
    >
      {/* Dynamic Starfield & Warp Grid Background */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Concentric orbital coordinate rings matching Image 2 & 3 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-sky-400/15 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-sky-400/10 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] rounded-full border border-sky-400/5 pointer-events-none" />

        {/* Ambient radial lighting glow */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.25) 0%, rgba(7, 9, 19, 0.95) 75%)",
          }}
        />
      </div>

      {/* Hero Massive Typography - "INTO THE ETHER." */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        style={{
          transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-sky-400/80 mb-3 flex items-center gap-2">
          <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
          WARP DRIVE SEQUENCE
        </span>

        <h1
          className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase leading-none select-none"
          style={{
            background:
              "linear-gradient(180deg, #ffffff 15%, rgba(255,255,255,0.7) 60%, rgba(148,163,184,0.4) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 10px 40px rgba(0,0,0,0.8)",
          }}
        >
          INTO THE<br />ETHER.
        </h1>

        <p className="mt-6 max-w-md text-sm md:text-base text-slate-400 font-light tracking-wide leading-relaxed">
          Scroll your trackpad or mouse wheel to fly through the spatial 3D corridor.
        </p>
      </div>

      {/* 3D Spatial Corridor World Stage */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "1100px",
          perspectiveOrigin: `${50 + mousePos.x * 12}% ${50 + mousePos.y * 12}%`,
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
          style={{
            transform: `translate3d(0, 0, ${scrollProgress * 800}px)`,
          }}
        >
          {CARDS.map((card, index) => {
            // Compute real-time camera distance
            const currentZ = card.z + scrollProgress * 800;
            const isBehindCamera = currentZ > 300;
            const opacity = isBehindCamera
              ? 0
              : Math.max(0.1, Math.min(1, (1200 + currentZ) / 1000));

            return (
              <div
                key={card.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCard(card);
                }}
                className={`absolute group cursor-pointer rounded-2xl p-2 transition-all duration-300
                            [transform-style:preserve-3d] hover:scale-105 hover:z-50
                            ${isBehindCamera ? "pointer-events-none" : ""}`}
                style={{
                  width: "240px",
                  height: "330px",
                  left: `calc(50% + ${card.x}vw)`,
                  top: `calc(50% + ${card.y}vh)`,
                  transform: `translate3d(-50%, -50%, ${card.z}px) rotateX(${card.rotX + mousePos.y * 10}deg) rotateY(${card.rotY + mousePos.x * 10}deg) rotateZ(${card.rotZ}deg)`,
                  opacity,
                  transition: "transform 0.15s ease-out, opacity 0.2s ease",
                }}
              >
                {/* 3D Card Shell */}
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden p-3 flex flex-col justify-between
                             bg-slate-900/80 backdrop-blur-md border border-white/20
                             shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(56,189,248,0.2)]
                             group-hover:border-sky-400/60 group-hover:shadow-[0_25px_60px_rgba(56,189,248,0.3)]
                             transition-all duration-300"
                >
                  {/* High Quality Card Cover Media */}
                  <img
                    src={card.image}
                    alt={card.title}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                  {/* Top Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-sky-300 uppercase px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                      {card.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-sky-300 transition-colors" />
                  </div>

                  {/* Bottom Metadata Matching Reference */}
                  <div className="relative z-10">
                    <h3 className="font-mono text-base font-bold tracking-wider text-white uppercase drop-shadow-md">
                      {card.code}
                    </h3>
                    <p className="text-xs text-slate-300/90 font-medium truncate mt-0.5">
                      {card.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom HUD Controls */}
      <footer className="fixed bottom-6 inset-x-0 z-30 pointer-events-none flex flex-col items-center gap-3">
        <div className="pointer-events-auto flex items-center gap-4 px-4 py-2 rounded-full bg-slate-900/70 backdrop-blur-xl border border-white/15 text-xs text-slate-300 shadow-xl">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Depth: {(scrollProgress * 100).toFixed(0)}%</span>
          </div>

          <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-150"
              style={{ width: `${Math.min(100, (scrollProgress / 1.4) * 100)}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span>Sound</span>
          </button>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="flex flex-col items-center gap-1 text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">
          <span>SCROLL TO EXPLORE</span>
          <div className="w-px h-6 bg-gradient-to-b from-sky-400 to-transparent animate-pulse" />
        </div>
      </footer>

      {/* Modal Inspector for Selected 3D Artifact */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden
                         bg-gradient-to-b from-[#131c2e] to-[#0c121e]
                         border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.2)]
                         p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* 3D Preview Image Frame */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="font-mono text-xl font-bold tracking-wider text-white uppercase">
                      {selectedCard.code}
                    </span>
                    <p className="text-xs text-sky-300">{selectedCard.subtitle}</p>
                  </div>
                </div>

                {/* Details & Specifications */}
                <div className="flex flex-col gap-5">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase">
                      {selectedCard.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                      {selectedCard.title}
                    </h2>
                    <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                      {selectedCard.description}
                    </p>
                  </div>

                  {/* Quantitative Metrics */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    {selectedCard.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">
                          {stat.label}
                        </span>
                        <span className="text-sm font-semibold text-white block mt-0.5">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      className="flex-1 py-3 px-5 rounded-full font-medium text-sm text-[#0f172a] bg-gradient-to-r from-sky-400 to-cyan-300 hover:brightness-110 shadow-lg shadow-sky-500/25 transition-all"
                    >
                      Acquire Artifact
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCard(null)}
                      className="py-3 px-5 rounded-full font-medium text-sm text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-all"
                    >
                      Close Sequence
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
