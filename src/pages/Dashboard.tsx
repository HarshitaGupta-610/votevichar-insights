import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { Plus, History, GitCompare, ArrowRight, Lock } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

const Dashboard = () => {
  const { role, hasFullAccess, canAccessHistory, isViewOnly } = useRole();

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
      title: "View Previous Simulations",
      description: "Access and review your saved simulation results and analyses",
      icon: History,
      link: "/comparison",
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

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              {getRoleBadge()}
            </div>
            <p className="text-muted-foreground">
              Select an action to begin exploring election synchronization scenarios
            </p>
          </div>

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
              <p className="text-2xl font-bold text-saffron">5</p>
              <p className="text-xs text-muted-foreground">Saved Scenarios</p>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;