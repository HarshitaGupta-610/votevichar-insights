import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { User, Mail, Phone, Shield, LogOut, Building2, GraduationCap } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useRole } from "@/contexts/RoleContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { role, setRole } = useRole();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    setRole(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const getRoleBadge = () => {
    switch (role) {
      case "government":
        return (
          <Badge className="bg-primary gap-1">
            <Building2 className="w-3 h-3" />
            Government User
          </Badge>
        );
      case "researcher":
        return (
          <Badge className="bg-india-green gap-1">
            <GraduationCap className="w-3 h-3" />
            Researcher
          </Badge>
        );
      case "guest":
        return (
          <Badge variant="outline" className="gap-1">
            <User className="w-3 h-3" />
            Guest
          </Badge>
        );
      default:
        return null;
    }
  };

  const getRoleDescription = () => {
    switch (role) {
      case "government":
        return "Full access: simulations, history, comparison, and export features";
      case "researcher":
        return "Access to analysis, comparison, and simulation features";
      case "guest":
        return "View-only access to explore the platform";
      default:
        return "";
    }
  };

  // Use placeholder data if user is not logged in but has a role (guest access)
  const displayName = user?.fullName || "Guest User";
  const displayEmail = user?.email || "guest@votevichar.in";
  const displayPhone = user?.phone || "Not provided";

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">{displayName}</CardTitle>
              <CardDescription className="flex justify-center mt-2">
                {getRoleBadge()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{displayEmail}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{displayPhone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Access Level</p>
                    <p className="text-sm font-medium">{getRoleDescription()}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t">
                <Button 
                  variant="destructive" 
                  className="w-full gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground text-center">
                  <strong>Demo Mode:</strong> Profile data is stored locally for demonstration purposes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
