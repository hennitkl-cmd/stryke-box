import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Cpu, Brain, Zap, Activity, MapPin, History, LucideIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

import galleryDetail from "@/assets/gallery/gallery-detail.webp";
import galleryCloseup from "@/assets/gallery/gallery-closeup.webp";
import gallerySensor from "@/assets/gallery/gallery-sensor.webp";
import galleryFloating from "@/assets/gallery/gallery-floating.webp";

interface SpecItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const specs: SpecItem[] = [
  { icon: Cpu, title: "High-Frequency Sensors", description: "1000Hz sampling rate captures every microsecond of your strike" },
  { icon: Brain, title: "AI-Driven Insights", description: "Machine learning algorithms analyze and optimize your technique" },
  { icon: Zap, title: "Real-Time Feedback", description: "Instant metrics delivered to your coach and training app" },
  { icon: Activity, title: "Biometric Integration", description: "Heart rate, fatigue levels, and recovery metrics in one device" },
  { icon: MapPin, title: "Ring Positioning Intelligence", description: "Ultra-wideband sensors track your exact position with 10cm accuracy—like GPS for indoors. Analyze ring control, distance management, and movement patterns." },
  { icon: History, title: "Complete Fight History Archive", description: "Every punch you've ever thrown, stored forever. Track your improvement over months and years with historical performance graphs." },
];

const slides = [
  { src: galleryDetail, alt: "STRYKE sensor detailed diagram" },
  { src: galleryCloseup, alt: "STRYKE sensor close-up" },
  { src: gallerySensor, alt: "STRYKE sensor technology" },
  { src: galleryFloating, alt: "STRYKE sensor floating view" },
];

const FeatureCard = ({ spec, index, isInView }: { spec: SpecItem; index: number; isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
    whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 20 } }}
  >
    <div className="glass-card p-4 h-full group hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-300">
        <spec.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
      </div>
      <h3 className="font-bold text-base mb-1.5 group-hover:text-primary transition-colors duration-300">{spec.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{spec.description}</p>
    </div>
  </motion.div>
);

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const carouselRef = useRef(null);
  const isCarouselInView = useInView(carouselRef, { margin: "-50px" });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api, onSelect]);

  // Auto-advance
  useEffect(() => {
    if (!api || isPaused || !isCarouselInView) return;
    const interval = setInterval(() => api.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [api, isPaused, isCarouselInView]);

  return (
    <section id="product-showcase" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px] translate-x-1/2" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">The Technology</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
            Built for <span className="text-gradient-red">Champions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every component engineered for elite performance. No compromises.
          </p>
        </motion.div>

        {/* Slideshow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={carouselRef}
          className="max-w-3xl mx-auto mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {slides.map((slide, i) => (
                <CarouselItem key={i}>
                  <div className="glass-card p-4 overflow-hidden">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto rounded-xl object-cover aspect-[16/10]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-border bg-card text-foreground hover:bg-secondary -left-5" />
            <CarouselNext className="border-border bg-card text-foreground hover:bg-secondary -right-5" />
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary scale-125" : "bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specs.map((spec, index) => (
            <FeatureCard key={spec.title} spec={spec} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
