import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import RoleSelector from "./RoleSelector";
import { useCustomerType, CustomerType } from "@/context/CustomerTypeContext";
const heroContent: Record<CustomerType, {
  headline: string;
  subheadline: string;
  ctaText: string;
}> = {
  boxer: {
    headline: "BECOME UNDENIABLE",
    subheadline: "Hard data proves your power. Objective metrics earn respect. Real-time feedback sharpens every strike.",
    ctaText: "Join the Waitlist"
  },
  coach: {
    headline: "COACH WITH CERTAINTY",
    subheadline: "Stop guessing. Start measuring. Turn your fighters into data-driven champions with objective performance tracking.",
    ctaText: "Request Demo"
  },
  promoter: {
    headline: "THE FUTURE OF FIGHT ENTERTAINMENT",
    subheadline: "Live strike data. Transparent scoring. Unmatched fan engagement. This is boxing reimagined for the data-driven era.",
    ctaText: "Partner With Us"
  },
  fan: {
    headline: "BET ON SCIENCE, NOT HYPE",
    subheadline: "Get real-time strike data, fighter biometrics, and performance analytics before anyone else. Know what the bookmakers don't.",
    ctaText: "Get Early Access"
  }
};
const Hero = () => {
  const {
    customerType
  } = useCustomerType();
  const content = heroContent[customerType];
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
      backgroundSize: '50px 50px'
    }} />

      {/* Red glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        ease: "easeOut"
      }} className="space-y-8">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass font-medium text-muted-foreground text-lg">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Elite Boxing Wearable Technology
            </span>
          </motion.div>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h1 key={customerType} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -10
          }} transition={{
            duration: 0.3
          }} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-gradient-red">
              {content.headline}
            </motion.h1>
          </AnimatePresence>

          {/* Role Selector */}
          <RoleSelector />

          {/* Subheadline - Dynamic */}
          <AnimatePresence mode="wait">
            <motion.p key={customerType} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -10
          }} transition={{
            duration: 0.3
          }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {content.subheadline}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <AnimatePresence mode="wait">
              <motion.div key={customerType} initial={{
              opacity: 0,
              scale: 0.95
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0.95
            }} transition={{
              duration: 0.3
            }} whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.98
            }}>
                <Button size="lg" onClick={() => scrollToSection("cta")} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg glow-red animate-pulse-glow">
                  {content.ctaText}
                </Button>
              </motion.div>
            </AnimatePresence>
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.98
          }}>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("product")} className="border-border hover:bg-secondary text-foreground font-semibold px-8 py-6 text-lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1,
        duration: 0.8
      }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{
          y: [0, 10, 0]
        }} transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }} className="cursor-pointer" onClick={() => scrollToSection("product")}>
            <ChevronDown className="w-8 h-8 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default Hero;