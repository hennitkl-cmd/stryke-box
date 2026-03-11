import { motion } from "framer-motion";
import { ReactNode, useRef, useEffect } from "react";

// Universal poster/fallback for all phone mockups
import phonePoster from "@/assets/screens/phone-poster.jpg";

// Video URLs from Cloud Storage (CDN)
const VIDEO_BASE_URL = "https://wnfypheskgiavkoprtvf.supabase.co/storage/v1/object/public/videos/";
const boxerSessionVideo = `${VIDEO_BASE_URL}boxer-session.mp4`;
const boxerTrainingVideo = `${VIDEO_BASE_URL}boxer-training.mp4`;
const boxerCommunityVideo = `${VIDEO_BASE_URL}boxer-community.mp4`;
const coachDashboardVideo = `${VIDEO_BASE_URL}coach-dashboard.mp4`;
const coachAnalyticsVideo = `${VIDEO_BASE_URL}coach-analytics.mp4`;
const coachFightersVideo = `${VIDEO_BASE_URL}coach-fighters.mp4`;

export interface VideoScreenProps {
  isPlaying?: boolean;
}

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

export const BoxerTrainingScreen = ({ isPlaying = false }: VideoScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <video 
      ref={videoRef}
      src={isPlaying ? boxerSessionVideo : undefined}
      poster={boxerSessionImage}
      preload="none"
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  );
};

export const BoxerRecoveryScreen = ({ isPlaying = false }: VideoScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <video 
      ref={videoRef}
      src={isPlaying ? boxerTrainingVideo : undefined}
      poster={boxerTrainingImage}
      preload="none"
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  );
};

export const BoxerProgressScreen = ({ isPlaying = false }: VideoScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <video 
      ref={videoRef}
      src={isPlaying ? boxerCommunityVideo : undefined}
      poster={boxerCommunityImage}
      preload="none"
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  );
};

// ============ COACH SCREENS ============

export const CoachRosterScreen = ({ isPlaying = false }: VideoScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  }, [isPlaying]);
  return (
    <video ref={videoRef} src={isPlaying ? coachFightersVideo : undefined} poster={boxerSessionImage} preload="none" loop muted playsInline className="w-full h-full object-cover" />
  );
};

export const CoachAnalyticsScreen = ({ isPlaying = false }: VideoScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  }, [isPlaying]);
  return (
    <video ref={videoRef} src={isPlaying ? coachAnalyticsVideo : undefined} poster={boxerTrainingImage} preload="none" loop muted playsInline className="w-full h-full object-cover" />
  );
};

export const CoachInsightsScreen = ({ isPlaying = false }: VideoScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  }, [isPlaying]);
  return (
    <video ref={videoRef} src={isPlaying ? coachDashboardVideo : undefined} poster={boxerCommunityImage} preload="none" loop muted playsInline className="w-full h-full object-cover" />
  );
};

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
