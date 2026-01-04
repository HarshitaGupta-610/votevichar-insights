import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { Plus, History, GitCompare, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const options = [
    {
      title: "New Simulation",
      description: "Create a new election synchronization scenario and analyze its impacts",
      icon: Plus,
      link: "/scenario-setup",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-l-primary",
    },
    {
      title: "View Previous Simulations",
      description: "Access and review your saved simulation results and analyses",
      icon: History,
      link: "/comparison",
      color: "text-india-green",
      bgColor: "bg-india-green/10",
      borderColor: "border-l-india-green",
    },
    {
      title: "Compare Scenarios",
      description: "Side-by-side comparison of different election models and their outcomes",
      icon: GitCompare,
      link: "/comparison",
      color: "text-saffron",
      bgColor: "bg-saffron/10",
      borderColor: "border-l-saffron",
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Select an action to begin exploring election synchronization scenarios
            </p>
          </div>

          <div className="space-y-4">
            {options.map((option) => (
              <Link key={option.title} to={option.link}>
                <Card className={`border-l-4 ${option.borderColor} hover:shadow-md transition-all cursor-pointer group`}>
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-lg ${option.bgColor} flex items-center justify-center`}>
                      <option.icon className={`w-7 h-7 ${option.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                        {option.title}
                      </CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            ))}
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