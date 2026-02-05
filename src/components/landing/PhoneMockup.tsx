import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
}

const PhoneMockup = ({ children, className = "" }: PhoneMockupProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Phone frame */}
      <div className="relative mx-auto w-[240px] md:w-[280px]">
        {/* Outer bezel */}
        <div className="relative rounded-[40px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 p-[3px] shadow-2xl shadow-black/50">
          {/* Inner bezel */}
          <div className="rounded-[37px] bg-gradient-to-b from-zinc-800 to-zinc-900 p-[2px]">
            {/* Screen area */}
            <div className="relative rounded-[35px] bg-background overflow-hidden">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                <div className="w-24 h-6 bg-black rounded-full flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800 ring-1 ring-zinc-700" />
                </div>
              </div>
              
              {/* Screen content */}
              <div className="aspect-[9/19.5] overflow-hidden">
                {children}
              </div>
            </div>
          </div>
        </div>
        
        {/* Side buttons */}
        <div className="absolute right-[-2px] top-28 w-[3px] h-12 bg-zinc-700 rounded-l-sm" />
        <div className="absolute left-[-2px] top-24 w-[3px] h-8 bg-zinc-700 rounded-r-sm" />
        <div className="absolute left-[-2px] top-36 w-[3px] h-14 bg-zinc-700 rounded-r-sm" />
      </div>
    </div>
  );
};

// Screen 1: Training Overview
export const TrainingScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    {/* Header */}
    <div className="text-center mb-6">
      <p className="text-xs text-muted-foreground mb-1">This Week</p>
      <h3 className="text-lg font-bold text-foreground">Training Summary</h3>
    </div>
    
    {/* Stats grid */}
    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="glass-card p-3 text-center">
        <p className="text-2xl font-black text-primary">847</p>
        <p className="text-[10px] text-muted-foreground">Total Punches</p>
      </div>
      <div className="glass-card p-3 text-center">
        <p className="text-2xl font-black text-foreground">42</p>
        <p className="text-[10px] text-muted-foreground">Avg Speed (mph)</p>
      </div>
      <div className="glass-card p-3 text-center">
        <p className="text-2xl font-black text-foreground">1,240</p>
        <p className="text-[10px] text-muted-foreground">Peak Force (N)</p>
      </div>
      <div className="glass-card p-3 text-center">
        <p className="text-2xl font-black text-foreground">86%</p>
        <p className="text-[10px] text-muted-foreground">Accuracy</p>
      </div>
    </div>
    
    {/* Mini chart placeholder */}
    <div className="glass-card p-4">
      <p className="text-xs text-muted-foreground mb-3">Weekly Activity</p>
      <div className="flex items-end justify-between gap-1 h-16">
        {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-primary/60 to-primary rounded-t"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
          <span key={i} className="text-[8px] text-muted-foreground flex-1 text-center">{day}</span>
        ))}
      </div>
    </div>
  </div>
);

// Screen 2: Recovery/Performance
export const RecoveryScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    {/* Header */}
    <div className="text-center mb-4">
      <p className="text-xs text-muted-foreground mb-1">Recovery Status</p>
      <h3 className="text-lg font-bold text-foreground">Ready to Train</h3>
    </div>
    
    {/* Circular progress */}
    <div className="relative mx-auto w-32 h-32 mb-4">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          strokeDasharray={`${78 * 2.64} ${100 * 2.64}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-foreground">78%</span>
        <span className="text-[10px] text-muted-foreground">Recovery</span>
      </div>
    </div>
    
    {/* Metrics */}
    <div className="space-y-2">
      <div className="glass-card p-3 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Sleep Quality</span>
        <span className="text-sm font-bold text-foreground">7.2h / 85%</span>
      </div>
      <div className="glass-card p-3 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">HRV Score</span>
        <span className="text-sm font-bold text-green-400">62 ms</span>
      </div>
      <div className="glass-card p-3 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Muscle Fatigue</span>
        <span className="text-sm font-bold text-yellow-400">Moderate</span>
      </div>
    </div>
  </div>
);

// Screen 3: Analytics/Progress
export const AnalyticsScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    {/* Period selector */}
    <div className="flex justify-center gap-1 mb-4">
      {['Week', 'Month', 'Year'].map((period, i) => (
        <button
          key={period}
          className={`px-4 py-1.5 rounded-full text-[10px] font-medium transition-colors ${
            i === 1
              ? 'bg-primary text-primary-foreground'
              : 'bg-white/5 text-muted-foreground'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
    
    {/* Title */}
    <div className="text-center mb-4">
      <h3 className="text-lg font-bold text-foreground">Power Trend</h3>
      <p className="text-primary text-sm font-semibold">+12% this month</p>
    </div>
    
    {/* Line chart placeholder */}
    <div className="glass-card p-4 mb-4">
      <div className="relative h-24">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-t border-white/5" />
          ))}
        </div>
        {/* Line chart path */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,70 Q20,60 40,50 T80,35 T120,40 T160,25 T200,30"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0,70 Q20,60 40,50 T80,35 T120,40 T160,25 T200,30 L200,100 L0,100 Z"
            fill="url(#lineGradient)"
          />
        </svg>
      </div>
    </div>
    
    {/* Bottom stats */}
    <div className="grid grid-cols-3 gap-2">
      <div className="text-center">
        <p className="text-lg font-bold text-foreground">1,180</p>
        <p className="text-[8px] text-muted-foreground">Avg Force (N)</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-foreground">38</p>
        <p className="text-[8px] text-muted-foreground">Avg Speed</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-foreground">89%</p>
        <p className="text-[8px] text-muted-foreground">Consistency</p>
      </div>
    </div>
  </div>
);

export default PhoneMockup;
