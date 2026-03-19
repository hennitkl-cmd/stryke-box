import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-stryke.png";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["Product", "Science", "Features"];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        {/* Floating pill container */}
        <div
          className={`mx-auto max-w-5xl rounded-full border border-white/10 bg-background/80 backdrop-blur-xl transition-all duration-300 ${
            scrolled ? "shadow-lg shadow-black/20" : ""
          }`}
        >
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img src={logo} alt="STRYKE" className="h-8 w-auto" />
                <span className="text-lg font-black tracking-tight text-foreground">
                  STRYKE
                </span>
              </motion.div>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>

              {/* Desktop CTA Button - Outline style */}
              <motion.div
                className="hidden md:block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => scrollToSection("cta")}
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
                >
                  Join Waitlist
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative pt-24 px-6 flex flex-col items-center gap-8"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                >
                  {item}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-4"
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("cta")}
                  className="rounded-full border-white/20 bg-transparent hover:bg-white/5 hover:border-white/30 text-foreground font-bold px-8 py-6 text-lg"
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
