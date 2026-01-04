import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { IndianRupee, Users, Building, TrendingUp, TrendingDown, Settings, ArrowRight } from "lucide-react";

const financialData = [
  { name: "Current", cost: 55000, savings: 0 },
  { name: "Partial", cost: 42000, savings: 13000 },
  { name: "Full Sync", cost: 28000, savings: 27000 },
];

const workloadData = [
  { name: "Personnel", current: 85, synced: 60 },
  { name: "Logistics", current: 75, synced: 50 },
  { name: "Security", current: 90, synced: 70 },
  { name: "Equipment", current: 80, synced: 45 },
];

const pieData = [
  { name: "Financial", value: 35 },
  { name: "Administrative", value: 40 },
  { name: "Governance", value: 25 },
];

const COLORS = ["hsl(220, 60%, 35%)", "hsl(145, 55%, 35%)", "hsl(24, 90%, 55%)"];

const Analysis = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Impact Analysis Dashboard</h1>
          <p className="text-muted-foreground">
            Simulation results for Full Synchronization model with 15 states
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <IndianRupee className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Cost Savings</p>
                  <p className="text-xl font-bold">₹27,000 Cr</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-india-green">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-india-green" />
                <div>
                  <p className="text-xs text-muted-foreground">Manpower Saved</p>
                  <p className="text-xl font-bold">35%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-saffron">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Building className="w-8 h-8 text-saffron" />
                <div>
                  <p className="text-xs text-muted-foreground">Admin Efficiency</p>
                  <p className="text-xl font-bold">+42%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-chakra-blue">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-chakra-blue" />
                <div>
                  <p className="text-xs text-muted-foreground">Policy Continuity</p>
                  <p className="text-xl font-bold">High</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Financial Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-primary" />
                Financial Impact (₹ Crores)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="cost" fill="hsl(220, 60%, 35%)" name="Cost" />
                  <Bar dataKey="savings" fill="hsl(145, 55%, 35%)" name="Savings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Administrative Workload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-5 h-5 text-india-green" />
                Administrative Workload Reduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={workloadData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" fontSize={12} />
                  <YAxis dataKey="name" type="category" fontSize={12} width={80} />
                  <Tooltip />
                  <Bar dataKey="current" fill="hsl(24, 90%, 55%)" name="Current" />
                  <Bar dataKey="synced" fill="hsl(145, 55%, 35%)" name="Synchronized" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Impact Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building className="w-5 h-5 text-saffron" />
                Impact Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Trade-offs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key Trade-offs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-india-green/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-india-green" />
                <div>
                  <p className="font-medium text-sm">Cost Efficiency</p>
                  <p className="text-xs text-muted-foreground">Significant reduction in election expenses</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-saffron/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-saffron" />
                <div>
                  <p className="font-medium text-sm">Implementation Complexity</p>
                  <p className="text-xs text-muted-foreground">Requires constitutional amendments</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                <Building className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Federal Balance</p>
                  <p className="text-xs text-muted-foreground">State autonomy considerations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/scenario-setup">
              <Settings className="w-4 h-4" />
              Modify Inputs
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link to="/insights">
              Continue to Insights
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Analysis;