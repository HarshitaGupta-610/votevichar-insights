import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { User, Mail, Phone, Shield, LogOut, Building2, GraduationCap, Loader2, Lock, Users, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/contexts/RoleContext";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal";
import { UpdatePhoneModal } from "@/components/modals/UpdatePhoneModal";
import { SwitchRoleModal } from "@/components/modals/SwitchRoleModal";
import { VerificationModal } from "@/components/modals/VerificationModal";

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { role, setRole, isViewOnly } = useRole();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

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

  const handleVerification = () => {
    setIsVerified(true);
    toast({
      title: "Verified",
      description: "You are now verified as a Government Official.",
    });
  };

  const currentRole = profile?.role || role;
  const isGuest = isViewOnly() || currentRole === "guest";

  const getRoleBadge = () => {
    switch (currentRole) {
      case "government":
        return (
          <Badge className="bg-primary gap-1">
            <Building2 className="w-3 h-3" />
            Government User
            {isVerified && <CheckCircle2 className="w-3 h-3 ml-1" />}
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

              {/* Account Actions - Only for logged in users */}
              {!isGuest && user && (
                <div className="pt-4 border-t space-y-3">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Account Settings</p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    <Lock className="w-4 h-4" />
                    Change Password
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => setShowPhoneModal(true)}
                  >
                    <Phone className="w-4 h-4" />
                    Update Phone Number
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => setShowRoleModal(true)}
                  >
                    <Users className="w-4 h-4" />
                    Switch Role
                  </Button>

                  {currentRole === "government" && !isVerified && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2 border-primary text-primary hover:bg-primary/10"
                      onClick={() => setShowVerificationModal(true)}
                    >
                      <Shield className="w-4 h-4" />
                      Verify as Government Official
                    </Button>
                  )}
                </div>
              )}

              {/* Guest Notice */}
              {isGuest && (
                <div className="pt-4 border-t">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Guest users have limited access. Login to unlock all features.
                    </p>
                    <Button onClick={() => navigate("/login")} className="gap-2">
                      Login for Full Access
                    </Button>
                  </div>
                </div>
              )}

              {/* Logout */}
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

      {/* Modals */}
      <ChangePasswordModal open={showPasswordModal} onOpenChange={setShowPasswordModal} />
      <UpdatePhoneModal open={showPhoneModal} onOpenChange={setShowPhoneModal} />
      <SwitchRoleModal open={showRoleModal} onOpenChange={setShowRoleModal} />
      <VerificationModal 
        open={showVerificationModal} 
        onOpenChange={setShowVerificationModal}
        onVerify={handleVerification}
      />
    </PageLayout>
  );
};

export default Profile;
