import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Cpu, Brain, Zap, Activity, MapPin, History, LucideIcon } from "lucide-react";
import strykeSensorImage from "@/assets/stryke-sensor.png";

interface SpecItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const specs: SpecItem[] = [
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
  {
    icon: MapPin,
    title: "Ring Positioning Intelligence",
    description: "Ultra-wideband sensors track your exact position with 10cm accuracy—like GPS for indoors. Analyze ring control, distance management, and movement patterns. See heatmaps showing where you throw your best punches. Pro coaches use this to improve footwork and ring generalship.",
  },
  {
    icon: History,
    title: "Complete Fight History Archive",
    description: "Every punch you've ever thrown, stored forever. Track your improvement over months and years with historical performance graphs. See your power progression, speed increases, and technique evolution. Compare your current camp to previous fight preps. Coaches can analyze long-term athlete development and identify training patterns that lead to peak performance. Your entire career in one dashboard.",
  },
];

// Feature card with expandable description
const FeatureCard = ({ 
  spec, 
  index, 
  isInView,
  expandedCard,
  setExpandedCard 
}: { 
  spec: SpecItem; 
  index: number; 
  isInView: boolean;
  expandedCard: number | null;
  setExpandedCard: (index: number | null) => void;
}) => {
  const isLongDescription = spec.description.length > 100;
  const isExpanded = expandedCard === index;
  
  return (
    <motion.div
      key={spec.title}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 20 }
      }}
      className="cursor-pointer"
    >
      <div className="glass-card p-4 h-full group hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col">
        <motion.div 
          className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-300"
          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
        >
          <spec.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
        </motion.div>
        <h3 className="font-bold text-base mb-1.5 group-hover:text-primary transition-colors duration-300">{spec.title}</h3>
        <div className="flex-1">
          <p className={`text-xs text-muted-foreground leading-relaxed transition-all duration-300 ${
            isLongDescription && !isExpanded ? 'line-clamp-3' : ''
          }`}>
            {spec.description}
          </p>
          {isLongDescription && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedCard(isExpanded ? null : index);
              }}
              className="text-primary text-xs font-semibold mt-1.5 hover:underline"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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

        {/* Two-column layout: Image left, Cards right */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Left Column - Product Image with Glow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5 flex justify-center lg:sticky lg:top-32"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75" />
              <img 
                src={strykeSensorImage} 
                alt="STRYKE sensor device" 
                className="relative w-full max-w-sm h-auto"
              />
            </div>
          </motion.div>

          {/* Right Column - Feature Cards Grid */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specs.map((spec, index) => (
              <FeatureCard
                key={spec.title}
                spec={spec}
                index={index}
                isInView={isInView}
                expandedCard={expandedCard}
                setExpandedCard={setExpandedCard}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
