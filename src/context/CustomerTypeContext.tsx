import { createContext, useContext, useState, ReactNode } from "react";

export type CustomerType = "boxer" | "coach" | "promoter" | "fan";

interface CustomerTypeContextValue {
  customerType: CustomerType;
  setCustomerType: (type: CustomerType) => void;
}

const CustomerTypeContext = createContext<CustomerTypeContextValue | undefined>(undefined);

export const CustomerTypeProvider = ({ children }: { children: ReactNode }) => {
  const [customerType, setCustomerType] = useState<CustomerType>("boxer");

  return (
    <CustomerTypeContext.Provider value={{ customerType, setCustomerType }}>
      {children}
    </CustomerTypeContext.Provider>
  );
};

export const useCustomerType = () => {
  const context = useContext(CustomerTypeContext);
  if (!context) {
    throw new Error("useCustomerType must be used within a CustomerTypeProvider");
  }
  return context;
};
