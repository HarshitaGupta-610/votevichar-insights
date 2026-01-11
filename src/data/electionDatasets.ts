// ============================================
// REALISTIC ECI-BASED DATASETS
// ============================================

// DATASET A — Election Cost Baseline (in ₹ crore)
export const costBands = {
  low: { min: 8000, max: 10000, label: "Low Cost (₹8,000-10,000 Cr)" },
  medium: { min: 10000, max: 13000, label: "Medium Cost (₹10,000-13,000 Cr)" },
  high: { min: 13000, max: 17000, label: "High Cost (₹13,000-17,000 Cr)" },
};

// DATASET B — Manpower Levels
export const manpowerBands = {
  minimal: { factor: 0.7, label: "Minimal (20-30% fewer staff)" },
  standard: { factor: 1.0, label: "Standard (Normal levels)" },
  heavy: { factor: 1.35, label: "Heavy (25-40% more staff)" },
};

// DATASET C — Budget Availability (in ₹ crore)
export const budgetBands = {
  tight: { min: 6000, max: 8000, label: "Tight Budget (₹6,000-8,000 Cr)" },
  normal: { min: 9000, max: 12000, label: "Normal Budget (₹9,000-12,000 Cr)" },
  comfortable: { min: 12000, max: 15000, label: "Comfortable Budget (₹12,000-15,000 Cr)" },
  high: { min: 16000, max: 20000, label: "High Budget (₹16,000-20,000 Cr)" },
};

// DATASET D — Real ECI numbers for calculation
export const eciBaseNumbers = {
  totalConstituencies: 543,
  totalPollingStations: 1035918,
  totalEVMs: 5500000,
  averageVotersPerStation: 1200,
  securityPersonnelPerStation: 8,
  pollingStaffPerStation: 5,
  logisticsStaffPerStation: 2,
};

// Original election costs data
export const electionCostsData = [
  { name: "Lok Sabha 2019", cost: 6000, turnout: 67 },
  { name: "Lok Sabha 2014", cost: 3870, turnout: 66 },
  { name: "State Elections Avg", cost: 1200, turnout: 68 },
  { name: "Full Sync (Projected)", cost: 2800, turnout: 70 },
];

// Original manpower load data
export const manpowerLoadData = [
  { category: "Security Forces", current: 1100000, optimized: 750000 },
  { category: "Polling Staff", current: 850000, optimized: 600000 },
  { category: "Logistics Staff", current: 450000, optimized: 300000 },
];

// Original logistics movement data
export const logisticsMovementData = [
  { subject: "EVM/VVPAT Transport", current: 82, optimized: 94 },
  { subject: "Vehicle Deployment", current: 71, optimized: 89 },
  { subject: "Booth Setup", current: 78, optimized: 90 },
  { subject: "Training Cycles", current: 63, optimized: 86 },
];

// Original financial gains data
export const financialGainsData = [
  { year: "Year 1", savings: 5000 },
  { year: "Year 2", savings: 7000 },
  { year: "Year 3", savings: 7500 },
  { year: "Year 4", savings: 9500 },
  { year: "Year 5", savings: 11500 },
];

// ============================================
// SCENARIO CONFIGURATIONS
// ============================================

export interface ScenarioConfig {
  id: string;
  name: string;
  description: string;
  costSavings: string;
  efficiency: string;
  complexity: string;
  financialData: { name: string; cost: number; savings: number }[];
  workloadData: { name: string; current: number; synced: number }[];
  logisticsData: { subject: string; current: number; optimized: number }[];
  governanceData: { year: string; stability: number; efficiency: number; continuity: number }[];
  pieData: { name: string; value: number }[];
}

