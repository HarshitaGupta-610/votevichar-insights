import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, Eye, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { useSimulation } from "@/contexts/SimulationContext";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;

const History = () => {
  const { canAccessHistory } = useRole();
  const { savedSimulations } = useSimulation();
  const [currentPage, setCurrentPage] = useState(1);

  if (!canAccessHistory()) {
    return <Navigate to="/dashboard" replace />;
  }

  const totalPages = Math.ceil(savedSimulations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSimulations = savedSimulations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Simulation History</h1>
            <p className="text-muted-foreground">
              View all saved simulations and their results
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link to="/scenario-setup">
              <Plus className="w-4 h-4" />
              New Simulation
            </Link>
          </Button>
        </div>

        {/* Simulations Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              All Simulations ({savedSimulations.length})
            </CardTitle>
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
                    <TableCell className="text-center">{sim.states}</TableCell>
                    <TableCell className="text-center">{sim.cycle} yrs</TableCell>
                    <TableCell className="text-india-green font-medium">{sim.costSavings}</TableCell>
                    <TableCell>
                      <span className="text-india-green flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        {sim.efficiency}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{sim.date}</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={sim.status === "completed" ? "default" : "secondary"}
                        className={sim.status === "completed" ? "bg-india-green" : ""}
                      >
                        {sim.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm" className="gap-1">
                        <Link to="/analysis">
                          <Eye className="w-4 h-4" />
                          View Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, savedSimulations.length)} of {savedSimulations.length}
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
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-primary">{savedSimulations.length}</p>
            <p className="text-xs text-muted-foreground">Total Simulations</p>
          </Card>
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-india-green">
              {savedSimulations.filter((s) => s.model === "Full Synchronization").length}
            </p>
            <p className="text-xs text-muted-foreground">Full Sync Models</p>
          </Card>
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-saffron">
              {savedSimulations.filter((s) => s.model === "Partial Synchronization").length}
            </p>
            <p className="text-xs text-muted-foreground">Partial Sync Models</p>
          </Card>
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-chakra-blue">
              {savedSimulations.filter((s) => s.status === "completed").length}
            </p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default History;
