import { useState, useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageLayout from "@/components/layout/PageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight, Minus, Plus, Download, GitCompare, Loader2 } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { useSimulation } from "@/contexts/SimulationContext";
import { useSimulations, Simulation } from "@/hooks/useSimulations";
import { demoSimulations, calculateSimulationResults } from "@/data/electionDatasets";
import { downloadPDF, InsightsPDFData } from "@/utils/pdfExport";
import { useToast } from "@/hooks/use-toast";

const Comparison = () => {
  const { canAccessHistory, canExport, isViewOnly } = useRole();
  const { savedSimulations } = useSimulation();
  const { simulations } = useSimulations();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  // Use real simulations for logged-in users, demo for guests
  const displaySimulations = useMemo(() => {
    if (isViewOnly()) {
      return demoSimulations.map(sim => ({
        id: sim.id,
        name: sim.name,
        model: sim.model,
        states: sim.states_count,
        cycle: sim.cycle_length,
        costSavings: sim.cost_savings,
        efficiency: sim.efficiency,
        costAssumption: sim.cost_assumption,
        manpowerLevel: sim.manpower_level,
        budgetLevel: sim.budget_level || "normal",
      }));
    }
    
    // Map real simulations to comparison format
    if (simulations.length > 0) {
      return simulations.map(sim => ({
        id: sim.id,
        name: sim.name,
        model: sim.model,
        states: sim.states_count,
        cycle: sim.cycle_length,
        costSavings: sim.cost_savings || "N/A",
        efficiency: sim.efficiency || "N/A",
        costAssumption: sim.cost_assumption,
        manpowerLevel: sim.manpower_level,
        budgetLevel: "normal",
      }));
    }
    
    // Fallback to context saved simulations
    return savedSimulations.map(sim => ({
      id: sim.id,
      name: sim.name,
      model: sim.model,
      states: sim.states,
      cycle: sim.cycle,
      costSavings: sim.costSavings,
      efficiency: sim.efficiency,
      costAssumption: sim.params?.costAssumption || "medium",
      manpowerLevel: sim.params?.manpowerLevel || "standard",
      budgetLevel: sim.params?.budgetLevel || "normal",
    }));
  }, [isViewOnly, simulations, savedSimulations]);

  const [scenario1, setScenario1] = useState(displaySimulations[0]?.id || "");
  const [scenario2, setScenario2] = useState(displaySimulations[2]?.id || displaySimulations[1]?.id || "");

  if (!canAccessHistory()) {
    return <Navigate to="/dashboard" replace />;
  }

  const sim1 = displaySimulations.find((s) => s.id === scenario1);
  const sim2 = displaySimulations.find((s) => s.id === scenario2);

  // Generate comparison data based on selected scenarios
  const comparisonMetrics = [
    { 
      metric: "Cost Savings", 
      scenario1: sim1?.costSavings || "N/A", 
      scenario2: sim2?.costSavings || "N/A", 
      diff: "better" 
    },
    { 
      metric: "Manpower Reduction", 
      scenario1: sim1?.efficiency || "N/A", 
      scenario2: sim2?.efficiency || "N/A", 
      diff: "better" 
    },
    { 
      metric: "States Covered", 
      scenario1: sim1?.states?.toString() || "N/A", 
      scenario2: sim2?.states?.toString() || "N/A", 
      diff: sim1 && sim2 && sim1.states > sim2.states ? "better" : "worse" 
    },
    { 
      metric: "Cycle Length", 
      scenario1: `${sim1?.cycle || 0} years`, 
      scenario2: `${sim2?.cycle || 0} years`, 
      diff: "same" 
    },
    { 
      metric: "Model Type", 
      scenario1: sim1?.model || "N/A", 
      scenario2: sim2?.model || "N/A", 
      diff: "same" 
    },
    { 
      metric: "Cost Assumption", 
      scenario1: sim1?.costAssumption || "N/A", 
      scenario2: sim2?.costAssumption || "N/A", 
      diff: "same" 
    },
    { 
      metric: "Manpower Level", 
      scenario1: sim1?.manpowerLevel || "N/A", 
      scenario2: sim2?.manpowerLevel || "N/A", 
      diff: "same" 
    },
  ];

  // Chart data for comparison
  const comparisonChartData = [
    { 
      name: "Cost Savings", 
      [sim1?.name || "Scenario 1"]: parseInt(sim1?.costSavings?.replace(/[^0-9]/g, "") || "0") / 1000,
      [sim2?.name || "Scenario 2"]: parseInt(sim2?.costSavings?.replace(/[^0-9]/g, "") || "0") / 1000,
    },
    { 
      name: "States", 
      [sim1?.name || "Scenario 1"]: sim1?.states || 0,
      [sim2?.name || "Scenario 2"]: sim2?.states || 0,
    },
    { 
      name: "Efficiency (%)", 
      [sim1?.name || "Scenario 1"]: parseInt(sim1?.efficiency?.replace(/[^0-9]/g, "") || "0"),
      [sim2?.name || "Scenario 2"]: parseInt(sim2?.efficiency?.replace(/[^0-9]/g, "") || "0"),
    },
  ];

  // Dynamic trend data based on cycle length
  const maxCycle = Math.max(sim1?.cycle || 5, sim2?.cycle || 5);
  const trendData = Array.from({ length: maxCycle }, (_, i) => ({
    year: `Y${i + 1}`,
    scenario1: Math.round(10 + (i * 15) * (parseInt(sim1?.efficiency?.replace(/[^0-9]/g, "") || "20") / 30)),
    scenario2: Math.round(8 + (i * 12) * (parseInt(sim2?.efficiency?.replace(/[^0-9]/g, "") || "15") / 30)),
  }));

  const handleExportReport = async () => {
    setIsExporting(true);
    try {
      const pdfData: InsightsPDFData = {
        scenarioName: `Comparison: ${sim1?.name} vs ${sim2?.name}`,
        statesCount: Math.max(sim1?.states || 0, sim2?.states || 0),
        cycleLength: Math.max(sim1?.cycle || 5, sim2?.cycle || 5),
        costSavings: `${sim1?.costSavings} vs ${sim2?.costSavings}`,
        efficiency: `${sim1?.efficiency} vs ${sim2?.efficiency}`,
        complexity: "Comparative Analysis",
        benefits: [
          `Scenario 1 (${sim1?.name}): ${sim1?.costSavings} savings`,
          `Scenario 2 (${sim2?.name}): ${sim2?.costSavings} savings`,
          "Side-by-side comparison of election models",
        ],
        considerations: [
          "Each model has different implementation requirements",
          "Cost and manpower trade-offs vary by scenario",
          "Regional factors affect outcomes",
        ],
        timeline: "Varies by scenario",
        prerequisites: "Depends on selected model",
        riskLevel: "Comparative",
      };

      await downloadPDF(pdfData, `VoteVichar_Comparison_Report.pdf`);
      toast({
        title: "Report Downloaded",
        description: "Comparison report has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate report.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Scenario Comparison</h1>
          <p className="text-muted-foreground">
            Compare different simulation scenarios side-by-side
          </p>
        </div>

        {/* Scenario Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-primary" />
              Select Scenarios to Compare
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Scenario 1</label>
                <Select value={scenario1} onValueChange={setScenario1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select first scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {displaySimulations.map((sim) => (
                      <SelectItem key={sim.id} value={sim.id} disabled={sim.id === scenario2}>
                        {sim.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {sim1 && (
                  <Badge className="bg-primary">{sim1.name}</Badge>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Scenario 2</label>
                <Select value={scenario2} onValueChange={setScenario2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select second scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {displaySimulations.map((sim) => (
                      <SelectItem key={sim.id} value={sim.id} disabled={sim.id === scenario1}>
                        {sim.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {sim2 && (
                  <Badge variant="outline">{sim2.name}</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key Metrics Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={comparisonChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={sim1?.name || "Scenario 1"} fill="hsl(220, 60%, 35%)" />
                  <Bar dataKey={sim2?.name || "Scenario 2"} fill="hsl(145, 55%, 35%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Trend Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Projected Savings Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="scenario1" 
                    stroke="hsl(220, 60%, 35%)" 
                    strokeWidth={2}
                    name={sim1?.name || "Scenario 1"}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="scenario2" 
                    stroke="hsl(145, 55%, 35%)" 
                    strokeWidth={2}
                    name={sim2?.name || "Scenario 2"}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Side-by-Side Comparison Table */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Detailed Comparison</CardTitle>
              <div className="flex gap-2">
                {sim1 && <Badge className="bg-primary">{sim1.name}</Badge>}
                {sim2 && <Badge variant="outline">{sim2.name}</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Metric</TableHead>
                  <TableHead className="text-center bg-primary/5">Scenario 1</TableHead>
                  <TableHead className="text-center">Scenario 2</TableHead>
                  <TableHead className="text-center">Difference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonMetrics.map((row) => (
                  <TableRow key={row.metric}>
                    <TableCell className="font-medium">{row.metric}</TableCell>
                    <TableCell className="text-center bg-primary/5 font-medium">{row.scenario1}</TableCell>
                    <TableCell className="text-center">{row.scenario2}</TableCell>
                    <TableCell className="text-center">
                      {row.diff === "better" && (
                        <span className="inline-flex items-center gap-1 text-india-green">
                          <ArrowUpRight className="w-4 h-4" />
                          Better
                        </span>
                      )}
                      {row.diff === "worse" && (
                        <span className="inline-flex items-center gap-1 text-saffron">
                          <ArrowDownRight className="w-4 h-4" />
                          Trade-off
                        </span>
                      )}
                      {row.diff === "same" && (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <Minus className="w-4 h-4" />
                          Same
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          {canExport() && (
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleExportReport}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export Report
                </>
              )}
            </Button>
          )}
          <Button asChild className="gap-2">
            <Link to="/scenario-setup">
              <Plus className="w-4 h-4" />
              New Simulation
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Comparison;
