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

// ============ BOXER SCREENS ============

export const BoxerTrainingScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="text-center mb-6">
      <p className="text-xs text-muted-foreground mb-1">This Week</p>
      <h3 className="text-lg font-bold text-foreground">Training Summary</h3>
    </div>
    
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

export const BoxerRecoveryScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="text-center mb-4">
      <p className="text-xs text-muted-foreground mb-1">Recovery Status</p>
      <h3 className="text-lg font-bold text-foreground">Ready to Train</h3>
    </div>
    
    <div className="relative mx-auto w-32 h-32 mb-4">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeDasharray={`${78 * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-foreground">78%</span>
        <span className="text-[10px] text-muted-foreground">Recovery</span>
      </div>
    </div>
    
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

export const BoxerProgressScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="flex justify-center gap-1 mb-4">
      {['Week', 'Month', 'Year'].map((period, i) => (
        <button
          key={period}
          className={`px-4 py-1.5 rounded-full text-[10px] font-medium transition-colors ${
            i === 1 ? 'bg-primary text-primary-foreground' : 'bg-white/5 text-muted-foreground'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
    
    <div className="text-center mb-4">
      <h3 className="text-lg font-bold text-foreground">Power Trend</h3>
      <p className="text-primary text-sm font-semibold">+12% this month</p>
    </div>
    
    <div className="glass-card p-4 mb-4">
      <div className="relative h-24">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-t border-white/5" />
          ))}
        </div>
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="boxerLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,70 Q20,60 40,50 T80,35 T120,40 T160,25 T200,30" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M0,70 Q20,60 40,50 T80,35 T120,40 T160,25 T200,30 L200,100 L0,100 Z" fill="url(#boxerLineGradient)" />
        </svg>
      </div>
    </div>
    
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

// ============ COACH SCREENS ============

export const CoachRosterScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="text-center mb-4">
      <p className="text-xs text-muted-foreground mb-1">Team Dashboard</p>
      <h3 className="text-lg font-bold text-foreground">Active Fighters</h3>
    </div>
    
    <div className="space-y-3">
      {[
        { name: "Marcus J.", status: "Ready", power: 92, sessions: 12 },
        { name: "Derek T.", status: "Fatigued", power: 78, sessions: 8 },
        { name: "Alex R.", status: "Peak", power: 95, sessions: 15 },
      ].map((fighter, i) => (
        <div key={i} className="glass-card p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-foreground">{fighter.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              fighter.status === 'Peak' ? 'bg-green-500/20 text-green-400' :
              fighter.status === 'Fatigued' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-primary/20 text-primary'
            }`}>{fighter.status}</span>
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Power: {fighter.power}%</span>
            <span>{fighter.sessions} sessions/mo</span>
          </div>
          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${fighter.power}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const CoachAnalyticsScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="text-center mb-4">
      <p className="text-xs text-muted-foreground mb-1">Training Load</p>
      <h3 className="text-lg font-bold text-foreground">Weekly Overview</h3>
    </div>
    
    <div className="glass-card p-4 mb-4">
      <div className="flex items-end justify-between gap-1 h-20">
        {[
          { intensity: 60, volume: 80 },
          { intensity: 75, volume: 70 },
          { intensity: 45, volume: 90 },
          { intensity: 85, volume: 60 },
          { intensity: 70, volume: 75 },
        ].map((day, i) => (
          <div key={i} className="flex-1 flex gap-0.5">
            <div className="flex-1 bg-primary/60 rounded-t" style={{ height: `${day.intensity}%` }} />
            <div className="flex-1 bg-blue-500/60 rounded-t" style={{ height: `${day.volume}%` }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[8px] text-muted-foreground">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
      </div>
    </div>
    
    <div className="flex gap-3 mb-4 text-[10px]">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded bg-primary/60" />
        <span className="text-muted-foreground">Intensity</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded bg-blue-500/60" />
        <span className="text-muted-foreground">Volume</span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      <div className="glass-card p-3 text-center">
        <p className="text-xl font-black text-foreground">3,420</p>
        <p className="text-[10px] text-muted-foreground">Total Punches</p>
      </div>
      <div className="glass-card p-3 text-center">
        <p className="text-xl font-black text-primary">94%</p>
        <p className="text-[10px] text-muted-foreground">Attendance</p>
      </div>
    </div>
  </div>
);

export const CoachInsightsScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="text-center mb-4">
      <p className="text-xs text-muted-foreground mb-1">AI Insights</p>
      <h3 className="text-lg font-bold text-foreground">Technique Analysis</h3>
    </div>
    
    <div className="space-y-3">
      <div className="glass-card p-3 border-l-2 border-yellow-400">
        <p className="text-xs font-semibold text-foreground mb-1">Derek T. - Hook Technique</p>
        <p className="text-[10px] text-muted-foreground">Elbow dropping 15° before impact. Suggest focus pads drill.</p>
      </div>
      <div className="glass-card p-3 border-l-2 border-green-400">
        <p className="text-xs font-semibold text-foreground mb-1">Marcus J. - Jab Speed</p>
        <p className="text-[10px] text-muted-foreground">+8% velocity improvement. Ready for combo advancement.</p>
      </div>
      <div className="glass-card p-3 border-l-2 border-primary">
        <p className="text-xs font-semibold text-foreground mb-1">Alex R. - Fight Ready</p>
        <p className="text-[10px] text-muted-foreground">All metrics at peak. Optimal condition for competition.</p>
      </div>
    </div>
    
    <div className="mt-4 glass-card p-3 text-center">
      <p className="text-[10px] text-muted-foreground mb-1">Team Readiness Score</p>
      <p className="text-2xl font-black text-primary">87%</p>
    </div>
  </div>
);

// ============ PROMOTER SCREENS ============

export const PromoterLiveScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="text-center mb-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 mb-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-bold text-red-400">LIVE</span>
      </div>
      <h3 className="text-lg font-bold text-foreground">Round 4</h3>
    </div>
    
    <div className="glass-card p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-center">
          <p className="text-sm font-bold text-foreground">Johnson</p>
          <p className="text-2xl font-black text-primary">127</p>
          <p className="text-[10px] text-muted-foreground">punches</p>
        </div>
        <div className="text-xl font-black text-muted-foreground">VS</div>
        <div className="text-center">
          <p className="text-sm font-bold text-foreground">Williams</p>
          <p className="text-2xl font-black text-foreground">98</p>
          <p className="text-[10px] text-muted-foreground">punches</p>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      <div className="glass-card p-3 text-center">
        <p className="text-lg font-bold text-foreground">1,340 N</p>
        <p className="text-[10px] text-muted-foreground">Hardest Punch</p>
      </div>
      <div className="glass-card p-3 text-center">
        <p className="text-lg font-bold text-foreground">45 mph</p>
        <p className="text-[10px] text-muted-foreground">Fastest Strike</p>
      </div>
    </div>
    
    <div className="mt-4 glass-card p-3">
      <p className="text-[10px] text-muted-foreground text-center mb-2">Viewer Engagement</p>
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-foreground">2.4M</span>
        <span className="text-green-400 text-[10px]">↑ 23% vs last fight</span>
      </div>
    </div>
  </div>
);

export const PromoterStatsScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="text-center mb-4">
      <p className="text-xs text-muted-foreground mb-1">Broadcast Stats</p>
      <h3 className="text-lg font-bold text-foreground">Tonight's Card</h3>
    </div>
    
    <div className="glass-card p-4 mb-4">
      <p className="text-xs text-muted-foreground mb-3">Punch Count by Fight</p>
      <div className="space-y-2">
        {[
          { fight: "Main Event", count: 425, pct: 100 },
          { fight: "Co-Main", count: 312, pct: 73 },
          { fight: "Undercard 1", count: 287, pct: 67 },
        ].map((f, i) => (
          <div key={i}>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-muted-foreground">{f.fight}</span>
              <span className="text-foreground font-bold">{f.count}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" style={{ width: `${f.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      <div className="glass-card p-3 text-center">
        <p className="text-xl font-black text-primary">$1.2M</p>
        <p className="text-[10px] text-muted-foreground">Data Revenue</p>
      </div>
      <div className="glass-card p-3 text-center">
        <p className="text-xl font-black text-foreground">89%</p>
        <p className="text-[10px] text-muted-foreground">Accuracy Rate</p>
      </div>
    </div>
  </div>
);

export const PromoterEngagementScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="text-center mb-4">
      <p className="text-xs text-muted-foreground mb-1">Fan Engagement</p>
      <h3 className="text-lg font-bold text-foreground">Live Metrics</h3>
    </div>
    
    <div className="relative mx-auto w-28 h-28 mb-4">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="6" strokeDasharray={`${92 * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-foreground">92%</span>
        <span className="text-[10px] text-muted-foreground">Engaged</span>
      </div>
    </div>
    
    <div className="space-y-2">
      <div className="glass-card p-3 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Social Mentions</span>
        <span className="text-sm font-bold text-foreground">47.2K</span>
      </div>
      <div className="glass-card p-3 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">App Downloads</span>
        <span className="text-sm font-bold text-green-400">+2,340</span>
      </div>
      <div className="glass-card p-3 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Betting Volume</span>
        <span className="text-sm font-bold text-primary">$4.8M</span>
      </div>
    </div>
  </div>
);

// ============ FAN SCREENS ============

export const FanCompareScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="text-center mb-4">
      <p className="text-xs text-muted-foreground mb-1">Fighter Comparison</p>
      <h3 className="text-lg font-bold text-foreground">Head to Head</h3>
    </div>
    
    <div className="flex justify-between items-center mb-4">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto mb-1 flex items-center justify-center">
          <span className="text-lg font-bold">MJ</span>
        </div>
        <p className="text-xs font-bold text-foreground">Johnson</p>
      </div>
      <span className="text-muted-foreground text-sm font-bold">VS</span>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-blue-500/20 mx-auto mb-1 flex items-center justify-center">
          <span className="text-lg font-bold">DW</span>
        </div>
        <p className="text-xs font-bold text-foreground">Williams</p>
      </div>
    </div>
    
    <div className="space-y-3">
      {[
        { stat: "Punch Power", a: 92, b: 87 },
        { stat: "Speed", a: 85, b: 91 },
        { stat: "Accuracy", a: 78, b: 82 },
      ].map((row, i) => (
        <div key={i} className="glass-card p-2">
          <p className="text-[10px] text-muted-foreground text-center mb-2">{row.stat}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary w-8">{row.a}%</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden flex">
              <div className="h-full bg-primary" style={{ width: `${row.a}%` }} />
            </div>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden flex justify-end">
              <div className="h-full bg-blue-500" style={{ width: `${row.b}%` }} />
            </div>
            <span className="text-xs font-bold text-blue-400 w-8 text-right">{row.b}%</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const FanLiveScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="text-center mb-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 mb-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-bold text-green-400">LIVE STATS</span>
      </div>
      <h3 className="text-lg font-bold text-foreground">Round 6</h3>
    </div>
    
    <div className="glass-card p-4 mb-4">
      <div className="text-center">
        <p className="text-[10px] text-muted-foreground mb-1">Last Punch Power</p>
        <p className="text-4xl font-black text-primary">1,247 N</p>
        <p className="text-green-400 text-xs mt-1">97th percentile</p>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="glass-card p-3 text-center">
        <p className="text-lg font-bold text-foreground">43 mph</p>
        <p className="text-[10px] text-muted-foreground">Current Speed</p>
      </div>
      <div className="glass-card p-3 text-center">
        <p className="text-lg font-bold text-yellow-400">72%</p>
        <p className="text-[10px] text-muted-foreground">Stamina</p>
      </div>
    </div>
    
    <div className="glass-card p-3">
      <p className="text-[10px] text-muted-foreground mb-2">Fatigue Trend</p>
      <div className="flex items-end justify-between gap-0.5 h-8">
        {[95, 92, 88, 85, 79, 72].map((h, i) => (
          <div key={i} className="flex-1 bg-gradient-to-t from-yellow-500/60 to-green-500/60 rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="flex justify-between mt-1 text-[8px] text-muted-foreground">
        <span>R1</span><span>R2</span><span>R3</span><span>R4</span><span>R5</span><span>R6</span>
      </div>
    </div>
  </div>
);

export const FanBettingScreen = () => (
  <div className="h-full bg-gradient-to-b from-zinc-900 to-background p-4 pt-12">
    <div className="text-center mb-4">
      <p className="text-xs text-muted-foreground mb-1">Smart Betting</p>
      <h3 className="text-lg font-bold text-foreground">Data Edge</h3>
    </div>
    
    <div className="glass-card p-4 mb-4 border border-primary/30">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-primary">🔥 Hot Insight</span>
        <span className="text-[10px] text-muted-foreground">2m ago</span>
      </div>
      <p className="text-xs text-foreground">Williams punch output down 23% in rounds 5-6. Historical pattern suggests stamina fade.</p>
    </div>
    
    <div className="space-y-2">
      <div className="glass-card p-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">KO Probability</span>
          <span className="text-sm font-bold text-primary">34%</span>
        </div>
      </div>
      <div className="glass-card p-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Decision Likely</span>
          <span className="text-sm font-bold text-foreground">58%</span>
        </div>
      </div>
      <div className="glass-card p-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Over 8.5 Rounds</span>
          <span className="text-sm font-bold text-green-400">72%</span>
        </div>
      </div>
    </div>
    
    <div className="mt-4 text-center">
      <p className="text-[10px] text-muted-foreground">Updated every 30 seconds</p>
    </div>
  </div>
);

export default PhoneMockup;
