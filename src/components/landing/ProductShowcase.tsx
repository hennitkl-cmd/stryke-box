import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Brain, Zap, Activity } from "lucide-react";

const specs = [
  {
    icon: Cpu,
    title: "High-Frequency Sensors",
    description: "1000Hz sampling rate captures every microsecond of your strike",
  },
  {
    icon: Brain,
    title: "AI-Driven Insights",
    description: "Machine learning algorithms analyze and optimize your technique",
  },
  {
    icon: Zap,
    title: "Real-Time Feedback",
    description: "Instant metrics delivered to your coach and training app",
  },
  {
    icon: Activity,
    title: "Biometric Integration",
    description: "Heart rate, fatigue levels, and recovery metrics in one device",
  },
];

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="product" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px] translate-x-1/2" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            The Technology
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
            Built for <span className="text-gradient-red">Champions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every component engineered for elite performance. No compromises.
          </p>
        </motion.div>

        {/* Product Visual + Specs */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card p-8 md:p-12 relative">
              {/* Abstract product representation */}
              <div className="aspect-square relative flex items-center justify-center">
                {/* Outer ring */}
                <div className="absolute inset-8 rounded-full border-2 border-primary/20 animate-pulse" />
                
                {/* Middle ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="absolute inset-16 rounded-full border border-primary/40"
                  style={{
                    borderStyle: "dashed",
                  }}
                />
                
                {/* Center device representation */}
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl blur-xl" />
                  <div className="relative w-full h-full glass-card flex items-center justify-center glow-red-subtle">
                    <Zap className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                  </div>
                </div>

                {/* Floating data points */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: i * 0.5,
                    }}
                    style={{
                      top: `${20 + i * 20}%`,
                      left: i % 2 === 0 ? "10%" : "85%",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Specs Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {specs.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="glass-card p-6 h-full group hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <spec.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{spec.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {spec.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
