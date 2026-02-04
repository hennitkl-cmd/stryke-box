import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Target, Award, Bot, Activity, Zap, Trophy, Tv, Shield, DollarSign, TrendingUp, Eye, BarChart3, LucideIcon } from "lucide-react";
import { useCustomerType, CustomerType } from "@/context/CustomerTypeContext";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight: string;
}

const featuresByCustomer: Record<CustomerType, Feature[]> = {
  boxer: [
    {
      icon: Target,
      title: "Competitive Edge",
      description: "Your opponents train blind. You train with precision data that reveals every strength and weakness.",
      highlight: "Train smarter",
    },
    {
      icon: Award,
      title: "Prove Your Worth",
      description: "No more politics. Your stats speak for themselves. Let the data earn you the respect you deserve.",
      highlight: "Objective proof",
    },
    {
      icon: Bot,
      title: "24/7 AI Coach",
      description: "Get instant feedback on every technique flaw. Your personal AI coach never sleeps.",
      highlight: "Always learning",
    },
  ],
  coach: [
    {
      icon: Activity,
      title: "Objective Tracking",
      description: "Monitor every fighter's progress with strike-level precision. No more guessing games.",
      highlight: "Data-driven",
    },
    {
      icon: Zap,
      title: "Real-Time Adjustments",
      description: "See fatigue and technique breakdown as it happens. Adjust strategy before it's too late.",
      highlight: "Live insights",
    },
    {
      icon: Trophy,
      title: "Build Champions Faster",
      description: "Identify weaknesses invisible to the human eye. Accelerate your fighter's path to the top.",
      highlight: "Faster growth",
    },
  ],
  promoter: [
    {
      icon: Tv,
      title: "Broadcast Gold",
      description: "Live punch speed, force, and stats keep fans engaged. Transform every fight into a data spectacle.",
      highlight: "Fan engagement",
    },
    {
      icon: Shield,
      title: "End Controversies",
      description: "Objective data reduces rigged-fight accusations. Transparent scoring builds trust.",
      highlight: "Full transparency",
    },
    {
      icon: DollarSign,
      title: "New Revenue Streams",
      description: "Power betting markets and data licensing deals. Monetize the data your fights generate.",
      highlight: "More revenue",
    },
  ],
  fan: [
    {
      icon: TrendingUp,
      title: "Smarter Bets",
      description: "Access data bookmakers don't have—force, fatigue, patterns. Make informed decisions.",
      highlight: "Insider data",
    },
    {
      icon: Eye,
      title: "Live Insights",
      description: "Know who's winning before the judges do. Real-time analytics during every round.",
      highlight: "Real-time",
    },
    {
      icon: BarChart3,
      title: "Fighter Rankings",
      description: "Power rankings and KO probabilities backed by data. See beyond the hype.",
      highlight: "Data-backed",
    },
  ],
};

const FeatureGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { customerType } = useCustomerType();
  const features = featuresByCustomer[customerType];

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Core Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
            Train Like a <span className="text-gradient-red">Pro</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every feature designed to give you the edge. Technology that adapts to you.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {features.map((feature, index) => (
              <motion.div
                key={`${customerType}-${feature.title}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="glass-card p-8 h-full group hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>

                    {/* Highlight badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-xs font-medium text-primary">
                        {feature.highlight}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
