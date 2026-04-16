import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationBadge from "./NotificationBadge";
import heroProduct from "@/assets/stryke-hero-product.webp";
import heroProduct from "@/assets/stryke-hero-product.webp";

const ProductHero3D = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <section className="relative h-screen" id="product-3d">
      <div
        className="h-full flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, hsl(0 100% 40% / 0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Hero Product Image with parallax tilt */}
        <div
          className="relative w-full max-w-2xl mx-auto px-8"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.img
            src={heroProduct}
            alt="STRYKE Sensor Sleeve"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            decoding="async"
            className="w-full h-auto object-contain"
            style={{
              filter: "drop-shadow(0 30px 60px hsl(0, 100%, 40%, 0.3))",
              transform: `perspective(800px) rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          />

          {/* Floor glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-full blur-2xl opacity-30"
            style={{ backgroundColor: "hsl(0, 100%, 40%)" }}
          />
        </div>

        {/* Product Gallery Button - nav pill style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              document
                .getElementById("product-showcase")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full border border-white/10 bg-background/80 backdrop-blur-xl px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-white/5 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2"
          >
            Product Gallery
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-4 md:mt-8 px-4"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            STRYKE <span className="text-gradient-red">Boxing Sensor</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Compression Wrist Sleeve with integrated Sensor Technology
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductHero3D;
