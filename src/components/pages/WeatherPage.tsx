import * as React from "react";
import { CloudRain, Wind, Compass, Thermometer, Droplets, Sun, Sparkles } from "lucide-react";

interface WeatherStation {
  city: string;
  country: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  time: string;
  bgGradient: string;
}

const STATIONS: WeatherStation[] = [
  {
    city: "Reykjavík",
    country: "Iceland",
    temp: 2,
    condition: "Geomagnetic Aurora",
    humidity: 82,
    windSpeed: 28,
    pressure: 1012,
    uvIndex: 1,
    time: "21:40 GMT",
    bgGradient: "from-emerald-950 via-teal-900 to-slate-950",
  },
  {
    city: "Kyoto",
    country: "Japan",
    temp: 18,
    condition: "Misty Rain",
    humidity: 78,
    windSpeed: 12,
    pressure: 1018,
    uvIndex: 4,
    time: "06:40 JST",
    bgGradient: "from-indigo-950 via-slate-900 to-sky-950",
  },
  {
    city: "Atacama",
    country: "Chile",
    temp: 24,
    condition: "Crystal Clear Stellar",
    humidity: 14,
    windSpeed: 8,
    pressure: 1024,
    uvIndex: 9,
    time: "17:40 CLT",
    bgGradient: "from-amber-950 via-stone-900 to-slate-950",
  },
  {
    city: "Svalbard",
    country: "Norway",
    temp: -12,
    condition: "Polar Vortex",
    humidity: 90,
    windSpeed: 34,
    pressure: 998,
    uvIndex: 0,
    time: "22:40 CET",
    bgGradient: "from-cyan-950 via-blue-950 to-slate-950",
  },
];

export const WeatherPage: React.FC = () => {
  const [selectedStation, setSelectedStation] = React.useState(0);
  const [mouseTilt, setMouseTilt] = React.useState({ x: 0, y: 0 });

  const active = STATIONS[selectedStation];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative w-full min-h-screen text-white pt-24 pb-16 px-4 sm:px-8 flex flex-col justify-between transition-colors duration-1000 bg-gradient-to-b ${active.bgGradient}`}
    >
      {/* Ambient 3D Weather Particle Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-[120px] transition-transform duration-700"
          style={{ transform: `translate3d(${mouseTilt.x * 60}px, ${mouseTilt.y * 60}px, 0)` }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-500/20 blur-[120px] transition-transform duration-700"
          style={{ transform: `translate3d(${mouseTilt.x * -60}px, ${mouseTilt.y * -60}px, 0)` }}
        />
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mt-4">
        <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-cyan-400 flex items-center justify-center gap-2">
          <Droplets className="w-3.5 h-3.5" />
          ATMOSPHERIC BAROMETRIC OBSERVATORY
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mt-2">
          {active.city}, <span className="text-slate-400 font-normal">{active.country}</span>
        </h1>
        <p className="text-sm text-cyan-200/80 font-mono mt-1">{active.time} · {active.condition}</p>
      </div>

      {/* Main 3D Floating Weather Card */}
      <div
        className="max-w-4xl w-full mx-auto my-8"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative rounded-3xl p-6 sm:p-10 backdrop-blur-2xl bg-white/[0.07] border border-white/20
                     shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]
                     transition-transform duration-300 [transform-style:preserve-3d]"
          style={{
            transform: `rotateX(${mouseTilt.y * -14}deg) rotateY(${mouseTilt.x * 14}deg)`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Giant Temperature & Visual Icon */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl sm:text-9xl font-black tracking-tighter text-white">
                  {active.temp}°
                </span>
                <span className="text-2xl sm:text-3xl font-light text-slate-300">C</span>
              </div>
              <p className="text-lg sm:text-xl font-medium text-cyan-300 mt-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                {active.condition}
              </p>
            </div>

            {/* Right: Key Telemetry Gauges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <Wind className="w-4 h-4 text-sky-400" />
                  <span>WIND VELOCITY</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">{active.windSpeed} km/h</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <Droplets className="w-4 h-4 text-teal-400" />
                  <span>HUMIDITY</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">{active.humidity}%</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <Compass className="w-4 h-4 text-purple-400" />
                  <span>PRESSURE</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">{active.pressure} hPa</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>UV INDEX</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">{active.uvIndex} / 10</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Station Selector Bar */}
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {STATIONS.map((station, idx) => (
          <button
            key={station.city}
            type="button"
            onClick={() => setSelectedStation(idx)}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 outline-none
              ${
                selectedStation === idx
                  ? "bg-white text-slate-900 shadow-lg shadow-white/20 scale-105"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
          >
            {station.city}
          </button>
        ))}
      </div>
    </div>
  );
};
