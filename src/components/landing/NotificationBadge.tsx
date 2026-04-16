import { motion } from "framer-motion";
import { Gift } from "lucide-react";

const NotificationBadge = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 15, delay: 1 }}
      className="absolute -top-3 -right-3 z-10"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-lg shadow-primary/30 whitespace-nowrap"
      >
        <Gift className="w-3 h-3" />
        <span>Rewards</span>
      </motion.div>
    </motion.div>
  );
};

export default NotificationBadge;
