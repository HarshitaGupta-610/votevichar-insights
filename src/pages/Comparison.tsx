import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownRight, Minus, Plus, Eye } from "lucide-react";

const simulations = [
  {
    id: 1,
    name: "Full Sync - 28 States",
    model: "Full Synchronization",
    states: 28,
    cycle: 5,
    costSavings: "₹45,000 Cr",
    efficiency: "+48%",
    date: "Jan 3, 2026",
    status: "completed",
  },
  {
    id: 2,
    name: "Partial Sync - North",
    model: "Partial Synchronization",
    states: 8,
    cycle: 5,
    costSavings: "₹12,000 Cr",
    efficiency: "+22%",
    date: "Jan 2, 2026",
    status: "completed",
  },
  {
    id: 3,
    name: "Full Sync - 15 States",
    model: "Full Synchronization",
    states: 15,
    cycle: 5,
    costSavings: "₹27,000 Cr",
    efficiency: "+35%",
    date: "Jan 1, 2026",
    status: "completed",
  },
];

const comparisonMetrics = [
  { metric: "Cost Savings", scenario1: "₹45,000 Cr", scenario2: "₹27,000 Cr", diff: "better" },
  { metric: "Manpower Reduction", scenario1: "42%", scenario2: "35%", diff: "better" },
  { metric: "Admin Efficiency", scenario1: "+48%", scenario2: "+35%", diff: "better" },
  { metric: "Implementation Time", scenario1: "4 years", scenario2: "3 years", diff: "worse" },
  { metric: "Constitutional Changes", scenario1: "Major", scenario2: "Moderate", diff: "worse" },
  { metric: "Policy Continuity", scenario1: "High", scenario2: "High", diff: "same" },
];

const Comparison = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Comparison & History</h1>
          <p className="text-muted-foreground">
            Review and compare previous simulation results
          </p>
        </div>

        {/* Previous Simulations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base">Previous Simulations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario Name</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead className="text-center">States</TableHead>
                  <TableHead className="text-center">Cycle</TableHead>
                  <TableHead>Cost Savings</TableHead>
                  <TableHead>Efficiency</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {simulations.map((sim) => (
                  <TableRow key={sim.id}>
                    <TableCell className="font-medium">{sim.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {sim.model}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{sim.states}</TableCell>
                    <TableCell className="text-center">{sim.cycle} yrs</TableCell>
                    <TableCell className="text-india-green font-medium">{sim.costSavings}</TableCell>
                    <TableCell>
                      <span className="text-india-green flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        {sim.efficiency}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link to="/analysis">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Side-by-Side Comparison */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Scenario Comparison</CardTitle>
              <div className="flex gap-2">
                <Badge className="bg-primary">Full Sync - 28 States</Badge>
                <Badge variant="outline">Full Sync - 15 States</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Metric</TableHead>
                  <TableHead className="text-center bg-primary/5">Scenario 1 (28 States)</TableHead>
                  <TableHead className="text-center">Scenario 2 (15 States)</TableHead>
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
        <div className="mt-8 flex justify-center">
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