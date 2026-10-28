import * as React from "react";
import { User, ShieldCheck, Award, Sparkles, Orbit, KeyRound, ExternalLink } from "lucide-react";

export const ProfilePage: React.FC = () => {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0, sheenX: 50, sheenY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const sheenX = ((e.clientX - rect.left) / rect.width) * 100;
    const sheenY = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x, y, sheenX, sheenY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, sheenX: 50, sheenY: 50 });
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-950 text-white pt-24 pb-16 px-4 sm:px-8 flex flex-col justify-center items-center">
      {/* Background ambient mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[130px]" />
      </div>

      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-sky-400">
            HOLOGRAPHIC IDENTITY MATRIX
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Spatial Passport</h2>
          <p className="text-xs text-slate-400 mt-1">Hover and tilt to verify holographic security seal</p>
        </div>

        {/* 3D Holographic Passport Card */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-[1.586/1] rounded-3xl p-6 sm:p-7 select-none cursor-pointer [transform-style:preserve-3d] transition-transform duration-200"
          style={{
            perspective: "1000px",
            transform: `rotateX(${tilt.y * -20}deg) rotateY(${tilt.x * 20}deg)`,
            boxShadow: "0 25px 60px -12px rgba(0,0,0,0.8), 0 0 35px rgba(56,189,248,0.25)",
          }}
        >
          {/* Card Base Background with Micro-circuits */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-white/20">
            {/* Holographic Sheen Layer */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-60 transition-opacity"
              style={{
                background: `radial-gradient(circle at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(56,189,248,0.8) 0%, rgba(168,85,247,0.6) 35%, rgba(52,211,153,0.5) 70%, transparent 100%)`,
              }}
            />
          </div>

          {/* Card Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Orbit className="w-5 h-5 text-sky-400 animate-spin" style={{ animationDuration: "14s" }} />
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-white/90">
                  ANTIGRAVITY // PASS
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-mono text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>LEVEL 5 SEC</span>
              </div>
            </div>

            {/* Middle: Identity Name & Code */}
            <div className="my-auto pt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                CORRIDOR OPERATOR
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                NARESH
              </h3>
              <p className="text-xs font-mono text-sky-300 mt-0.5">ID: NARESH-8842-STUDIO-WARP</p>
            </div>

            {/* Bottom Row: Security Specs */}
            <div className="flex items-end justify-between border-t border-white/10 pt-3">
              <div>
                <span className="text-[9px] font-mono text-slate-400 uppercase block">ACCESS CODE</span>
                <span className="text-xs font-mono font-medium text-slate-200">#93A0-BB10-COR</span>
              </div>

              <div>
                <span className="text-[9px] font-mono text-slate-400 uppercase block text-right">CLEARANCE</span>
                <span className="text-xs font-mono font-medium text-sky-300 block text-right">UNLIMITED 3D</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">FLIGHTS</span>
            <span className="text-lg font-bold text-white block mt-0.5">142</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">ARTIFACTS</span>
            <span className="text-lg font-bold text-sky-400 block mt-0.5">28</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">CREDITS</span>
            <span className="text-lg font-bold text-emerald-400 block mt-0.5">9,420</span>
          </div>
        </div>
      </div>
    </div>
  );
};
