import * as React from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, Compass } from "lucide-react";

interface PanoramaSlide {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  image: string;
  accent: string;
}

const SLIDES: PanoramaSlide[] = [
  {
    id: "violet-aurora",
    title: "Violet Singularity",
    subtitle: "Deep Atmospheric Magnetosphere",
    location: "Sector 04 · Ionosphere",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    accent: "#a855f7",
  },
  {
    id: "golden-solitude",
    title: "Solar Terminus",
    subtitle: "Golden Hour Silhouette Refraction",
    location: "Pacific Meridional · 34°N",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    accent: "#f59e0b",
  },
  {
    id: "solar-crescent",
    title: "Corona Eclipse",
    subtitle: "Solar Flare Photospheric Boundary",
    location: "Heliospheric Apex",
    image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=1200&q=80",
    accent: "#f97316",
  },
  {
    id: "kinetic-streak",
    title: "Kinetic Velocity",
    subtitle: "Mach Vector Hypersonic Streak",
    location: "Sub-Orbital Corridor VI",
    image: "https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&w=1200&q=80",
    accent: "#ef4444",
  },
  {
    id: "cyan-abyss",
    title: "Bioluminescent Rift",
    subtitle: "Deep Trench Hydrothermal Glow",
    location: "Mariana Meridian · Depth 10.9 km",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    accent: "#06b6d4",
  },
  {
    id: "emerald-nebula",
    title: "Emerald Cosmic Drift",
    subtitle: "Interstellar Dust Dispersion",
    location: "Cygnus Arm · Sector 09",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    accent: "#10b981",
  },
];

export const FlightsPage: React.FC = () => {
  const [rotation, setRotation] = React.useState(0);
  const [targetRotation, setTargetRotation] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const startRot = React.useRef(0);
  const stageRef = React.useRef<HTMLDivElement>(null);

  const count = SLIDES.length;
  const anglePerItem = 360 / count;
  const cylinderRadius = 780; // Distance from center along Z-axis

  // Smooth rotational spring physics loop
  React.useEffect(() => {
    let animId: number;
    const update = () => {
      setRotation((prev) => {
        const diff = targetRotation - prev;
        if (Math.abs(diff) < 0.005) return targetRotation;
        return prev + diff * 0.08;
      });
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [targetRotation]);

  // Autoplay rotation
  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTargetRotation((prev) => prev - anglePerItem);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, anglePerItem]);

  // Compute active item from current target rotation
  React.useEffect(() => {
    const rawIndex = Math.round(-targetRotation / anglePerItem) % count;
    const normalizedIndex = (rawIndex + count) % count;
    setActiveSlideIndex(normalizedIndex);
  }, [targetRotation, anglePerItem, count]);

  // Pointer drag controls
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startRot.current = targetRotation;
    setIsPlaying(false);
    if (stageRef.current) stageRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    // Map horizontal pixel drag to angle
    setTargetRotation(startRot.current + dx * 0.22);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (stageRef.current?.hasPointerCapture(e.pointerId)) {
      stageRef.current.releasePointerCapture(e.pointerId);
    }
    // Snap to nearest item
    setTargetRotation((prev) => Math.round(prev / anglePerItem) * anglePerItem);
  };

  // Wheel scrubbing
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setIsPlaying(false);
    setTargetRotation((prev) => prev - e.deltaY * 0.06);
  };

  const nextSlide = () => {
    setIsPlaying(false);
    setTargetRotation((prev) => Math.round(prev / anglePerItem) * anglePerItem - anglePerItem);
  };

  const prevSlide = () => {
    setIsPlaying(false);
    setTargetRotation((prev) => Math.round(prev / anglePerItem) * anglePerItem + anglePerItem);
  };

  return (
    <div
      ref={stageRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing pt-24 pb-12"
    >
      {/* Ambient background bloom matching current slide */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-colors duration-1000 opacity-20"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${SLIDES[activeSlideIndex].accent} 0%, transparent 65%)`,
        }}
      />

      {/* Top Header */}
      <header className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-slate-400 flex items-center justify-center gap-2">
          <Compass className="w-3.5 h-3.5 text-sky-400" />
          CYLINDRICAL 3D PROJECTION HORIZON
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">
          {SLIDES[activeSlideIndex].title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
          {SLIDES[activeSlideIndex].location} · {SLIDES[activeSlideIndex].subtitle}
        </p>
      </header>

      {/* 3D Cylindrical Cylinder Stage matching Image 5 */}
      <div
        className="relative w-full h-[460px] sm:h-[540px] flex items-center justify-center my-auto"
        style={{
          perspective: "1600px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
          style={{
            transform: `translateZ(-${cylinderRadius}px) rotateY(${rotation}deg)`,
          }}
        >
          {SLIDES.map((slide, i) => {
            const angle = i * anglePerItem;
            // Angle relative to camera front
            const relativeAngle = ((angle + rotation) % 360 + 540) % 360 - 180;
            const isFacingFront = Math.abs(relativeAngle) < 110;
            const frontWeight = Math.max(0, 1 - Math.abs(relativeAngle) / 95);

            return (
              <div
                key={slide.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setTargetRotation(-angle);
                }}
                className={`absolute w-[340px] sm:w-[480px] h-[240px] sm:h-[320px] rounded-2xl overflow-hidden
                            [transform-style:preserve-3d] transition-opacity duration-300
                            ${isFacingFront ? "cursor-pointer" : "pointer-events-none"}`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${cylinderRadius}px)`,
                  opacity: Math.max(0.08, Math.min(1, frontWeight * 1.3)),
                }}
              >
                {/* Curved Panel Image Container with Cylindrical Shading */}
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20
                             shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(0,0,0,0.8)]
                             transition-all duration-300"
                  style={{
                    boxShadow:
                      Math.abs(relativeAngle) < 25
                        ? `0 0 35px ${slide.accent}55, 0 20px 50px rgba(0,0,0,0.9)`
                        : undefined,
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    draggable={false}
                    className="w-full h-full object-cover select-none"
                  />

                  {/* Cylindrical Edge Falloff & Vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.7) 100%),
                                   linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 60%, rgba(0,0,0,0.85) 100%)`,
                    }}
                  />

                  {/* Panel Label */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white drop-shadow-md">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-white/80">
                        {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                      </span>
                      <h4 className="font-bold text-base tracking-wide mt-0.5">{slide.title}</h4>
                    </div>

                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: slide.accent, boxShadow: `0 0 10px ${slide.accent}` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reference Caption matching Image 5 exactly */}
      <footer className="relative z-10 flex flex-col items-center gap-6 px-6 text-center max-w-xl mx-auto">
        <p className="text-xs sm:text-sm text-slate-400 font-light tracking-wide leading-relaxed">
          Images curve in from one edge, flatten out at the centre, then fade away round the other.
        </p>

        {/* Carousel Controls */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous frame"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95 outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause auto orbit" : "Play auto orbit"}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-mono text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 outline-none"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Orbit Active" : "Orbit Paused"}</span>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next frame"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95 outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
