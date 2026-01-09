import { createContext, useContext, useState, ReactNode } from "react";

export interface SimulationParams {
  electionModel: string;
  statesCount: number;
  cycleLength: number;
  costAssumption: string;
  manpowerLevel: string;
}

export interface SimulationResult {
  id: string;
  name: string;
  model: string;
  states: number;
  cycle: number;
  costSavings: string;
  efficiency: string;
  date: string;
  status: "completed" | "pending";
  params: SimulationParams;
}

interface SimulationContextType {
  currentParams: SimulationParams | null;
  setCurrentParams: (params: SimulationParams | null) => void;
  savedSimulations: SimulationResult[];
  saveSimulation: (result: SimulationResult) => void;
  getRecentSimulations: (count: number) => SimulationResult[];
}

// Placeholder simulations for demo
const initialSimulations: SimulationResult[] = [
  {
    id: "sim-001",
    name: "Full Sync - 28 States",
    model: "Full Synchronization",
    states: 28,
    cycle: 5,
    costSavings: "₹45,000 Cr",
    efficiency: "+48%",
    date: "Jan 3, 2026",
    status: "completed",
    params: {
      electionModel: "full",
      statesCount: 28,
      cycleLength: 5,
      costAssumption: "moderate",
      manpowerLevel: "standard",
    },
  },
  {
    id: "sim-002",
    name: "Partial Sync - North",
    model: "Partial Synchronization",
    states: 8,
    cycle: 5,
    costSavings: "₹12,000 Cr",
    efficiency: "+22%",
    date: "Jan 2, 2026",
    status: "completed",
    params: {
      electionModel: "partial",
      statesCount: 8,
      cycleLength: 5,
      costAssumption: "conservative",
      manpowerLevel: "minimal",
    },
  },
  {
    id: "sim-003",
    name: "Full Sync - 15 States",
    model: "Full Synchronization",
    states: 15,
    cycle: 5,
    costSavings: "₹27,000 Cr",
    efficiency: "+35%",
    date: "Jan 1, 2026",
    status: "completed",
    params: {
      electionModel: "full",
      statesCount: 15,
      cycleLength: 5,
      costAssumption: "moderate",
      manpowerLevel: "standard",
    },
  },
  {
    id: "sim-004",
    name: "Current System Baseline",
    model: "Current System",
    states: 28,
    cycle: 5,
    costSavings: "₹0",
    efficiency: "0%",
    date: "Dec 28, 2025",
    status: "completed",
    params: {
      electionModel: "current",
      statesCount: 28,
      cycleLength: 5,
      costAssumption: "moderate",
      manpowerLevel: "standard",
    },
  },
  {
    id: "sim-005",
    name: "Partial Sync - South",
    model: "Partial Synchronization",
    states: 5,
    cycle: 4,
    costSavings: "₹8,000 Cr",
    efficiency: "+18%",
    date: "Dec 25, 2025",
    status: "completed",
    params: {
      electionModel: "partial",
      statesCount: 5,
      cycleLength: 4,
      costAssumption: "conservative",
      manpowerLevel: "minimal",
    },
  },
];

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [currentParams, setCurrentParams] = useState<SimulationParams | null>(null);
  const [savedSimulations, setSavedSimulations] = useState<SimulationResult[]>(initialSimulations);

  const saveSimulation = (result: SimulationResult) => {
    setSavedSimulations((prev) => [result, ...prev]);
  };

  const getRecentSimulations = (count: number) => {
    return savedSimulations.slice(0, count);
  };

  return (
    <SimulationContext.Provider
      value={{
        currentParams,
        setCurrentParams,
        savedSimulations,
        saveSimulation,
        getRecentSimulations,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
};
