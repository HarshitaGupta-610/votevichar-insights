import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { Building2, GraduationCap, User, ArrowRight } from "lucide-react";

type UserType = "government" | "researcher" | "guest" | null;

const Access = () => {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (selectedType) {
      navigate("/dashboard");
    }
  };

  const userTypes = [
    {
      id: "government" as UserType,
      title: "Government User",
      description: "Policy makers, election officials, and government stakeholders",
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "researcher" as UserType,
      title: "Researcher",
      description: "Academic researchers, think tanks, and policy analysts",
      icon: GraduationCap,
      color: "text-india-green",
      bgColor: "bg-india-green/10",
    },
    {
      id: "guest" as UserType,
      title: "Guest",
      description: "Citizens, journalists, and civic-minded individuals",
      icon: User,
      color: "text-saffron",
      bgColor: "bg-saffron/10",
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-foreground mb-2">Access VoteVichar</h1>
            <p className="text-muted-foreground">
              Select your user type to proceed. No personal data is collected.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {userTypes.map((type) => (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all ${
                  selectedType === type.id
                    ? "ring-2 ring-primary border-primary"
                    : "hover:border-muted-foreground/30"
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${type.bgColor} flex items-center justify-center`}>
                    <type.icon className={`w-6 h-6 ${type.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base mb-1">{type.title}</CardTitle>
                    <CardDescription className="text-sm">{type.description}</CardDescription>
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
            ))}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-8">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Privacy Notice:</strong> VoteVichar does not collect any personal information, 
              voter data, or tracking information. All simulations run locally for demonstration purposes.
            </p>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={handleProceed}
              disabled={!selectedType}
              className="gap-2"
            >
              Proceed to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Access;