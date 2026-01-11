import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Users, Loader2, CheckCircle2, Building2, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useRole, UserRole } from "@/contexts/RoleContext";

interface SwitchRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SwitchRoleModal = ({ open, onOpenChange }: SwitchRoleModalProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { user, profile, refreshProfile } = useAuth();
  const { setRole } = useRole();

  const roles = [
    {
      id: "government" as UserRole,
      title: "Government User",
      description: "Full access: simulations, history, comparison, and export",
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "researcher" as UserRole,
      title: "Researcher",
      description: "Access to analysis, comparison, and simulation features",
      icon: GraduationCap,
      color: "text-india-green",
      bgColor: "bg-india-green/10",
    },
  ];

  const handleSwitch = async () => {
    if (!selectedRole || !user) return;

    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: selectedRole })
        .eq("user_id", user.id);

      if (error) throw error;

      await refreshProfile();
      setRole(selectedRole);

      setIsSuccess(true);
      toast({
        title: "Role Updated",
        description: `You are now a ${selectedRole === "government" ? "Government User" : "Researcher"}.`,
      });

      setTimeout(() => {
        onOpenChange(false);
        setIsSuccess(false);
        setSelectedRole(null);
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update role.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const currentRole = profile?.role;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Switch Role
          </DialogTitle>
          <DialogDescription>
            Select a new role for your account.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-india-green/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-india-green" />
            </div>
            <p className="text-center font-medium text-india-green">Role Updated!</p>
          </div>
        ) : (
          <div className="space-y-3 py-4">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all ${
                  selectedRole === role.id
                    ? "ring-2 ring-primary border-primary"
                    : currentRole === role.id
                    ? "opacity-50"
                    : "hover:border-muted-foreground/30"
                }`}
                onClick={() => currentRole !== role.id && setSelectedRole(role.id)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${role.bgColor} flex items-center justify-center`}>
                    <role.icon className={`w-5 h-5 ${role.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-sm mb-0.5">
                      {role.title}
                      {currentRole === role.id && (
                        <span className="text-xs text-muted-foreground ml-2">(Current)</span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-xs">{role.description}</CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isSuccess && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button onClick={handleSwitch} disabled={!selectedRole || isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Switching...
                </>
              ) : (
                "Switch Role"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
