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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface UpdatePhoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpdatePhoneModal = ({ open, onOpenChange }: UpdatePhoneModalProps) => {
  const [phone, setPhone] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { user, refreshProfile } = useAuth();

  const handleUpdate = async () => {
    if (!phone.trim() || !user) return;

    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ phone: phone.trim() })
        .eq("user_id", user.id);

      if (error) throw error;

      await refreshProfile();
      
      setIsSuccess(true);
      toast({
        title: "Phone Updated",
        description: "Your phone number has been updated successfully.",
      });

      setTimeout(() => {
        onOpenChange(false);
        setIsSuccess(false);
        setPhone("");
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update phone number.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Update Phone Number
          </DialogTitle>
          <DialogDescription>
            Enter your new phone number.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-india-green/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-india-green" />
            </div>
            <p className="text-center font-medium text-india-green">Phone Updated!</p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isUpdating}
              />
            </div>
          </div>
        )}

        {!isSuccess && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!phone.trim() || isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Phone"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
