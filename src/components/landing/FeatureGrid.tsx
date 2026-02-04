import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Zap, Target, Bot, TrendingUp, BarChart3, Timer, Search, Trophy, Tv, Scale, Wallet, Flame, Dices, Eye, LucideIcon } from "lucide-react";
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
      icon: Zap,
      title: "Competitive Edge",
      description: "Your opponents train blind. You train with precision data on every punch—speed, force, accuracy, and fatigue patterns.",
      highlight: "Train smarter",
    },
    {
      icon: Target,
      title: "Prove Your Worth",
      description: "No more politics or subjective opinions. Your punch force, speed rankings, and fight metrics speak for themselves in contract negotiations.",
      highlight: "Objective proof",
    },
    {
      icon: Bot,
      title: "24/7 AI Coaching",
      description: "Get instant feedback on technique flaws, punch combinations, and ring positioning—like having a world-class trainer analyzing every session.",
      highlight: "Always learning",
    },
    {
      icon: TrendingUp,
      title: "Measurable Progress",
      description: "See your improvement week-over-week. Track punch velocity increases, power gains, and stamina improvements with hard data.",
      highlight: "Track growth",
    },
  ],
  coach: [
    {
      icon: BarChart3,
      title: "Objective Performance Tracking",
      description: "Monitor every fighter's progress with strike-level precision. See exactly which fighters are improving and who needs attention.",
      highlight: "Data-driven",
    },
    {
      icon: Timer,
      title: "Real-Time Training Adjustments",
      description: "See fatigue, technique breakdown, and power drop-off as they happen during training. Make corrections immediately, not after reviewing video.",
      highlight: "Live insights",
    },
    {
      icon: Search,
      title: "Spot Hidden Weaknesses",
      description: "Find technique flaws invisible to the human eye. Identify which punch types are slower, weaker, or less accurate.",
      highlight: "Deep analysis",
    },
    {
      icon: Trophy,
      title: "Accelerate Development",
      description: "Use data to create personalized training programs. Know exactly what each fighter needs to work on based on their unique metrics.",
      highlight: "Faster growth",
    },
  ],
  promoter: [
    {
      icon: Tv,
      title: "Next-Gen Broadcast Experience",
      description: "Display live punch speed, impact force, and fighter biometrics on screen. Give fans NFL-style stats that keep them engaged every round.",
      highlight: "Fan engagement",
    },
    {
      icon: Scale,
      title: "Objective Scoring Support",
      description: "Reduce rigged-fight accusations with transparent, data-backed judging assistance. Show fans the numbers behind every decision.",
      highlight: "Full transparency",
    },
    {
      icon: Wallet,
      title: "Monetize Fight Data",
      description: "License real-time strike data to betting platforms, fantasy sports leagues, and media companies. Create entirely new revenue channels.",
      highlight: "More revenue",
    },
    {
      icon: Flame,
      title: "Keep Fans Hooked",
      description: "Live leaderboards, fighter power rankings, and in-fight stats create storylines that drive social media buzz and viewership.",
      highlight: "Viral moments",
    },
  ],
  fan: [
    {
      icon: Dices,
      title: "Data-Driven Betting Edge",
      description: "Access punch force, fatigue patterns, and fighting style analytics that bookmakers don't have. Bet on facts, not just records.",
      highlight: "Insider data",
    },
    {
      icon: Eye,
      title: "Real-Time Fight Analysis",
      description: "Watch fights with live overlay stats showing punch speed, power, and accuracy. Know who's winning before the judges announce it.",
      highlight: "Live insights",
    },
    {
      icon: BarChart3,
      title: "Deep Fighter Analytics",
      description: "See historical performance data, power rankings, speed leaderboards, and KO probability scores—all backed by real sensor data.",
      highlight: "Data-backed",
    },
    {
      icon: TrendingUp,
      title: "Next-Gen Betting Markets",
      description: "Bet on round-by-round metrics: 'Will Fighter A land 50+ punches this round?' or 'Will the next knockdown come from a hook or uppercut?'",
      highlight: "New markets",
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