export const scenarios: ScenarioConfig[] = [
  {
    id: "lok-sabha-general",
    name: "General Lok Sabha Election Model",
    description: "Full national election simulation covering all 543 constituencies",
    costSavings: "₹45,000 Cr",
    efficiency: "+48%",
    complexity: "High",
    financialData: [
      { name: "Current", cost: 60000, savings: 0 },
      { name: "Partial", cost: 45000, savings: 15000 },
      { name: "Full Sync", cost: 28000, savings: 32000 },
    ],
    workloadData: [
      { name: "Personnel", current: 95, synced: 55 },
      { name: "Logistics", current: 90, synced: 50 },
      { name: "Security", current: 100, synced: 65 },
      { name: "Equipment", current: 85, synced: 40 },
    ],
    logisticsData: logisticsMovementData,
    governanceData: [
      { year: "Y1", stability: 60, efficiency: 45, continuity: 65 },
      { year: "Y2", stability: 70, efficiency: 60, continuity: 72 },
      { year: "Y3", stability: 78, efficiency: 72, continuity: 80 },
      { year: "Y4", stability: 85, efficiency: 82, continuity: 88 },
      { year: "Y5", stability: 92, efficiency: 90, continuity: 95 },
    ],
    pieData: [
      { name: "Financial", value: 40 },
      { name: "Administrative", value: 35 },
      { name: "Governance", value: 25 },
    ],
  },
  {
    id: "state-assembly-cycle",
    name: "State Assembly Cycle Model",
    description: "Regional state assembly election cycle optimization",
    costSavings: "₹18,000 Cr",
    efficiency: "+32%",
    complexity: "Moderate",
    financialData: [
      { name: "Current", cost: 35000, savings: 0 },
      { name: "Partial", cost: 28000, savings: 7000 },
      { name: "Full Sync", cost: 17000, savings: 18000 },
    ],
    workloadData: [
      { name: "Personnel", current: 75, synced: 50 },
      { name: "Logistics", current: 70, synced: 45 },
      { name: "Security", current: 80, synced: 55 },
      { name: "Equipment", current: 72, synced: 38 },
    ],
    logisticsData: [
      { subject: "EVM/VVPAT Transport", current: 75, optimized: 90 },
      { subject: "Vehicle Deployment", current: 68, optimized: 85 },
      { subject: "Booth Setup", current: 72, optimized: 88 },
      { subject: "Training Cycles", current: 60, optimized: 82 },
    ],
    governanceData: [
      { year: "Y1", stability: 68, efficiency: 52, continuity: 72 },
      { year: "Y2", stability: 74, efficiency: 64, continuity: 78 },
      { year: "Y3", stability: 80, efficiency: 72, continuity: 82 },
      { year: "Y4", stability: 84, efficiency: 80, continuity: 86 },
      { year: "Y5", stability: 88, efficiency: 85, continuity: 90 },
    ],
    pieData: [
      { name: "Financial", value: 35 },
      { name: "Administrative", value: 42 },
      { name: "Governance", value: 23 },
    ],
  },
  {
    id: "mixed-sync-6-states",
    name: "Mixed Sync Cycle (6 States Grouped)",
    description: "Synchronized elections for 6 grouped states with mixed schedules",
    costSavings: "₹12,000 Cr",
    efficiency: "+28%",
    complexity: "Moderate",
    financialData: [
      { name: "Current", cost: 25000, savings: 0 },
      { name: "Partial", cost: 20000, savings: 5000 },
      { name: "Full Sync", cost: 13000, savings: 12000 },
    ],
    workloadData: [
      { name: "Personnel", current: 70, synced: 48 },
      { name: "Logistics", current: 65, synced: 42 },
      { name: "Security", current: 75, synced: 52 },
      { name: "Equipment", current: 68, synced: 35 },
    ],
    logisticsData: [
      { subject: "EVM/VVPAT Transport", current: 78, optimized: 92 },
      { subject: "Vehicle Deployment", current: 70, optimized: 87 },
      { subject: "Booth Setup", current: 74, optimized: 89 },
      { subject: "Training Cycles", current: 62, optimized: 84 },
    ],
    governanceData: [
      { year: "Y1", stability: 70, efficiency: 55, continuity: 74 },
      { year: "Y2", stability: 76, efficiency: 65, continuity: 79 },
      { year: "Y3", stability: 81, efficiency: 73, continuity: 83 },
      { year: "Y4", stability: 85, efficiency: 80, continuity: 87 },
      { year: "Y5", stability: 89, efficiency: 86, continuity: 91 },
    ],
    pieData: [
      { name: "Financial", value: 32 },
      { name: "Administrative", value: 45 },
      { name: "Governance", value: 23 },
    ],
  },
  {
    id: "financial-manpower-high",
    name: "Financial + Manpower High-Load Scenario",
    description: "Stress test with maximum financial and personnel requirements",
    costSavings: "₹52,000 Cr",
    efficiency: "+55%",
    complexity: "Very High",
    financialData: [
      { name: "Current", cost: 75000, savings: 0 },
      { name: "Partial", cost: 55000, savings: 20000 },
      { name: "Full Sync", cost: 23000, savings: 52000 },
    ],
    workloadData: [
      { name: "Personnel", current: 100, synced: 45 },
      { name: "Logistics", current: 95, synced: 40 },
      { name: "Security", current: 100, synced: 50 },
      { name: "Equipment", current: 90, synced: 35 },
    ],
    logisticsData: [
      { subject: "EVM/VVPAT Transport", current: 85, optimized: 96 },
      { subject: "Vehicle Deployment", current: 75, optimized: 92 },
      { subject: "Booth Setup", current: 80, optimized: 94 },
      { subject: "Training Cycles", current: 65, optimized: 88 },
    ],
    governanceData: [
      { year: "Y1", stability: 55, efficiency: 40, continuity: 60 },
      { year: "Y2", stability: 68, efficiency: 58, continuity: 70 },
      { year: "Y3", stability: 78, efficiency: 72, continuity: 80 },
      { year: "Y4", stability: 86, efficiency: 84, continuity: 88 },
      { year: "Y5", stability: 94, efficiency: 92, continuity: 96 },
    ],
    pieData: [
      { name: "Financial", value: 45 },
      { name: "Administrative", value: 32 },
      { name: "Governance", value: 23 },
    ],
  },
  {
    id: "low-turnout-stress",
    name: "Low-Turnout Economic Stress Scenario",
    description: "Economic downturn simulation with reduced voter participation",
    costSavings: "₹8,500 Cr",
    efficiency: "+18%",
    complexity: "Low",
    financialData: [
      { name: "Current", cost: 20000, savings: 0 },
      { name: "Partial", cost: 16000, savings: 4000 },
      { name: "Full Sync", cost: 11500, savings: 8500 },
    ],
    workloadData: [
      { name: "Personnel", current: 60, synced: 45 },
      { name: "Logistics", current: 55, synced: 40 },
      { name: "Security", current: 65, synced: 50 },
      { name: "Equipment", current: 58, synced: 38 },
    ],
    logisticsData: [
      { subject: "EVM/VVPAT Transport", current: 70, optimized: 85 },
      { subject: "Vehicle Deployment", current: 62, optimized: 78 },
      { subject: "Booth Setup", current: 68, optimized: 82 },
      { subject: "Training Cycles", current: 55, optimized: 75 },
    ],
    governanceData: [
      { year: "Y1", stability: 72, efficiency: 58, continuity: 75 },
      { year: "Y2", stability: 76, efficiency: 65, continuity: 78 },
      { year: "Y3", stability: 79, efficiency: 70, continuity: 81 },
      { year: "Y4", stability: 82, efficiency: 75, continuity: 84 },
      { year: "Y5", stability: 85, efficiency: 80, continuity: 87 },
    ],
    pieData: [
      { name: "Financial", value: 28 },
      { name: "Administrative", value: 48 },
      { name: "Governance", value: 24 },
    ],
  },
];

