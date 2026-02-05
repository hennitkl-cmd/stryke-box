import { motion, useInView, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useCustomerType, CustomerType } from "@/context/CustomerTypeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import PhoneMockup, {
  BoxerTrainingScreen,
  BoxerRecoveryScreen,
  BoxerProgressScreen,
  CoachRosterScreen,
  CoachAnalyticsScreen,
  CoachInsightsScreen,
  PromoterLiveScreen,
  PromoterStatsScreen,
  PromoterEngagementScreen,
  FanCompareScreen,
  FanLiveScreen,
  FanBettingScreen,
} from "./PhoneMockup";

interface PhoneFeature {
  title: string;
  description: string;
  screen: React.ReactNode;
}

const phoneFeaturesByCustomer: Record<CustomerType, PhoneFeature[]> = {
  boxer: [
    {
      title: "At a Glance",
      description: "Track every punch, combo, and session with real-time metrics that matter.",
      screen: <BoxerTrainingScreen />,
    },
    {
      title: "Optimize Recovery",
      description: "Know when to push hard and when to rest with intelligent recovery insights.",
      screen: <BoxerRecoveryScreen />,
    },
    {
      title: "Measure Progress",
      description: "See your power, speed, and accuracy trends over weeks and months.",
      screen: <BoxerProgressScreen />,
    },
  ],
  coach: [
    {
      title: "Team Dashboard",
      description: "Monitor every fighter's status, readiness, and training load at a glance.",
      screen: <CoachRosterScreen />,
    },
    {
      title: "Training Analytics",
      description: "Balance intensity and volume across your team with objective data.",
      screen: <CoachAnalyticsScreen />,
    },
    {
      title: "AI Insights",
      description: "Spot technique flaws invisible to the eye. Get actionable recommendations.",
      screen: <CoachInsightsScreen />,
    },
  ],
  promoter: [
    {
      title: "Live Broadcast",
      description: "Display real-time punch data, speed, and power during fights.",
      screen: <PromoterLiveScreen />,
    },
    {
      title: "Event Analytics",
      description: "Track punch counts, accuracy, and excitement metrics across your card.",
      screen: <PromoterStatsScreen />,
    },
    {
      title: "Fan Engagement",
      description: "Drive social buzz and betting volume with exclusive data access.",
      screen: <PromoterEngagementScreen />,
    },
  ],
  fan: [
    {
      title: "Fighter Compare",
      description: "Head-to-head stats on power, speed, and accuracy before fights.",
      screen: <FanCompareScreen />,
    },
    {
      title: "Live Stats",
      description: "Watch fights with real-time overlay showing punch power and fatigue.",
      screen: <FanLiveScreen />,
    },
    {
      title: "Betting Edge",
      description: "Data-driven insights on KO probability, stamina trends, and more.",
      screen: <FanBettingScreen />,
    },
  ],
};

// Parallax phone component for desktop
const ParallaxPhone = ({ 
  feature, 
  yTransform, 
  isInView 
}: { 
  feature: PhoneFeature; 
  yTransform: MotionValue<number>; 
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6 }}
    className="flex flex-col items-center"
  >
    <motion.div
      style={{ y: yTransform }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="mb-6"
    >
      <PhoneMockup>{feature.screen}</PhoneMockup>
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

const FeatureGrid = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { customerType } = useCustomerType();
  const phoneFeatures = phoneFeaturesByCustomer[customerType];
  const isMobile = useIsMobile();
  
  // Carousel state for mobile
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  
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

        {/* Phone Mockups - Conditional Rendering */}
        <AnimatePresence mode="wait">
          {isMobile ? (
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
                  {phoneFeatures.map((feature) => (
                    <CarouselItem key={feature.title} className="flex justify-center">
                      <div className="flex flex-col items-center px-4">
                        <div className="mb-6">
                          <PhoneMockup>{feature.screen}</PhoneMockup>
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
                  ))}
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
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeatureGrid;
