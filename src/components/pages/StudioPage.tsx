import * as React from "react";
import { ArrowUp, ArrowUpRight, Sparkles, Eye, RefreshCw, Type } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  image: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    title: "Spatial Monolith Interface",
    client: "Aether Dynamics",
    year: "2026",
    category: "3D Interaction / Hardware",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "02",
    title: "Chrono Kinetic Engine",
    client: "Horology Lab",
    year: "2026",
    category: "Generative Systems / WebGL",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "03",
    title: "Sub-Orbital Launch Telemetry",
    client: "Apollo Aerodynamics",
    year: "2025",
    category: "Data Topology / Identity",
    image: "https://images.unsplash.com/photo-1517976487515-594283073743?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "04",
    title: "Bio-Adaptive Metamaterial",
    client: "Cortex Synthetic",
    year: "2025",
    category: "Spatial UI / Architecture",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
  },
];

interface Dot {
  x: number;
  y: number;
  baseRadius: number;
  brightness: number;
}

export const StudioPage: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = React.useState<"index" | "archive" | "about">("index");
  const [warpActive, setWarpActive] = React.useState(true);
  const [useUppercase, setUseUppercase] = React.useState(false);
  const mouseRef = React.useRef({ x: -2000, y: -2000, active: false });

  // High-Density Halftone Dot Matrix Engine for "naresh."
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let activeDots: Dot[] = [];
    let canvasW = 0;
    let canvasH = 0;

    // Build the dot matrix from high-resolution typography sample
    const buildDots = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasW = canvas.width = Math.round(rect.width * dpr);
      canvasH = canvas.height = Math.round(rect.height * dpr);

      // Offscreen text canvas for rasterizing typography
      const off = document.createElement("canvas");
      off.width = canvasW;
      off.height = canvasH;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;

      offCtx.fillStyle = "#000000";
      offCtx.fillRect(0, 0, canvasW, canvasH);

      // Exact text
      const textToRender = useUppercase ? "NARESH." : "naresh.";

      // Calculate perfect proportional font size so the letters fill the canvas edge-to-edge
      let fontSize = Math.min(canvasW * 0.24, canvasH * 0.72);
      const fontStack = `"Inter", "Arial Black", "Montserrat", "Helvetica Neue", -apple-system, sans-serif`;
      offCtx.font = `900 ${fontSize}px ${fontStack}`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      let metrics = offCtx.measureText(textToRender);
      const maxTargetWidth = canvasW * 0.94;
      if (metrics.width > 0 && (metrics.width > maxTargetWidth || metrics.width < maxTargetWidth * 0.9)) {
        fontSize = fontSize * (maxTargetWidth / metrics.width);
        fontSize = Math.min(fontSize, canvasH * 0.78);
        offCtx.font = `900 ${fontSize}px ${fontStack}`;
      }

      offCtx.fillStyle = "#ffffff";
      offCtx.fillText(textToRender, canvasW / 2, canvasH / 2);

      // Extract raster image data
      const imgData = offCtx.getImageData(0, 0, canvasW, canvasH);
      const data = imgData.data;

      // Fine-grained halftone grid spacing (approx 180 to 220 dots across screen)
      const step = Math.max(5, Math.floor(canvasW / 190));
      const newDots: Dot[] = [];

      for (let y = step / 2; y < canvasH; y += step) {
        for (let x = step / 2; x < canvasW; x += step) {
          const px = Math.floor(x);
          const py = Math.floor(y);
          const idx = (py * canvasW + px) * 4;
          const brightness = data[idx]; // 0 to 255

          if (brightness > 35) {
            const factor = brightness / 255;
            // True halftone dot curve: dense inside letter stems, smoothly tapered at anti-aliased edges
            const baseRadius = (step * 0.44) * Math.pow(factor, 0.55);
            newDots.push({
              x,
              y,
              baseRadius: Math.max(1.2, baseRadius),
              brightness: factor,
            });
          }
        }
      }

      activeDots = newDots;
    };

    buildDots();

    const onResize = () => {
      buildDots();
    };
    window.addEventListener("resize", onResize);

    let t = 0;

    // Render loop
    const render = () => {
      t += 0.035;
      ctx.clearRect(0, 0, canvasW, canvasH);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const mX = mouseRef.current.x * dpr;
      const mY = mouseRef.current.y * dpr;
      const isMouseIn = mouseRef.current.active;

      // Center vortex position (sits at center, or tracks mouse if mouse is inside canvas)
      const vortexX = isMouseIn ? mX : canvasW * 0.5;
      const vortexY = isMouseIn ? mY : canvasH * 0.5;
      const vortexRadius = canvasW * 0.18;

      const numDots = activeDots.length;

      for (let i = 0; i < numDots; i++) {
        const dot = activeDots[i];

        // Measure distance to magnetic vortex
        const dx = dot.x - vortexX;
        const dy = dot.y - vortexY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let finalRadius = dot.baseRadius;
        let isOrange = false;
        let orangeAlpha = 1;

        if (warpActive && dist < vortexRadius) {
          const normDist = dist / vortexRadius; // 0 (center) to 1 (outer)
          const wave = Math.sin(normDist * 8 - t * 3);
          isOrange = true;
          // Radius pulse on the wave
          finalRadius = dot.baseRadius * (1 + 0.28 * wave);
          orangeAlpha = Math.max(0.6, 1 - normDist * 0.4);
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(0.8, finalRadius), 0, Math.PI * 2);

        if (isOrange) {
          ctx.fillStyle = `rgba(249, 115, 22, ${orangeAlpha})`; // Electric orange from screenshot
        } else {
          ctx.fillStyle = "#f1f5f9"; // Clean bone-white
        }
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [warpActive, useUppercase]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between pt-24 pb-8 overflow-hidden select-none">
      {/* Top Header Grid matching Image 4 & 5 */}
      <header className="relative z-10 px-6 sm:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-[11px] font-mono tracking-wider">
          {/* Col 1: Studio Name */}
          <div>
            <span className="font-bold text-white uppercase block">NARESH STUDIO</span>
            <span className="text-slate-400 block mt-1">@2026 · OSLO / LISBON</span>
          </div>

          {/* Col 2: Work */}
          <div>
            <span className="font-bold text-white uppercase block">WORK</span>
            <ul className="mt-1 space-y-0.5 text-slate-400">
              <li
                onClick={() => setActiveTab("index")}
                className={`cursor-pointer hover:text-white transition-colors ${activeTab === "index" ? "text-white font-semibold" : ""}`}
              >
                INDEX
              </li>
              <li
                onClick={() => setActiveTab("archive")}
                className={`cursor-pointer hover:text-white transition-colors ${activeTab === "archive" ? "text-white font-semibold" : ""}`}
              >
                ARCHIVE
              </li>
              <li className="cursor-pointer hover:text-white transition-colors">JOURNAL</li>
            </ul>
          </div>

          {/* Col 3: Studio */}
          <div>
            <span className="font-bold text-white uppercase block">STUDIO</span>
            <ul className="mt-1 space-y-0.5 text-slate-400">
              <li
                onClick={() => setActiveTab("about")}
                className={`cursor-pointer hover:text-white transition-colors ${activeTab === "about" ? "text-white font-semibold" : ""}`}
              >
                ABOUT
              </li>
              <li className="cursor-pointer hover:text-white transition-colors">PROCESS</li>
              <li className="cursor-pointer hover:text-white transition-colors">CAREERS</li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <span className="font-bold text-white uppercase block">CONTACT</span>
            <ul className="mt-1 space-y-0.5 text-slate-400">
              <li>
                <a href="mailto:hello@naresh.co" className="hover:text-white transition-colors">
                  HELLO@NARESH.CO
                </a>
              </li>
              <li className="text-slate-500">+47 22 00 41 00</li>
            </ul>
          </div>

          {/* Col 5: Back to Top */}
          <div className="flex md:justify-end items-start">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors outline-none"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Divider line matching Image 4 & 5 */}
        <div className="w-full h-px bg-white/15 mt-8 mb-6" />
      </header>

      {/* Interactive Project Index */}
      {activeTab === "index" && (
        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full my-4">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              SELECTED COMMISSIONS // 2025–2026
            </span>

            {/* Controls for Typography & Magnetic Field */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setUseUppercase(!useUppercase)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                <Type className="w-3.5 h-3.5 text-sky-400" />
                <span>{useUppercase ? "Format: NARESH." : "Format: naresh."}</span>
              </button>

              <button
                type="button"
                onClick={() => setWarpActive(!warpActive)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                  warpActive
                    ? "bg-[#f97316]/20 border border-[#f97316]/40 text-[#f97316]"
                    : "bg-white/10 text-slate-300 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{warpActive ? "Magnetic Vortex: ON" : "Pure Halftone: ON"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 p-3 hover:border-white/30 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{proj.client}</span>
                    <span>{proj.year}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#f97316] transition-colors truncate">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">{proj.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Halftone Dot-Matrix Wordmark Canvas for "naresh." */}
      <section className="relative z-10 w-full px-4 sm:px-8 my-auto flex flex-col items-center">
        <div className="relative w-full max-w-7xl h-[280px] sm:h-[360px] md:h-[440px] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full cursor-crosshair"
          />

          {/* Interactive Tooltip Hint */}
          <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase pointer-events-none">
            <Sparkles className="w-3 h-3 text-[#f97316]" />
            <span>INTERACTIVE HALFTONE LATTICE // MOVE MOUSE TO ENGAGE MAGNETIC RESONANCE</span>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="relative z-10 text-center text-xs font-mono text-slate-600">
        © 2026 NARESH STUDIO · ALL EXPERIMENTAL PROTOCOLS ACTIVE
      </footer>
    </div>
  );
};
