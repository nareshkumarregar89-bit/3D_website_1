import * as React from "react";
import ClothingRailHero from "@/components/ui/product-rail-gallery";
import { RAIL_DEMO_ITEMS } from "@/components/ui/demo";
import { Sparkles, ArrowRight, Layers, Compass, Wind, Cpu, Eye } from "lucide-react";
import type { NavTab } from "@/components/navigation/FloatingNavbar";

interface HomePageProps {
  onNavigate: (tab: NavTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      {/* 3D Clothing Rail Gallery Section */}
      <section className="w-full">
        <ClothingRailHero
          items={RAIL_DEMO_ITEMS}
          hanger="wood"
          eyebrow="Curated Atelier · Spatial Exhibition"
          heading="A tactile rail gallery you can touch and manipulate."
          caption="Brush along the rail, slide a hanger, or lift a piece to inspect in 360° space."
          autoplay={true}
          action={
            <div className="flex items-center gap-3 mt-2 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => onNavigate("machine")}
                className="inline-flex items-center gap-2 rounded-full bg-[#f97316] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#f97316]/30 transition-all hover:scale-105 active:scale-95 outline-none"
              >
                <span>The Machine (5 Modules)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate("studio")}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-md transition-all hover:scale-105 active:scale-95 outline-none"
              >
                <span>Naresh Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          }
        />
      </section>

      {/* Feature Exploration Grid */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="text-center mb-10">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground">
            SPATIAL EXPEDITIONS
          </span>
          <h2 className="text-3xl font-bold tracking-tight mt-1">Multi-Dimensional Experiences</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: The Machine You Will Build */}
          <div
            onClick={() => onNavigate("machine")}
            className="group cursor-pointer rounded-3xl p-6 bg-card/60 dark:bg-card/40 border border-border/60 hover:border-[#f97316]/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#f97316]/10 text-[#f97316] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#f97316] font-semibold">
                HARDWARE SYSTEM
              </span>
              <h3 className="text-xl font-bold mt-1 text-foreground">The Machine</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                5 modular stations on an interactive conveyor loop with Cutaway mode, Assembled view, and live order dispatch.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#f97316] mt-6 group-hover:translate-x-1 transition-transform">
              <span>Inspect Assembly</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Naresh Studio */}
          <div
            onClick={() => onNavigate("studio")}
            className="group cursor-pointer rounded-3xl p-6 bg-card/60 dark:bg-card/40 border border-border/60 hover:border-sky-500/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(56,189,248,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-sky-500 font-semibold">
                HALFTONE MATRIX
              </span>
              <h3 className="text-xl font-bold mt-1 text-foreground">Naresh Studio</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Massive interactive dot-matrix wordmark with energetic magnetic vortex distortion and curated commissions.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-sky-500 mt-6 group-hover:translate-x-1 transition-transform">
              <span>Open Studio</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Into the Ether */}
          <div
            onClick={() => onNavigate("explore")}
            className="group cursor-pointer rounded-3xl p-6 bg-card/60 dark:bg-card/40 border border-border/60 hover:border-indigo-500/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-500 font-semibold">
                WARP SEQUENCE
              </span>
              <h3 className="text-xl font-bold mt-1 text-foreground">Into The Ether</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Fly through an interactive 3D corridor of spatial floating cards with inertia physics and camera zoom.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-indigo-500 mt-6 group-hover:translate-x-1 transition-transform">
              <span>Enter Corridor</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Cylindrical Horizon */}
          <div
            onClick={() => onNavigate("flights")}
            className="group cursor-pointer rounded-3xl p-6 bg-card/60 dark:bg-card/40 border border-border/60 hover:border-purple-500/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-purple-500 font-semibold">
                CURVED HORIZON
              </span>
              <h3 className="text-xl font-bold mt-1 text-foreground">Cylindrical Cinema</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Images curve in from one edge, flatten in front of your gaze, and fade along the cosmic horizon.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-purple-500 mt-6 group-hover:translate-x-1 transition-transform">
              <span>View Panoramic</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 5: Atmospheric Observatory */}
          <div
            onClick={() => onNavigate("weather")}
            className="group cursor-pointer rounded-3xl p-6 bg-card/60 dark:bg-card/40 border border-border/60 hover:border-emerald-500/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(52,211,153,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wind className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-500 font-semibold">
                BAROMETRIC 3D
              </span>
              <h3 className="text-xl font-bold mt-1 text-foreground">Atmospheric Lounge</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Real-time meteorological simulation featuring gyroscopic tilt cards and dynamic aurora lighting.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-500 mt-6 group-hover:translate-x-1 transition-transform">
              <span>Monitor Weather</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
