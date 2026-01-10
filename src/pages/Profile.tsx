import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { User, Mail, Phone, Shield, LogOut, Building2, GraduationCap, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/contexts/RoleContext";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { role, setRole } = useRole();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Sync role from profile
  useEffect(() => {
    if (profile?.role) {
      setRole(profile.role);
    }
  }, [profile, setRole]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    setRole(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const currentRole = profile?.role || role;

  const getRoleBadge = () => {
    switch (currentRole) {
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
    switch (currentRole) {
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

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Guest User";
  const displayEmail = user?.email || "guest@votevichar.in";
  const displayPhone = profile?.phone || "Not provided";

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
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Logging out...
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" />
                      Logout
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
