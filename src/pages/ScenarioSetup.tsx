import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import PageLayout from "@/components/layout/PageLayout";
import { Play, Settings2, IndianRupee, Users, Calendar, Wallet } from "lucide-react";
import { useSimulation, SimulationParams } from "@/contexts/SimulationContext";

const ScenarioSetup = () => {
  const navigate = useNavigate();
  const { setCurrentParams } = useSimulation();
  const [electionModel, setElectionModel] = useState("");
  const [statesCount, setStatesCount] = useState([15]);
  const [cycleLength, setCycleLength] = useState([5]);
  const [costAssumption, setCostAssumption] = useState("");
  const [manpowerLevel, setManpowerLevel] = useState("");
  const [budgetLevel, setBudgetLevel] = useState("");

  const handleRunSimulation = () => {
    // Backend-ready: Prepare data object for API
    const simulationParams: SimulationParams = {
      electionModel,
      statesCount: statesCount[0],
      cycleLength: cycleLength[0],
      costAssumption,
      manpowerLevel,
      budgetLevel,
    };

    // Store params in context (ready for backend integration)
    setCurrentParams(simulationParams);

    navigate("/processing");
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Scenario Setup</h1>
            <p className="text-muted-foreground">
              Configure parameters for your election synchronization simulation
            </p>
          </div>

          <div className="space-y-6">
            {/* Election Model */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Settings2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Election Model</CardTitle>
                    <CardDescription>Select the synchronization approach</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Select value={electionModel} onValueChange={setElectionModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select election model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current System – Elections happen at different times across states</SelectItem>
                    <SelectItem value="partial">Partial Synchronization – Some states vote together in planned groups</SelectItem>
                    <SelectItem value="full">Full Synchronization – Whole country votes on the same day (One Nation One Election)</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Number of States */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-india-green/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-india-green" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Number of States</CardTitle>
                    <CardDescription>States included in the simulation</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>States: <strong>{statesCount[0]}</strong></span>
                    <span className="text-muted-foreground">Max: 28</span>
                  </div>
                  <Slider
                    value={statesCount}
                    onValueChange={setStatesCount}
                    min={5}
                    max={28}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Election Cycle Length */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-saffron/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Election Cycle Length</CardTitle>
                    <CardDescription>Duration between synchronized elections</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Years: <strong>{cycleLength[0]}</strong></span>
                    <span className="text-muted-foreground">Range: 3-7 years</span>
                  </div>
                  <Slider
                    value={cycleLength}
                    onValueChange={setCycleLength}
                    min={3}
                    max={7}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Cost Assumptions */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Cost Assumptions</CardTitle>
                    <CardDescription>ECI-based election cost baseline</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Select value={costAssumption} onValueChange={setCostAssumption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cost assumption" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Cost Estimate (₹8,000-10,000 Cr) – Minimal infrastructure and logistics</SelectItem>
                    <SelectItem value="medium">Medium Cost Estimate (₹10,000-13,000 Cr) – Standard ECI allocation</SelectItem>
                    <SelectItem value="high">High Cost Estimate (₹13,000-17,000 Cr) – Full security and expanded coverage</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Manpower Assumptions */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-india-green/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-india-green" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Manpower Assumptions</CardTitle>
                    <CardDescription>Personnel deployment estimates</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Select value={manpowerLevel} onValueChange={setManpowerLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manpower level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal Staffing (20-30% fewer staff) – Reduced deployment model</SelectItem>
                    <SelectItem value="standard">Standard Staffing (Normal levels) – Current ECI staffing pattern</SelectItem>
                    <SelectItem value="heavy">Heavy Staffing (25-40% more staff) – Enhanced security deployment</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Budget Level */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-saffron/10 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Budget Availability</CardTitle>
                    <CardDescription>Available financial allocation for the election</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Select value={budgetLevel} onValueChange={setBudgetLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tight">Tight Budget (₹6,000-8,000 Cr) – Limited funding scenario</SelectItem>
                    <SelectItem value="normal">Normal Budget (₹9,000-12,000 Cr) – Standard allocation</SelectItem>
                    <SelectItem value="comfortable">Comfortable Budget (₹12,000-15,000 Cr) – Enhanced allocation</SelectItem>
                    <SelectItem value="high">High Budget (₹16,000-20,000 Cr) – Full funding availability</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Run Button */}
          <div className="mt-8 text-center">
            <Button size="lg" onClick={handleRunSimulation} className="gap-2">
              <Play className="w-5 h-5" />
              Run Simulation
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ScenarioSetup;
