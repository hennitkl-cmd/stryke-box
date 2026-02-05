import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PhoneMockup, { TrainingScreen, RecoveryScreen, AnalyticsScreen } from "./PhoneMockup";

interface PhoneFeature {
  title: string;
  description: string;
  screen: React.ReactNode;
}

const phoneFeatures: PhoneFeature[] = [
  {
    title: "At a Glance",
    description: "Track every punch, combo, and session with real-time metrics that matter.",
    screen: <TrainingScreen />,
  },
  {
    title: "Optimize Recovery",
    description: "Know when to push hard and when to rest with intelligent recovery insights.",
    screen: <RecoveryScreen />,
  },
  {
    title: "Measure Progress",
    description: "See your power, speed, and accuracy trends over weeks and months.",
    screen: <AnalyticsScreen />,
  },
];

const FeatureGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

        {/* Phone Mockups Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {phoneFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              {/* Phone */}
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mb-6"
              >
                <PhoneMockup>{feature.screen}</PhoneMockup>
              </motion.div>

              {/* Text content below phone */}
              <div className="text-center max-w-xs">
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
