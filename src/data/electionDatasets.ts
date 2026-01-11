// DATASET A — Election Costs (in ₹ crore)
export const electionCostsData = [
  { name: "Lok Sabha 2019", cost: 6000, turnout: 67 },
  { name: "Lok Sabha 2014", cost: 3870, turnout: 66 },
  { name: "State Elections Avg", cost: 1200, turnout: 68 },
  { name: "Full Sync (Projected)", cost: 2800, turnout: 70 },
];

// DATASET B — Manpower Load (ECI sourced pattern)
export const manpowerLoadData = [
  { category: "Security Forces", current: 1100000, optimized: 750000 },
  { category: "Polling Staff", current: 850000, optimized: 600000 },
  { category: "Logistics Staff", current: 450000, optimized: 300000 },
];

// DATASET C — Logistics Movement
export const logisticsMovementData = [
  { subject: "EVM/VVPAT Transport", current: 82, optimized: 94 },
  { subject: "Vehicle Deployment", current: 71, optimized: 89 },
  { subject: "Booth Setup", current: 78, optimized: 90 },
  { subject: "Training Cycles", current: 63, optimized: 86 },
];

// DATASET D — Financial Gains Projection
export const financialGainsData = [
  { year: "Year 1", savings: 5000 },
  { year: "Year 2", savings: 7000 },
  { year: "Year 3", savings: 7500 },
  { year: "Year 4", savings: 9500 },
  { year: "Year 5", savings: 11500 },
];

// Scenarios with their associated data transformations
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
    name: "Full Sync - 28 States (Demo)",
    model: "Full Synchronization",
    states_count: 28,
    cycle_length: 5,
    cost_assumption: "moderate",
    manpower_level: "standard",
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
    name: "Partial Sync - North Region (Demo)",
    model: "Partial Synchronization",
    states_count: 8,
    cycle_length: 5,
    cost_assumption: "conservative",
    manpower_level: "minimal",
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
    name: "State Assembly Cycle (Demo)",
    model: "State Assembly",
    states_count: 15,
    cycle_length: 5,
    cost_assumption: "moderate",
    manpower_level: "standard",
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
