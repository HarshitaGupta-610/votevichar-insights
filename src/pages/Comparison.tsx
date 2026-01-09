import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageLayout from "@/components/layout/PageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight, Minus, Plus, Download, GitCompare } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { useSimulation } from "@/contexts/SimulationContext";

const Comparison = () => {
  const { canAccessHistory, canExport } = useRole();
  const { savedSimulations } = useSimulation();
  const [scenario1, setScenario1] = useState(savedSimulations[0]?.id || "");
  const [scenario2, setScenario2] = useState(savedSimulations[2]?.id || "");

  if (!canAccessHistory()) {
    return <Navigate to="/dashboard" replace />;
  }

  const sim1 = savedSimulations.find((s) => s.id === scenario1);
  const sim2 = savedSimulations.find((s) => s.id === scenario2);

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
      scenario1: sim1?.states.toString() || "N/A", 
      scenario2: sim2?.states.toString() || "N/A", 
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

  const trendData = [
    { year: "Y1", scenario1: 10, scenario2: 8 },
    { year: "Y2", scenario1: 25, scenario2: 18 },
    { year: "Y3", scenario1: 42, scenario2: 30 },
    { year: "Y4", scenario1: 58, scenario2: 42 },
    { year: "Y5", scenario1: 75, scenario2: 55 },
  ];

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
                    {savedSimulations.map((sim) => (
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
                    {savedSimulations.map((sim) => (
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
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
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
