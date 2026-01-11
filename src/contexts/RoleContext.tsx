import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "government" | "researcher" | "guest" | null;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  hasFullAccess: () => boolean;
  canAccessAnalysis: () => boolean;
  canExport: () => boolean;
  canAccessHistory: () => boolean;
  isViewOnly: () => boolean;
  canSaveSimulations: () => boolean;
  canModifyProfile: () => boolean;
  canSwitchRole: () => boolean;
  canVerifyAsGovernment: () => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);

  const hasFullAccess = () => role === "government";
  const canAccessAnalysis = () => role === "government" || role === "researcher";
  const canExport = () => role === "government";
  const canAccessHistory = () => role === "government" || role === "researcher";
  const isViewOnly = () => role === "guest";
  
  // Guest restrictions
  const canSaveSimulations = () => role === "government" || role === "researcher";
  const canModifyProfile = () => role === "government" || role === "researcher";
  const canSwitchRole = () => role === "government" || role === "researcher";
  const canVerifyAsGovernment = () => role === "government" || role === "researcher";

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        hasFullAccess,
        canAccessAnalysis,
        canExport,
        canAccessHistory,
        isViewOnly,
        canSaveSimulations,
        canModifyProfile,
        canSwitchRole,
        canVerifyAsGovernment,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
