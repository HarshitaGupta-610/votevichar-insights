import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { Plus, History, GitCompare, ArrowRight, Lock, Eye } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { useUser } from "@/contexts/UserContext";
import { useSimulation } from "@/contexts/SimulationContext";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { role, hasFullAccess, canAccessHistory, isViewOnly } = useRole();
  const { user } = useUser();
  const { getRecentSimulations, savedSimulations } = useSimulation();

  const recentSimulations = getRecentSimulations(5);

  const options = [
    {
      title: "New Simulation",
      description: "Create a new election synchronization scenario and analyze its impacts",
      icon: Plus,
      link: "/scenario-setup",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-l-primary",
      requiresFullAccess: false,
      disabled: isViewOnly(),
    },
    {
      title: "View History",
      description: "Access and review your saved simulation results and analyses",
      icon: History,
      link: "/history",
      color: "text-india-green",
      bgColor: "bg-india-green/10",
      borderColor: "border-l-india-green",
      requiresFullAccess: false,
      disabled: !canAccessHistory(),
    },
    {
      title: "Compare Scenarios",
      description: "Side-by-side comparison of different election models and their outcomes",
      icon: GitCompare,
      link: "/comparison",
      color: "text-saffron",
      bgColor: "bg-saffron/10",
      borderColor: "border-l-saffron",
      requiresFullAccess: false,
      disabled: !canAccessHistory(),
    },
  ];

  const getRoleBadge = () => {
    switch (role) {
      case "government":
        return <Badge className="bg-primary">Government User</Badge>;
      case "researcher":
        return <Badge className="bg-india-green">Researcher</Badge>;
      case "guest":
        return <Badge variant="outline">Guest (View Only)</Badge>;
      default:
        return null;
    }
  };

  const displayName = user?.fullName || "User";

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Welcome Message */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-foreground">
                Welcome, {displayName}
              </h1>
              {getRoleBadge()}
            </div>
            <p className="text-muted-foreground">
              Select an action to begin exploring election synchronization scenarios
            </p>
          </div>

          {/* Action Cards */}
          <div className="space-y-4">
            {options.map((option) => {
              const content = (
                <Card className={`border-l-4 ${option.borderColor} ${option.disabled ? 'opacity-60' : 'hover:shadow-md cursor-pointer group'} transition-all`}>
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-lg ${option.bgColor} flex items-center justify-center`}>
                      <option.icon className={`w-7 h-7 ${option.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className={`text-lg mb-1 ${!option.disabled ? 'group-hover:text-primary' : ''} transition-colors`}>
                        {option.title}
                      </CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </div>
                    {option.disabled ? (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </CardContent>
                </Card>
              );

              if (option.disabled) {
                return <div key={option.title}>{content}</div>;
              }

              return (
                <Link key={option.title} to={option.link}>
                  {content}
                </Link>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            <Card className="text-center p-4">
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground">Election Models</p>
            </Card>
            <Card className="text-center p-4">
              <p className="text-2xl font-bold text-india-green">28</p>
              <p className="text-xs text-muted-foreground">States Covered</p>
            </Card>
            <Card className="text-center p-4">
              <p className="text-2xl font-bold text-saffron">{savedSimulations.length}</p>
              <p className="text-xs text-muted-foreground">Saved Scenarios</p>
            </Card>
          </div>

          {/* Recent Simulations */}
          {canAccessHistory() && recentSimulations.length > 0 && (
            <Card className="mt-8">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recent Simulations</CardTitle>
                  <Button asChild variant="ghost" size="sm" className="gap-1">
                    <Link to="/history">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSimulations.map((sim) => (
                    <div
                      key={sim.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-india-green" />
                        <div>
                          <p className="text-sm font-medium">{sim.name}</p>
                          <p className="text-xs text-muted-foreground">{sim.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-india-green">{sim.costSavings}</p>
                          <p className="text-xs text-muted-foreground">{sim.efficiency} efficiency</p>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                          <Link to="/analysis">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
