import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export const AutProvider = ({ children }: { children: ReactNode }) => {
  const [isAutenticate, setIsAutenticate] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ isAutenticate, setIsAutenticate }}>
      {children}
    </AuthContext.Provider>
  );
};
