import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { Building2, GraduationCap, User, ArrowRight, Lock } from "lucide-react";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { useAuth } from "@/contexts/AuthContext";

const Access = () => {
  const [selectedType, setSelectedType] = useState<UserRole>(null);
  const navigate = useNavigate();
  const { setRole } = useRole();
  const { user } = useAuth();

  const handleProceed = () => {
    if (selectedType) {
      setRole(selectedType);
      navigate("/dashboard");
    }
  };

  // If user is not logged in, only guest option is available
  const isLoggedIn = !!user;

  const userTypes = [
    {
      id: "government" as UserRole,
      title: "Government User",
      description: "Full access: simulations, history, comparison, and export",
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
      requiresAuth: true,
    },
    {
      id: "researcher" as UserRole,
      title: "Researcher",
      description: "Access to analysis, comparison, and simulation features",
      icon: GraduationCap,
      color: "text-india-green",
      bgColor: "bg-india-green/10",
      requiresAuth: true,
    },
    {
      id: "guest" as UserRole,
      title: "Guest",
      description: "View-only access to explore the platform with demo data",
      icon: User,
      color: "text-saffron",
      bgColor: "bg-saffron/10",
      requiresAuth: false,
    },
  ];

  const handleSelectType = (type: typeof userTypes[0]) => {
    // If selecting guest, allow it
    if (type.id === "guest") {
      setSelectedType(type.id);
      return;
    }
    
    // For other roles, only allow if logged in
    if (isLoggedIn) {
      setSelectedType(type.id);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-foreground mb-2">Access VoteVichar</h1>
            <p className="text-muted-foreground">
              {isLoggedIn 
                ? "Select your user type to proceed."
                : "Continue as guest to explore, or login for full access."}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {userTypes.map((type) => {
              const isDisabled = type.requiresAuth && !isLoggedIn;
              
              return (
                <Card
                  key={type.id}
                  className={`transition-all ${
                    isDisabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer"
                  } ${
                    selectedType === type.id
                      ? "ring-2 ring-primary border-primary"
                      : !isDisabled ? "hover:border-muted-foreground/30" : ""
                  }`}
                  onClick={() => !isDisabled && handleSelectType(type)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${type.bgColor} flex items-center justify-center`}>
                      <type.icon className={`w-6 h-6 ${type.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base mb-1 flex items-center gap-2">
                        {type.title}
                        {isDisabled && (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {type.description}
                        {isDisabled && (
                          <span className="block text-xs mt-1 text-muted-foreground">
                            Login required for this role
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedType === type.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {selectedType === type.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-8">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Privacy Notice:</strong> VoteVichar does not collect any personal information, 
              voter data, or tracking information. All simulations run locally for demonstration purposes.
            </p>
          </div>

          <div className="text-center space-y-3">
            <Button
              size="lg"
              onClick={handleProceed}
              disabled={!selectedType}
              className="gap-2"
            >
              {selectedType === "guest" ? "Continue as Guest" : "Proceed to Dashboard"}
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            {!isLoggedIn && (
              <p className="text-sm text-muted-foreground">
                Want full access?{" "}
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/login")}>
                  Login
                </Button>{" "}
                or{" "}
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/signup")}>
                  Sign up
                </Button>
              </p>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Access;