// Demo simulations for guest users
export const demoSimulations = [
  {
    id: "demo-001",
    name: "Full Sync - 28 States",
    model: "Full Synchronization",
    states_count: 28,
    cycle_length: 5,
    cost_assumption: "medium",
    manpower_level: "standard",
    budget_level: "normal",
    cost_savings: "₹45,000 Cr",
    efficiency: "+48%",
    status: "completed" as const,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    user_id: "demo",
    scenario_type: "lok-sabha-general",
  },
  {
    id: "demo-002",
    name: "Partial Sync - North Region",
    model: "Partial Synchronization",
    states_count: 8,
    cycle_length: 5,
    cost_assumption: "low",
    manpower_level: "minimal",
    budget_level: "tight",
    cost_savings: "₹12,000 Cr",
    efficiency: "+22%",
    status: "completed" as const,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    user_id: "demo",
    scenario_type: "mixed-sync-6-states",
  },
  {
    id: "demo-003",
    name: "State Assembly Cycle",
    model: "State Assembly",
    states_count: 15,
    cycle_length: 5,
    cost_assumption: "medium",
    manpower_level: "standard",
    budget_level: "normal",
    cost_savings: "₹27,000 Cr",
    efficiency: "+35%",
    status: "completed" as const,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    user_id: "demo",
    scenario_type: "state-assembly-cycle",
  },
];

