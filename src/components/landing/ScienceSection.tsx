import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

  return (
    <section id="science" className="py-24 md:py-32 relative overflow-hidden bg-secondary/30">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-x-1/2" />

      <div className="container mx-auto px-6" ref={ref}>
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
            The Science of the <span className="text-gradient-red">Strike</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every punch analyzed. Every pattern identified. Your path to perfection, visualized.
          </p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Velocity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Punch Velocity</h3>
              <span className="text-primary text-2xl font-black">
                {Math.round(velocityData[velocityData.length - 1]?.velocity || 0)} mph
              </span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={velocityData}>
                  <XAxis dataKey="time" hide />
                  <YAxis hide domain={[20, 80]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 4%)",
                      border: "1px solid hsl(0 0% 14%)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(0 0% 60%)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="velocity"
                    stroke="hsl(0 100% 40%)"
                    strokeWidth={3}
                    dot={false}
                    animationDuration={500}
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
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Impact Force</h3>
              <span className="text-primary text-2xl font-black">
                {Math.round(forceData[forceData.length - 1]?.force || 0)} N
              </span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forceData}>
                  <defs>
                    <linearGradient id="forceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(0 100% 40%)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(0 100% 40%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis hide domain={[100, 350]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 4%)",
                      border: "1px solid hsl(0 0% 14%)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(0 0% 60%)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="force"
                    stroke="hsl(0 100% 40%)"
                    strokeWidth={2}
                    fill="url(#forceGradient)"
                    animationDuration={500}
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold text-lg mb-6">Accuracy Tracking</h3>
            <div className="space-y-5">
              {accuracyMetrics.map((metric, index) => (
                <div key={metric.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <span className="text-sm font-semibold">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${metric.value}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full"
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
      </div>
    </section>
  );
};

export default ScienceSection;
