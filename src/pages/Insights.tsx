import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { CheckCircle2, AlertTriangle, Info, ArrowRight, RotateCcw, LayoutDashboard, FileText, Scale, Clock, Shield } from "lucide-react";

const Insights = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Insights & Summary</h1>
            <p className="text-muted-foreground">
              Key findings from Full Synchronization scenario with 15 states
            </p>
          </div>

          {/* Executive Summary */}
          <Card className="mb-8 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                The simulation of <strong>Full Synchronization</strong> across <strong>15 states</strong> with 
                a <strong>5-year election cycle</strong> indicates significant potential for cost reduction 
                and administrative efficiency gains, with notable trade-offs in implementation complexity.
              </p>
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-india-green/10 rounded-lg">
                  <p className="text-2xl font-bold text-india-green">₹27,000 Cr</p>
                  <p className="text-xs text-muted-foreground">Projected Savings</p>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-2xl font-bold text-primary">35%</p>
                  <p className="text-xs text-muted-foreground">Efficiency Gain</p>
                </div>
                <div className="text-center p-4 bg-saffron/10 rounded-lg">
                  <p className="text-2xl font-bold text-saffron">Moderate</p>
                  <p className="text-xs text-muted-foreground">Complexity</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Findings */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-india-green" />
                  Potential Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="text-india-green border-india-green">Financial</Badge>
                  <p className="text-sm text-muted-foreground">Reduced election expenditure through consolidated operations</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="text-india-green border-india-green">Admin</Badge>
                  <p className="text-sm text-muted-foreground">Lower personnel deployment and logistics overhead</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="text-india-green border-india-green">Governance</Badge>
                  <p className="text-sm text-muted-foreground">Improved policy continuity with longer stable terms</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-saffron" />
                  Considerations & Trade-offs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="text-saffron border-saffron">Legal</Badge>
                  <p className="text-sm text-muted-foreground">Constitutional amendments required for implementation</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="text-saffron border-saffron">Federal</Badge>
                  <p className="text-sm text-muted-foreground">Impact on state autonomy and regional representation</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="text-saffron border-saffron">Logistic</Badge>
                  <p className="text-sm text-muted-foreground">Large-scale EVM and security coordination challenges</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feasibility Notes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                Feasibility Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium text-sm">Timeline</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estimated 3-5 years for full implementation with phased rollout
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-india-green" />
                    <span className="font-medium text-sm">Prerequisites</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Political consensus, constitutional amendments, ECI capacity expansion
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5 text-saffron" />
                    <span className="font-medium text-sm">Risk Level</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Moderate - requires careful stakeholder engagement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="mb-8 bg-muted/30">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Disclaimer:</strong> This simulation uses hypothetical data for demonstration purposes. 
                Actual implementation would require detailed feasibility studies, stakeholder consultations, 
                and legislative analysis. VoteVichar provides neutral, evidence-based insights without 
                advocating for any specific policy position.
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/scenario-setup">
                <RotateCcw className="w-4 h-4" />
                Start New Analysis
              </Link>
            </Button>
            <Button asChild className="gap-2">
              <Link to="/dashboard">
                <LayoutDashboard className="w-4 h-4" />
                Return to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Insights;