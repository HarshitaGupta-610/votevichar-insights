import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, Eye, Plus, ChevronLeft, ChevronRight, Loader2, Download } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { useSimulations, Simulation } from "@/hooks/useSimulations";
import { useState } from "react";
import { demoSimulations } from "@/data/electionDatasets";
import { downloadPDF, InsightsPDFData } from "@/utils/pdfExport";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 5;

const History = () => {
  const { canAccessHistory, isViewOnly } = useRole();
  const { simulations, isLoading } = useSimulations();
  const [currentPage, setCurrentPage] = useState(1);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const { toast } = useToast();

  if (!canAccessHistory()) {
    return <Navigate to="/dashboard" replace />;
  }

  // Use demo data for guests, real data for logged-in users
  const displaySimulations = isViewOnly() 
    ? demoSimulations 
    : simulations;

  const totalPages = Math.ceil(displaySimulations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSimulations = displaySimulations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleExportPDF = async (sim: Simulation | typeof demoSimulations[0]) => {
    setExportingId(sim.id);
    try {
      const pdfData: InsightsPDFData = {
        scenarioName: sim.name,
        statesCount: sim.states_count,
        cycleLength: sim.cycle_length,
        costSavings: sim.cost_savings || "N/A",
        efficiency: sim.efficiency || "N/A",
        complexity: "Moderate",
        benefits: [
          "Reduced election expenditure through consolidated operations",
          "Lower personnel deployment and logistics overhead",
          "Improved policy continuity with longer stable terms",
        ],
        considerations: [
          "Constitutional amendments required for implementation",
          "Impact on state autonomy and regional representation",
          "Large-scale EVM and security coordination challenges",
        ],
        timeline: "Estimated 3-5 years for full implementation",
        prerequisites: "Political consensus, constitutional amendments",
        riskLevel: "Moderate",
      };

      await downloadPDF(pdfData, `VoteVichar_${sim.name.replace(/\s+/g, '_')}.pdf`);
      toast({
        title: "PDF Downloaded",
        description: `Report for "${sim.name}" has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate PDF.",
        variant: "destructive",
      });
    } finally {
      setExportingId(null);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Simulation History</h1>
            <p className="text-muted-foreground">
              {isViewOnly() 
                ? "Viewing demo simulations (Guest Mode)" 
                : "View all saved simulations and their results"}
            </p>
          </div>
          {!isViewOnly() && (
            <Button asChild className="gap-2">
              <Link to="/scenario-setup">
                <Plus className="w-4 h-4" />
                New Simulation
              </Link>
            </Button>
          )}
        </div>

        {/* Simulations Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              All Simulations ({displaySimulations.length})
              {isViewOnly() && <Badge variant="outline" className="ml-2">Demo Data</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && !isViewOnly() ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : displaySimulations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No simulations yet.</p>
                <Button asChild className="gap-2">
                  <Link to="/scenario-setup">
                    <Plus className="w-4 h-4" />
                    Create Your First Simulation
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Scenario Name</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead className="text-center">States</TableHead>
                      <TableHead className="text-center">Cycle</TableHead>
                      <TableHead>Cost Savings</TableHead>
                      <TableHead>Efficiency</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedSimulations.map((sim) => (
                      <TableRow key={sim.id}>
                        <TableCell className="font-medium">{sim.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {sim.model}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{sim.states_count}</TableCell>
                        <TableCell className="text-center">{sim.cycle_length} yrs</TableCell>
                        <TableCell className="text-india-green font-medium">
                          {sim.cost_savings || "—"}
                        </TableCell>
                        <TableCell>
                          {sim.efficiency ? (
                            <span className="text-india-green flex items-center gap-1">
                              <ArrowUpRight className="w-4 h-4" />
                              {sim.efficiency}
                            </span>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(sim.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={sim.status === "completed" ? "default" : "secondary"}
                            className={sim.status === "completed" ? "bg-india-green" : ""}
                          >
                            {sim.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleExportPDF(sim)}
                              disabled={exportingId === sim.id}
                            >
                              {exportingId === sim.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Download className="w-4 h-4" />
                              )}
                            </Button>
                            <Button asChild variant="ghost" size="sm" className="gap-1">
                              <Link to="/analysis">
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, displaySimulations.length)} of {displaySimulations.length}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-primary">{displaySimulations.length}</p>
            <p className="text-xs text-muted-foreground">Total Simulations</p>
          </Card>
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-india-green">
              {displaySimulations.filter((s) => s.model.includes("Full")).length}
            </p>
            <p className="text-xs text-muted-foreground">Full Sync Models</p>
          </Card>
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-saffron">
              {displaySimulations.filter((s) => s.model.includes("Partial")).length}
            </p>
            <p className="text-xs text-muted-foreground">Partial Sync Models</p>
          </Card>
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-chakra-blue">
              {displaySimulations.filter((s) => s.status === "completed").length}
            </p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default History;
