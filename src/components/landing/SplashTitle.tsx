import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const SplashTitle = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Block scrolling while splash is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    const handleClick = () => {
      setIsVisible(false);
    };

    window.addEventListener("click", handleClick);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background cursor-pointer"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-gradient-red text-center px-6 max-w-4xl"
          >
            Don't just watch the fight.
            <br />
            Read it.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-10 text-muted-foreground text-sm"
          >
            Click to continue
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashTitle;
