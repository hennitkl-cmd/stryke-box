import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationBadge from "./NotificationBadge";
import heroProduct from "@/assets/peak-hero-product.png";

type Metric = {
  label: string;
  value: string;
  unit: string;
  progress: number;
};

const metrics: Metric[] = [
  { label: "Punch Velocity", value: "68", unit: "MPH", progress: 72 },
  { label: "Impact Force", value: "312", unit: "KG", progress: 84 },
  { label: "Heart Rate", value: "148", unit: "BPM", progress: 62 },
  { label: "Accuracy", value: "94", unit: "%", progress: 94 },
];

const cardPositions = [
  "absolute top-[22%] left-0 md:left-[-4%]",
  "absolute top-[22%] right-0 md:right-[-4%]",
  "absolute bottom-[10%] left-0 md:left-[-4%]",
  "absolute bottom-[10%] right-0 md:right-[-4%]",
];

const MetricCard = ({
  metric,
  delay,
  floatDuration,
}: {
  metric: Metric;
  delay: number;
  floatDuration: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className="rounded-xl border border-primary/20 bg-background/40 backdrop-blur-xl px-4 py-3 min-w-[140px] shadow-[0_0_30px_hsl(var(--primary)/0.25)]"
    >
      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
        {metric.label}
      </p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl md:text-3xl font-black text-primary">
          {metric.value}
        </span>
        <span className="text-xs text-muted-foreground font-semibold">
          {metric.unit}
        </span>
      </div>
      <div className="mt-2 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${metric.progress}%` }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 100%)",
            boxShadow: "0 0 8px hsl(var(--primary) / 0.8)",
          }}
        />
      </div>
    </motion.div>
  </motion.div>
);

const orbitConfigs = [
  { radius: 200, duration: 18, size: 3, opacity: 0.8, startAngle: 0 },
  { radius: 240, duration: 24, size: 2, opacity: 0.5, startAngle: 60 },
  { radius: 180, duration: 14, size: 4, opacity: 0.7, startAngle: 120 },
  { radius: 300, duration: 28, size: 2, opacity: 0.4, startAngle: 200 },
  { radius: 220, duration: 20, size: 3, opacity: 0.6, startAngle: 280 },
  { radius: 340, duration: 32, size: 2, opacity: 0.35, startAngle: 30 },
  { radius: 260, duration: 22, size: 3, opacity: 0.5, startAngle: 150 },
  { radius: 380, duration: 36, size: 2, opacity: 0.3, startAngle: 250 },
  { radius: 160, duration: 12, size: 2, opacity: 0.6, startAngle: 90 },
  { radius: 290, duration: 26, size: 3, opacity: 0.45, startAngle: 330 },
  { radius: 210, duration: 19, size: 2, opacity: 0.55, startAngle: 210 },
  { radius: 320, duration: 30, size: 3, opacity: 0.4, startAngle: 70 },
];

const OrbitingDots = () => (
  <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
    {orbitConfigs.map((c, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          width: c.radius * 2,
          height: c.radius * 2,
          rotate: `${c.startAngle}deg`,
        }}
        animate={{ rotate: c.startAngle + 360 }}
        transition={{ duration: c.duration, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full"
          style={{
            width: c.size,
            height: c.size,
            backgroundColor: "hsl(var(--primary))",
            opacity: c.opacity,
            boxShadow: "0 0 8px hsl(var(--primary) / 0.8)",
          }}
        />
      </motion.div>
    ))}
  </div>
);

const ProductHero3D = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <section className="relative h-screen" id="product-3d">
      <div className="h-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, hsl(215 100% 31% / 0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Orbiting particle dots */}
        <OrbitingDots />

        {/* Hero Product Image with parallax tilt + floating cards */}
        <div
          className="relative w-full max-w-3xl mx-auto px-8"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Desktop floating metric cards */}
          <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">
            {metrics.map((m, i) => (
              <div key={m.label} className={cardPositions[i]}>
                <MetricCard
                  metric={m}
                  delay={0.4 + i * 0.15}
                  floatDuration={4 + i * 0.6}
                />
              </div>
            ))}
          </div>

          <motion.img
            src={heroProduct}
            alt="PEAK Sensor Sleeve"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            decoding="async"
            className="relative z-10 w-full h-auto object-contain"
            style={{
              filter: "drop-shadow(0 30px 60px hsl(215, 100%, 31%, 0.35))",
              transform: `perspective(800px) rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          />

          {/* Floor glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-full blur-2xl opacity-30"
            style={{ backgroundColor: "hsl(215, 100%, 31%)" }}
          />
        </div>

        {/* Mobile metric grid */}
        <div className="md:hidden grid grid-cols-2 gap-3 px-6 mt-6 w-full max-w-sm relative z-20">
          {metrics.map((m, i) => (
            <MetricCard
              key={m.label}
              metric={m}
              delay={0.4 + i * 0.1}
              floatDuration={4 + i * 0.5}
            />
          ))}
        </div>

        {/* Product Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-4 relative z-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              document
                .getElementById("product-showcase")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full border border-white/10 bg-background/80 backdrop-blur-xl px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-white/5 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2"
          >
            Product Gallery
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-4 md:mt-8 px-4 relative z-20"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            PEAK <span className="text-gradient-red">Boxing Sensor</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Compression Wrist Sleeve with integrated Sensor Technology
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 relative inline-block"
          >
            <NotificationBadge />
            <Button
              size="lg"
              onClick={() =>
                document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg rounded-full"
            >
              Join Waitlist
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductHero3D;
