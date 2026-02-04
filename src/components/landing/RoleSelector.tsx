import { motion } from "framer-motion";
import { useCustomerType, CustomerType } from "@/context/CustomerTypeContext";

const roles: { type: CustomerType; label: string }[] = [
  { type: "boxer", label: "I'm a Boxer" },
  { type: "coach", label: "I'm a Coach" },
  { type: "promoter", label: "I'm a Promoter" },
  { type: "fan", label: "I'm a Fan" },
];

const RoleSelector = () => {
  const { customerType, setCustomerType } = useCustomerType();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35 }}
      className="flex flex-wrap justify-center gap-3 pt-2"
    >
      {roles.map((role) => {
        const isSelected = customerType === role.type;
        return (
          <motion.button
            key={role.type}
            onClick={() => setCustomerType(role.type)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
              border-2 border-primary
              ${isSelected 
                ? "bg-primary text-primary-foreground" 
                : "bg-transparent text-foreground hover:bg-primary/10"
              }
            `}
          >
            {role.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default RoleSelector;
