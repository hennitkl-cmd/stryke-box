import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Brain, Zap, Activity } from "lucide-react";
import strykeSensorImage from "@/assets/stryke-sensor.png";

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
            <div className="relative">
              <img 
                src={strykeSensorImage} 
                alt="STRYKE sensor device" 
                className="w-4/5 h-auto mx-auto"
              />
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
