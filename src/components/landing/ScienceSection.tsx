import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, Zap, Activity, Crosshair } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Generate dynamic data for charts
const generateVelocityData = () =>
  Array.from({ length: 12 }, (_, i) => ({
    time: i,
    velocity: 40 + Math.sin(i * 0.8) * 20 + Math.random() * 10,
  }));

const generateForceData = () =>
  Array.from({ length: 12 }, (_, i) => ({
    time: i,
    force: 200 + Math.cos(i * 0.6) * 80 + Math.random() * 40,
  }));

const accuracyMetrics = [
  { label: "Jab Accuracy", value: 94 },
  { label: "Cross Precision", value: 87 },
  { label: "Hook Timing", value: 91 },
  { label: "Overall Score", value: 92 },
];

const ScienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [velocityData, setVelocityData] = useState(generateVelocityData());
  const [forceData, setForceData] = useState(generateForceData());

  // Animate data when in view
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setVelocityData(generateVelocityData());
        setForceData(generateForceData());
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Latest metric values for header chips
  const latestVelocity = Math.round(
    velocityData[velocityData.length - 1]?.velocity || 0
  );
  const latestForce = Math.round(
    forceData[forceData.length - 1]?.force || 0
  );
  const accuracyAvg = Math.round(
    accuracyMetrics.reduce((s, m) => s + m.value, 0) / accuracyMetrics.length
  );

  // Shared chart card class — adds the soft blue glow that pulses while in view
  const cardClass =
    "glass-card p-6 relative transition-shadow duration-700 " +
    (isInView
      ? "shadow-[0_0_40px_-12px_hsl(215_100%_31%/0.45)] hover:shadow-[0_0_60px_-12px_hsl(215_100%_31%/0.6)]"
      : "shadow-none");

  return (
    <section
      id="science"
      className="py-24 md:py-32 relative overflow-hidden bg-secondary/30"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] translate-x-1/3 translate-y-1/3" />

      {/* Reusable SVG defs (glow filter + gradients) — defined once at root */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="blue-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="blue-glow-soft"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="container mx-auto px-6 relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Data-Driven Performance
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
            The Science of the{" "}
            <span className="text-gradient-red">Strike</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every punch analyzed. Every pattern identified. Your path to
            perfection, visualized.
          </p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Velocity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cardClass}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Punch Velocity</h3>
              </div>
              <motion.span
                key={latestVelocity}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-primary text-2xl font-black drop-shadow-[0_0_8px_hsl(215_100%_31%/0.7)]"
              >
                {latestVelocity} mph
              </motion.span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={velocityData}>
                  <defs>
                    <linearGradient
                      id="velocityStroke"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="hsl(215 100% 45%)" />
                      <stop offset="100%" stopColor="hsl(215 100% 60%)" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis hide domain={[20, 80]} />
                  <Tooltip
                    cursor={{
                      stroke: "hsl(215 100% 45%)",
                      strokeWidth: 1,
                      strokeDasharray: "3 3",
                    }}
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 4%)",
                      border: "1px solid hsl(215 100% 31% / 0.4)",
                      borderRadius: "8px",
                      boxShadow: "0 0 20px hsl(215 100% 31% / 0.25)",
                    }}
                    labelStyle={{ color: "hsl(0 0% 60%)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="velocity"
                    stroke="url(#velocityStroke)"
                    strokeWidth={3}
                    dot={false}
                    isAnimationActive={isInView}
                    animationBegin={300}
                    animationDuration={1400}
                    animationEasing="ease-out"
                    filter="url(#blue-glow)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Real-time velocity tracking across your training session
            </p>
          </motion.div>

          {/* Force Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className={cardClass}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Impact Force</h3>
              </div>
              <motion.span
                key={latestForce}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-primary text-2xl font-black drop-shadow-[0_0_8px_hsl(215_100%_31%/0.7)]"
              >
                {latestForce} N
              </motion.span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forceData}>
                  <defs>
                    <linearGradient id="forceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="hsl(215 100% 40%)"
                        stopOpacity={0.55}
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(215 100% 40%)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="forceStroke"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="hsl(215 100% 50%)" />
                      <stop offset="100%" stopColor="hsl(200 100% 60%)" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis hide domain={[100, 350]} />
                  <Tooltip
                    cursor={{
                      stroke: "hsl(215 100% 45%)",
                      strokeWidth: 1,
                      strokeDasharray: "3 3",
                    }}
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 4%)",
                      border: "1px solid hsl(215 100% 31% / 0.4)",
                      borderRadius: "8px",
                      boxShadow: "0 0 20px hsl(215 100% 31% / 0.25)",
                    }}
                    labelStyle={{ color: "hsl(0 0% 60%)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="force"
                    stroke="url(#forceStroke)"
                    strokeWidth={2.5}
                    fill="url(#forceGradient)"
                    isAnimationActive={isInView}
                    animationBegin={500}
                    animationDuration={1400}
                    animationEasing="ease-out"
                    filter="url(#blue-glow)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Force metrics measuring raw power output
            </p>
          </motion.div>

          {/* Accuracy Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={cardClass}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Crosshair className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Accuracy Tracking</h3>
              </div>
              <span className="text-primary text-2xl font-black drop-shadow-[0_0_8px_hsl(215_100%_31%/0.7)]">
                {accuracyAvg}%
              </span>
            </div>
            <div className="space-y-5">
              {accuracyMetrics.map((metric, index) => (
                <div key={metric.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {metric.label}
                    </span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.9 + index * 0.12, duration: 0.4 }}
                      className="text-sm font-semibold text-foreground"
                    >
                      {metric.value}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${metric.value}%` } : {}}
                      transition={{
                        duration: 1.2,
                        delay: 0.7 + index * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400 shadow-[0_0_10px_hsl(215_100%_45%/0.7)]"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Precision metrics for technique refinement
            </p>
          </motion.div>
        </div>

        {/* More Features Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex justify-center mt-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(215_100%_45%/0.9)]" />
            And a lot of other features
            <ChevronDown className="w-4 h-4" />
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default ScienceSection;
