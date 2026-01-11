import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import PageLayout from "@/components/layout/PageLayout";
import { Play, Settings2, IndianRupee, Users, Calendar } from "lucide-react";
import { useSimulation, SimulationParams } from "@/contexts/SimulationContext";

const ScenarioSetup = () => {
  const navigate = useNavigate();
  const { setCurrentParams } = useSimulation();
  const [electionModel, setElectionModel] = useState("");
  const [statesCount, setStatesCount] = useState([15]);
  const [cycleLength, setCycleLength] = useState([5]);
  const [costAssumption, setCostAssumption] = useState("");
  const [manpowerLevel, setManpowerLevel] = useState("");

  const handleRunSimulation = () => {
    // Backend-ready: Prepare data object for API
    const simulationParams: SimulationParams = {
      electionModel,
      statesCount: statesCount[0],
      cycleLength: cycleLength[0],
      costAssumption,
      manpowerLevel,
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
                    <SelectItem value="current">Current System (Staggered Elections)</SelectItem>
                    <SelectItem value="partial">Partial Synchronization (Regional Clusters)</SelectItem>
                    <SelectItem value="full">Full Synchronization (One Nation One Election)</SelectItem>
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
                    <CardDescription>Baseline cost model for estimation</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Select value={costAssumption} onValueChange={setCostAssumption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cost assumption" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative (Lower Bound)</SelectItem>
                    <SelectItem value="moderate">Moderate (Average Estimate)</SelectItem>
                    <SelectItem value="aggressive">Aggressive (Upper Bound)</SelectItem>
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
                    <SelectItem value="current">
  Current System – Elections happen at different times across states
</SelectItem>

<SelectItem value="partial">
  Partial Synchronization – Some states vote together in planned groups
</SelectItem>

<SelectItem value="full">
  Full Synchronization – Whole country votes on the same day (One Nation One Election)
</SelectItem>

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
