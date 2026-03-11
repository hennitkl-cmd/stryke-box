import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import productImage from "@/assets/stryke-product-hero.png";
import xrayImage from "@/assets/stryke-sensor-xray.png";

const ProductHero3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useState(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  });

  // Re-attach listener when api becomes available
  const setApi = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Use effect equivalent
  if (emblaApi) {
    emblaApi.off("select", onSelect);
    emblaApi.on("select", onSelect);
  }

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateY(x * 12);
    setRotateX(-y * 8);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  const slides = [
    { src: productImage, alt: "STRYKE Sensor Wrist Sleeve", blend: false },
    { src: xrayImage, alt: "STRYKE Sensor – Technical Breakdown", blend: true },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      id="product-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(0 100% 40% / 0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Product carousel with parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="relative z-10 w-[340px] md:w-[500px] lg:w-[580px]"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((slide, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full flex items-center justify-center">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-[320px] md:w-[480px] lg:w-[560px] h-auto object-contain"
                  style={{
                    filter: "drop-shadow(0 30px 60px hsl(0, 100%, 40%, 0.3))",
                    ...(slide.blend ? { mixBlendMode: "lighten" } : {}),
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Floor glow reflection */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-6 rounded-full blur-xl opacity-40"
          style={{ background: "hsl(0, 100%, 40%)" }}
        />
      </motion.div>

      {/* Dot indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-2 mt-6 z-10"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              selectedIndex === i
                ? "bg-primary w-6"
                : "bg-muted-foreground/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center mt-8 md:mt-12 px-4 z-10"
      >
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
          STRYKE <span className="text-gradient-red">Sensor</span>
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Compression Wrist Sleeve with Integrated Sensor Technology
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-muted-foreground text-xs uppercase tracking-widest">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProductHero3D;