export const getScenarioById = (id: string): ScenarioConfig | undefined => {
  return scenarios.find(s => s.id === id);
};

export const getDefaultScenario = (): ScenarioConfig => {
  return scenarios[0];
};

// ============================================
// CALCULATION UTILITIES
// ============================================

export interface SimulationCalculationParams {
  electionModel: string;
  statesCount: number;
  cycleLength: number;
  costAssumption: string;
  manpowerLevel: string;
  budgetLevel: string;
}

export interface CalculatedResults {
  costSavings: string;
  costSavingsValue: number;
  efficiency: string;
  efficiencyValue: number;
  manpowerSaved: string;
  manpowerSavedValue: number;
  adminEfficiency: string;
  policyContinuity: string;
  financialData: { name: string; cost: number; savings: number }[];
  workloadData: { name: string; current: number; synced: number }[];
  governanceData: { year: string; stability: number; efficiency: number; continuity: number }[];
  logisticsData: { subject: string; current: number; optimized: number }[];
  pieData: { name: string; value: number }[];
  budgetRange: string;
  manpowerEstimate: string;
  costBand: string;
}

export const calculateSimulationResults = (params: SimulationCalculationParams): CalculatedResults => {
  const { electionModel, statesCount, cycleLength, costAssumption, manpowerLevel, budgetLevel } = params;

  // Base cost calculation from cost assumption
  const costBand = costBands[costAssumption as keyof typeof costBands] || costBands.medium;
  const baseCost = (costBand.min + costBand.max) / 2;

  // State factor (more states = higher cost)
  const stateFactor = statesCount / 28;

  // Model efficiency factors
  const modelFactors = {
    current: { savingsFactor: 0, efficiencyFactor: 0 },
    partial: { savingsFactor: 0.25, efficiencyFactor: 25 },
    full: { savingsFactor: 0.45, efficiencyFactor: 45 },
  };
  const modelFactor = modelFactors[electionModel as keyof typeof modelFactors] || modelFactors.current;

  // Manpower adjustment
  const mpBand = manpowerBands[manpowerLevel as keyof typeof manpowerBands] || manpowerBands.standard;

  // Budget availability
  const budgetBand = budgetBands[budgetLevel as keyof typeof budgetBands] || budgetBands.normal;

  // Calculate final metrics
  const currentCost = Math.round(baseCost * stateFactor * mpBand.factor);
  const savingsValue = Math.round(currentCost * modelFactor.savingsFactor);
  const efficiencyValue = Math.round(modelFactor.efficiencyFactor * (cycleLength / 5));
  const manpowerSavedValue = Math.round((1 - (1 / mpBand.factor)) * 100 + modelFactor.efficiencyFactor * 0.5);

  // Generate dynamic chart data based on parameters
  const financialData = [
    { name: "Current", cost: currentCost, savings: 0 },
    { name: "Partial", cost: Math.round(currentCost * 0.75), savings: Math.round(currentCost * 0.25) },
    { name: "Full Sync", cost: Math.round(currentCost * 0.55), savings: Math.round(currentCost * 0.45) },
  ];

  const workloadBase = Math.min(100, 60 + statesCount * 1.4);
  const workloadData = [
    { name: "Personnel", current: workloadBase, synced: Math.round(workloadBase * (1 - modelFactor.savingsFactor)) },
    { name: "Logistics", current: workloadBase - 5, synced: Math.round((workloadBase - 5) * (1 - modelFactor.savingsFactor)) },
    { name: "Security", current: workloadBase + 5, synced: Math.round((workloadBase + 5) * (1 - modelFactor.savingsFactor * 0.8)) },
    { name: "Equipment", current: workloadBase - 10, synced: Math.round((workloadBase - 10) * (1 - modelFactor.savingsFactor * 1.2)) },
  ];

  const governanceData = Array.from({ length: cycleLength }, (_, i) => ({
    year: `Y${i + 1}`,
    stability: Math.min(100, 55 + i * 8 + modelFactor.efficiencyFactor * 0.3),
    efficiency: Math.min(100, 40 + i * 10 + modelFactor.efficiencyFactor * 0.4),
    continuity: Math.min(100, 60 + i * 7 + modelFactor.efficiencyFactor * 0.35),
  }));

  const logisticsOptFactor = 1 + modelFactor.savingsFactor * 0.3;
  const logisticsData = [
    { subject: "EVM/VVPAT Transport", current: 82, optimized: Math.min(100, Math.round(82 * logisticsOptFactor)) },
    { subject: "Vehicle Deployment", current: 71, optimized: Math.min(100, Math.round(71 * logisticsOptFactor)) },
    { subject: "Booth Setup", current: 78, optimized: Math.min(100, Math.round(78 * logisticsOptFactor)) },
    { subject: "Training Cycles", current: 63, optimized: Math.min(100, Math.round(63 * logisticsOptFactor)) },
  ];

  const pieData = [
    { name: "Financial", value: 30 + Math.round(modelFactor.savingsFactor * 20) },
    { name: "Administrative", value: 40 - Math.round(modelFactor.savingsFactor * 10) },
    { name: "Governance", value: 30 - Math.round(modelFactor.savingsFactor * 10) },
  ];

  return {
    costSavings: `₹${savingsValue.toLocaleString("en-IN")} Cr`,
    costSavingsValue: savingsValue,
    efficiency: `+${efficiencyValue}%`,
    efficiencyValue,
    manpowerSaved: `${Math.max(0, manpowerSavedValue)}%`,
    manpowerSavedValue: Math.max(0, manpowerSavedValue),
    adminEfficiency: `+${Math.round(efficiencyValue * 0.9)}%`,
    policyContinuity: efficiencyValue > 30 ? "High" : efficiencyValue > 15 ? "Moderate" : "Low",
    financialData,
    workloadData,
    governanceData,
    logisticsData,
    pieData,
    budgetRange: budgetBand.label,
    manpowerEstimate: mpBand.label,
    costBand: costBand.label,
  };
};

// Fallback data when backend fails
export const getFallbackData = (): CalculatedResults => {
  return calculateSimulationResults({
    electionModel: "full",
    statesCount: 15,
    cycleLength: 5,
    costAssumption: "medium",
    manpowerLevel: "standard",
    budgetLevel: "normal",
  });
};
