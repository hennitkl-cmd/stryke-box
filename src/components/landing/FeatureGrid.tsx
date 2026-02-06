import { motion, useInView, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useCustomerType, CustomerType } from "@/context/CustomerTypeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Tv, BarChart3, TrendingUp, Scale, Activity, Target, LucideIcon } from "lucide-react";
import PhoneMockup, {
  BoxerTrainingScreen,
  BoxerRecoveryScreen,
  BoxerProgressScreen,
  CoachRosterScreen,
  CoachAnalyticsScreen,
  CoachInsightsScreen,
  VideoScreenProps,
} from "./PhoneMockup";

interface PhoneFeatureData {
  title: string;
  description: string;
  ScreenComponent: React.ComponentType<VideoScreenProps> | React.ComponentType;
  hasVideo?: boolean;
}

interface BenefitItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const phoneFeaturesByCustomer: Record<"boxer" | "coach", PhoneFeatureData[]> = {
  boxer: [
    {
      title: "Session Summary",
      description: "Review every session with detailed stats on duration, calories, and punch breakdown.",
      ScreenComponent: BoxerTrainingScreen,
      hasVideo: true,
    },
    {
      title: "AI Coach",
      description: "Get personalized training plans and guided exercises from your AI-powered coach.",
      ScreenComponent: BoxerRecoveryScreen,
      hasVideo: true,
    },
    {
      title: "Community Challenges",
      description: "Compete in challenges, climb leaderboards, and win prizes with fighters worldwide.",
      ScreenComponent: BoxerProgressScreen,
      hasVideo: true,
    },
  ],
  coach: [
    {
      title: "Team Dashboard",
      description: "Monitor every fighter's status, readiness, and training load at a glance.",
      ScreenComponent: CoachRosterScreen,
      hasVideo: true,
    },
    {
      title: "Training Analytics",
      description: "Balance intensity and volume across your team with objective data.",
      ScreenComponent: CoachAnalyticsScreen,
      hasVideo: true,
    },
    {
      title: "AI Insights",
      description: "Spot technique flaws invisible to the eye. Get actionable recommendations.",
      ScreenComponent: CoachInsightsScreen,
      hasVideo: true,
    },
  ],
};

const benefitsByCustomer: Record<"promoter" | "fan", BenefitItem[]> = {
  promoter: [
    {
      icon: Tv,
      title: "Live Data Overlay",
      description: "Real-time punch stats displayed during broadcasts",
    },
    {
      icon: BarChart3,
      title: "Event Analytics",
      description: "Track performance metrics across your entire fight card",
    },
    {
      icon: TrendingUp,
      title: "Revenue Growth",
      description: "Monetize exclusive data access for fans and bettors",
    },
  ],
  fan: [
    {
      icon: Scale,
      title: "Fighter Comparison",
      description: "Head-to-head stats on power, speed, and accuracy",
    },
    {
      icon: Activity,
      title: "Live Performance",
      description: "Real-time fatigue and stamina tracking during fights",
    },
    {
      icon: Target,
      title: "Betting Insights",
      description: "Data-driven KO probability and round predictions",
    },
  ],
};

// Parallax phone component for desktop
const ParallaxPhone = ({ 
  feature, 
  yTransform, 
  isInView,
  isPlaying,
  onMouseEnter,
  onMouseLeave,
}: { 
  feature: PhoneFeatureData; 
  yTransform: MotionValue<number>; 
  isInView: boolean;
  isPlaying: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const ScreenComponent = feature.ScreenComponent;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        style={{ y: yTransform }}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mb-6"
      >
        <PhoneMockup>
          {feature.hasVideo ? (
            <ScreenComponent isPlaying={isPlaying} />
          ) : (
            <ScreenComponent />
          )}
        </PhoneMockup>
      </motion.div>
      <div className="text-center max-w-xs">
        <h3 className="text-xl font-bold mb-2 text-foreground">
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

const FeatureGrid = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { customerType } = useCustomerType();
  const isMobile = useIsMobile();
  
  const showPhoneMockups = customerType === "boxer" || customerType === "coach";
  const phoneFeatures = showPhoneMockups ? phoneFeaturesByCustomer[customerType] : [];
  const benefits = !showPhoneMockups ? benefitsByCustomer[customerType as "promoter" | "fan"] : [];
  
  // Carousel state for mobile
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Hover state for desktop (controls which video plays)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeVideoIndex = hoveredIndex ?? 0; // Default to first video
  
  // Parallax scroll setup for desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Different parallax factors for each phone (left, center, right)
  const yTransform0 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yTransform1 = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const yTransform2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yTransforms = [yTransform0, yTransform1, yTransform2];
  
  // Sync carousel state
  useEffect(() => {
    if (!carouselApi) return;
    
    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6" ref={containerRef}>
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

        {/* Content - Conditional Rendering */}
        <AnimatePresence mode="wait">
          {showPhoneMockups ? (
            // Phone Mockups for Boxer and Coach
            isMobile ? (
              // Mobile: Swipeable Carousel
              <motion.div
                key={`${customerType}-carousel`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Carousel 
                  setApi={setCarouselApi} 
                  opts={{ align: "center", loop: true }}
                  className="w-full"
                >
                  <CarouselContent>
                    {phoneFeatures.map((feature, index) => {
                      const ScreenComponent = feature.ScreenComponent;
                      return (
                        <CarouselItem key={feature.title} className="flex justify-center">
                          <div className="flex flex-col items-center px-4">
                            <div className="mb-6">
                              <PhoneMockup>
                                {feature.hasVideo ? (
                                  <ScreenComponent isPlaying={index === currentSlide} />
                                ) : (
                                  <ScreenComponent />
                                )}
                              </PhoneMockup>
                            </div>
                            <div className="text-center max-w-xs">
                              <h3 className="text-xl font-bold mb-2 text-foreground">
                                {feature.title}
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
                
                {/* Dot indicators */}
                <div className="flex justify-center gap-3 mt-8">
                  {phoneFeatures.map((_, i) => (
                    <button
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        i === currentSlide 
                          ? 'bg-primary scale-110' 
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                      onClick={() => carouselApi?.scrollTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              // Desktop: Grid with Parallax
              <motion.div
                key={`${customerType}-grid`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-3 gap-8 lg:gap-12"
              >
                {phoneFeatures.map((feature, index) => (
                  <ParallaxPhone
                    key={feature.title}
                    feature={feature}
                    yTransform={yTransforms[index]}
                    isInView={isInView}
                    isPlaying={index === activeVideoIndex}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                ))}
              </motion.div>
            )
          ) : (
            // Benefits List for Promoter and Fan
            <motion.div
              key={`${customerType}-benefits`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-3 gap-6 lg:gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="glass-card p-8 group hover:border-primary/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeatureGrid;
